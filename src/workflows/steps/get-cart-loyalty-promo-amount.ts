import { PromotionDTO } from "@medusajs/framework/types"
import { MedusaError } from "@medusajs/framework/utils"
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { LOYALTY_MODULE } from "../../modules/loyalty"
import LoyaltyModuleService from "../../modules/loyalty/service"

export type GetCartLoyaltyPromoAmountStepInput = {
  cart: {
    id: string
    customer: {
      id: string
    }
    promotions?: PromotionDTO[] | null
    total?: number | null
    subtotal?: number | null
  }
}

export const getCartLoyaltyPromoAmountStep = createStep(
  "get-cart-loyalty-promo-amount",
  async ({ cart }: GetCartLoyaltyPromoAmountStepInput, { container }) => {
    const loyaltyModuleService: LoyaltyModuleService = container.resolve(LOYALTY_MODULE)

    const loyaltyPoints = await loyaltyModuleService.getPoints(cart.customer.id)

    if (loyaltyPoints <= 0) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Customer has no loyalty points"
      )
    }

    const pointsAmount = await loyaltyModuleService.calculateAmountFromRedeemPoints(
      loyaltyPoints
    )

    const cartTotal = Number(cart.total ?? cart.subtotal ?? 0)
    const amount = Math.min(pointsAmount, cartTotal)

    if (amount <= 0) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Loyalty discount amount is invalid"
      )
    }

    return new StepResponse(amount)
  }
)
