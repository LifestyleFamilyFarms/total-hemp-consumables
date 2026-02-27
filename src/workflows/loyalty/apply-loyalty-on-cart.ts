import { CreatePromotionDTO } from "@medusajs/framework/types"
import { PromotionActions } from "@medusajs/framework/utils"
import {
  createWorkflow,
  transform,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import {
  acquireLockStep,
  createPromotionsStep,
  releaseLockStep,
  updateCartPromotionsWorkflow,
  updateCartsStep,
  useQueryGraphStep,
} from "@medusajs/medusa/core-flows"
import {
  CartData,
  CUSTOMER_ID_PROMOTION_RULE_ATTRIBUTE,
} from "../../utils/promo"
import { getCartLoyaltyPromoAmountStep } from "../steps/get-cart-loyalty-promo-amount"
import { getCartLoyaltyPromoStep } from "../steps/get-cart-loyalty-promo"
import {
  validateCustomerExistsStep,
  ValidateCustomerExistsStepInput,
} from "../steps/validate-customer-exists"
import { validateCartCustomerOwnershipStep } from "../steps/validate-cart-customer-ownership"
import type { GetCartLoyaltyPromoAmountStepInput } from "../steps/get-cart-loyalty-promo-amount"

type ApplyLoyaltyOnCartWorkflowInput = {
  cart_id: string
  actor_id: string
}

const fields = [
  "id",
  "customer.*",
  "promotions.*",
  "promotions.application_method.*",
  "promotions.rules.*",
  "promotions.rules.values.*",
  "currency_code",
  "total",
  "subtotal",
  "metadata",
]

const applyLoyaltyOnCartWorkflow = createWorkflow(
  "loyalty.apply-loyalty-on-cart",
  function (input: ApplyLoyaltyOnCartWorkflowInput) {
    const { data: carts } = useQueryGraphStep({
      entity: "cart",
      fields,
      filters: {
        id: input.cart_id,
      },
      options: {
        throwIfKeyNotFound: true,
      },
    })

    const cartCustomerId = transform({ carts }, (data) => data.carts[0].customer?.id || null)

    validateCartCustomerOwnershipStep({
      actor_id: input.actor_id,
      cart_customer_id: cartCustomerId,
    })

    validateCustomerExistsStep({
      customer: carts[0].customer,
    } as ValidateCustomerExistsStepInput)

    getCartLoyaltyPromoStep({
      cart: carts[0] as unknown as CartData,
      throwErrorOn: "found",
    })

    acquireLockStep({
      key: input.cart_id,
      timeout: 2,
      ttl: 10,
    })

    const amount = getCartLoyaltyPromoAmountStep({
      cart: carts[0] as unknown as GetCartLoyaltyPromoAmountStepInput["cart"],
    })

    const promoToCreate = transform({ carts, amount }, (data) => {
      const randomStr = Math.random().toString(36).substring(2, 8)
      const customerName = data.carts[0].customer?.first_name || "CUSTOMER"
      const uniqueId = (`LOYALTY-${customerName}-${randomStr}`).toUpperCase()

      return {
        code: uniqueId,
        type: "standard",
        status: "active",
        application_method: {
          type: "fixed",
          value: data.amount,
          target_type: "order",
          currency_code: data.carts[0].currency_code,
          allocation: "across",
        },
        rules: [
          {
            attribute: CUSTOMER_ID_PROMOTION_RULE_ATTRIBUTE,
            operator: "eq",
            values: [data.carts[0].customer!.id],
          },
        ],
        campaign: {
          name: uniqueId,
          description:
            "Loyalty promotion for " + (data.carts[0].customer?.email || "customer"),
          campaign_identifier: uniqueId,
          budget: {
            type: "usage",
            limit: 1,
          },
        },
      }
    })

    const loyaltyPromo = createPromotionsStep([
      promoToCreate,
    ] as unknown as CreatePromotionDTO[])

    const updatePromoData = transform({ carts, promoToCreate }, (data) => {
      const promoCodes = [
        ...((data.carts[0].promotions || [])
          .map((promo) => promo?.code)
          .filter((code): code is string => Boolean(code)) as string[]),
        data.promoToCreate.code,
      ]

      return {
        cart_id: data.carts[0].id,
        promo_codes: promoCodes,
        action: PromotionActions.ADD,
        force_refresh_payment_collection: true,
      }
    })

    updateCartPromotionsWorkflow.runAsStep({
      input: updatePromoData,
    })

    const metadata = transform({ loyaltyPromo }, (data) => {
      return {
        loyalty_promo_id: data.loyaltyPromo[0]?.id || null,
      }
    })

    updateCartsStep([
      {
        id: input.cart_id,
        metadata,
      },
    ])

    const { data: updatedCarts } = useQueryGraphStep({
      entity: "cart",
      fields,
      filters: {
        id: input.cart_id,
      },
      options: {
        throwIfKeyNotFound: true,
      },
    }).config({ name: "retrieve-cart-after-loyalty-apply" })

    releaseLockStep({
      key: input.cart_id,
    })

    return new WorkflowResponse(updatedCarts[0])
  }
)

export default applyLoyaltyOnCartWorkflow
