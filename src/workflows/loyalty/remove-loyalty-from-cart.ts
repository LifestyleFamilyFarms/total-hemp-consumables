import { PromotionActions } from "@medusajs/framework/utils"
import {
  createWorkflow,
  transform,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import {
  acquireLockStep,
  releaseLockStep,
  updateCartPromotionsWorkflow,
  updateCartsStep,
  updatePromotionsStep,
  useQueryGraphStep,
} from "@medusajs/medusa/core-flows"
import { CartData } from "../../utils/promo"
import { getCartLoyaltyPromoStep } from "../steps/get-cart-loyalty-promo"
import { validateCartCustomerOwnershipStep } from "../steps/validate-cart-customer-ownership"

type RemoveLoyaltyFromCartWorkflowInput = {
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
  "metadata",
]

const removeLoyaltyFromCartWorkflow = createWorkflow(
  "loyalty.remove-loyalty-from-cart",
  function (input: RemoveLoyaltyFromCartWorkflowInput) {
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

    const loyaltyPromo = getCartLoyaltyPromoStep({
      cart: carts[0] as unknown as CartData,
      throwErrorOn: "not-found",
    })

    acquireLockStep({
      key: input.cart_id,
      timeout: 2,
      ttl: 10,
    })

    const removePromoInput = transform({ loyaltyPromo, input }, (data) => {
      return {
        cart_id: data.input.cart_id,
        promo_codes: [data.loyaltyPromo.code!],
        action: PromotionActions.REMOVE,
        force_refresh_payment_collection: true,
      }
    })

    updateCartPromotionsWorkflow.runAsStep({
      input: removePromoInput,
    })

    const newMetadata = transform({ carts }, (data) => {
      const metadata = data.carts[0].metadata || {}
      const { loyalty_promo_id, ...rest } = metadata

      return {
        ...rest,
        loyalty_promo_id: null,
      }
    })

    updateCartsStep([
      {
        id: input.cart_id,
        metadata: newMetadata,
      },
    ])

    updatePromotionsStep([
      {
        id: loyaltyPromo.id,
        status: "inactive",
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
    }).config({ name: "retrieve-cart-after-loyalty-remove" })

    releaseLockStep({
      key: input.cart_id,
    })

    return new WorkflowResponse(updatedCarts[0])
  }
)

export default removeLoyaltyFromCartWorkflow
