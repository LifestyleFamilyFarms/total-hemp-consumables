import { createStep } from "@medusajs/framework/workflows-sdk"
import { MedusaError } from "@medusajs/framework/utils"

export type ValidateCartCustomerOwnershipStepInput = {
  actor_id: string
  cart_customer_id?: string | null
}

export const validateCartCustomerOwnershipStep = createStep(
  "validate-cart-customer-ownership",
  async ({ actor_id, cart_customer_id }: ValidateCartCustomerOwnershipStepInput) => {
    if (!cart_customer_id) {
      throw new MedusaError(
        MedusaError.Types.NOT_ALLOWED,
        "Cart must belong to an authenticated customer"
      )
    }

    if (actor_id !== cart_customer_id) {
      throw new MedusaError(
        MedusaError.Types.NOT_ALLOWED,
        "You can only apply loyalty points on your own cart"
      )
    }
  }
)
