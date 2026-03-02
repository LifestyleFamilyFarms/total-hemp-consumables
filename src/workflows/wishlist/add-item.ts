import { createWorkflow, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { useQueryGraphStep } from "@medusajs/medusa/core-flows"
import { createWishlistItemStep } from "./steps/create-wishlist-item"
import { ensureWishlistStep } from "./steps/ensure-wishlist"
import { validateItemNotInWishlistStep } from "./steps/validate-item-not-in-wishlist"

export type AddWishlistItemWorkflowInput = {
  customer_id: string
  variant_id: string
}

const addWishlistItemWorkflow = createWorkflow(
  "wishlist.add-item",
  function (input: AddWishlistItemWorkflowInput) {
    useQueryGraphStep({
      entity: "product_variant",
      fields: ["id"],
      filters: {
        id: input.variant_id,
      },
      options: {
        throwIfKeyNotFound: true,
      },
    })

    const { wishlist } = ensureWishlistStep({
      customer_id: input.customer_id,
    })

    validateItemNotInWishlistStep({
      wishlist_id: wishlist.id,
      variant_id: input.variant_id,
    })

    const item = createWishlistItemStep({
      wishlist_id: wishlist.id,
      variant_id: input.variant_id,
    })

    return new WorkflowResponse({
      wishlist_id: wishlist.id,
      item,
    })
  }
)

export default addWishlistItemWorkflow
