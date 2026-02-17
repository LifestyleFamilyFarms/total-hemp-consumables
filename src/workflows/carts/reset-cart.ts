import { createWorkflow, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { cloneCartStep } from "./steps/clone-cart"
import { deleteCartByIdStep } from "./steps/delete-cart-by-id"

export type ResetCartWorkflowInput = {
  cart_id: string
}

const resetCartWorkflow = createWorkflow(
  "carts.reset-cart",
  function (input: ResetCartWorkflowInput) {
    const cloned = cloneCartStep({
      cart_id: input.cart_id,
    })

    deleteCartByIdStep({
      cart_id: input.cart_id,
    })

    return new WorkflowResponse({
      cart: cloned.cart,
      previous_cart_id: cloned.previous_cart_id,
    })
  }
)

export default resetCartWorkflow
