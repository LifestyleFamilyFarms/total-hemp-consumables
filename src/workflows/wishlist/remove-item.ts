import { createWorkflow, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { deleteWishlistItemStep } from "./steps/delete-wishlist-item"
import { resolveRemovableWishlistItemStep } from "./steps/resolve-removable-wishlist-item"

export type RemoveWishlistItemWorkflowInput = {
  customer_id: string
  item_id: string
}

const removeWishlistItemWorkflow = createWorkflow(
  "wishlist-remove-item",
  function (input: RemoveWishlistItemWorkflowInput) {
    const item = resolveRemovableWishlistItemStep({
      item_id: input.item_id,
      customer_id: input.customer_id,
    })

    deleteWishlistItemStep({
      id: item.id,
    })

    return new WorkflowResponse({
      id: item.id,
      removed: true,
    })
  }
)

export default removeWishlistItemWorkflow
