import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { MedusaError } from "@medusajs/framework/utils"
import { isFirstPurchaseDiscountEnabled } from "../../../config/feature-flags"

type EvaluateFirstPurchaseStepInput = {
  cart_id: string
  actor_id: string
  promotion_code: string
}

type CartRecord = {
  id: string
  customer?: {
    id: string
    orders?: Array<{ id: string }> | null
  } | null
  promotions?: Array<{
    code?: string | null
  }> | null
}

type PromotionRecord = {
  id: string
  code: string
}

type EvaluateFirstPurchaseStepOutput = {
  eligible: boolean
  reason: string | null
  promotion_code: string
}

export const evaluateFirstPurchaseStep = createStep(
  "first-purchase-evaluate",
  async (input: EvaluateFirstPurchaseStepInput, { container }) => {
    const query = container.resolve("query") as {
      graph: (input: Record<string, unknown>) => Promise<{ data: any[] }>
    }

    const { data: carts } = await query.graph({
      entity: "cart",
      fields: ["id", "customer.id", "customer.orders.id", "promotions.code"],
      filters: {
        id: input.cart_id,
      },
    })

    if (!carts.length) {
      throw new MedusaError(MedusaError.Types.NOT_FOUND, "Cart not found")
    }

    const cart = carts[0] as CartRecord

    if (!cart.customer?.id) {
      return new StepResponse<EvaluateFirstPurchaseStepOutput>({
        eligible: false,
        reason: "Cart is not assigned to a customer",
        promotion_code: input.promotion_code,
      })
    }

    if (cart.customer.id !== input.actor_id) {
      throw new MedusaError(
        MedusaError.Types.NOT_ALLOWED,
        "You can only apply first-purchase discounts on your own cart"
      )
    }

    if (!isFirstPurchaseDiscountEnabled()) {
      return new StepResponse<EvaluateFirstPurchaseStepOutput>({
        eligible: false,
        reason: "First purchase discount is disabled",
        promotion_code: input.promotion_code,
      })
    }

    const existingCodes = (cart.promotions || [])
      .map((promotion) => promotion.code)
      .filter((code): code is string => Boolean(code))

    if (existingCodes.includes(input.promotion_code)) {
      return new StepResponse<EvaluateFirstPurchaseStepOutput>({
        eligible: false,
        reason: "Discount already applied",
        promotion_code: input.promotion_code,
      })
    }

    if ((cart.customer.orders || []).length > 0) {
      return new StepResponse<EvaluateFirstPurchaseStepOutput>({
        eligible: false,
        reason: "Customer already has at least one order",
        promotion_code: input.promotion_code,
      })
    }

    const { data: promotions } = await query.graph({
      entity: "promotion",
      fields: ["id", "code"],
      filters: {
        code: input.promotion_code,
      },
    })

    if (!promotions.length) {
      return new StepResponse<EvaluateFirstPurchaseStepOutput>({
        eligible: false,
        reason: "Configured first-purchase promotion was not found",
        promotion_code: input.promotion_code,
      })
    }

    const promotion = promotions[0] as PromotionRecord

    return new StepResponse<EvaluateFirstPurchaseStepOutput>({
      eligible: true,
      reason: null,
      promotion_code: promotion.code,
    })
  }
)
