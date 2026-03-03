import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { MedusaError } from "@medusajs/framework/utils"

type ResolveRemovableWishlistItemStepInput = {
  item_id: string
  customer_id: string
}

type WishlistItemRecord = {
  id: string
  variant_id: string
  wishlist_id: string
  wishlist?: {
    customer_id?: string
  }
}

export const resolveRemovableWishlistItemStep = createStep(
  "wishlist-resolve-removable-item",
  async (input: ResolveRemovableWishlistItemStepInput, { container }) => {
    const query = container.resolve("query") as {
      graph: (input: Record<string, unknown>) => Promise<{
        data: WishlistItemRecord[]
      }>
    }

    const { data: items } = await query.graph({
      entity: "wishlist_item",
      fields: ["id", "variant_id", "wishlist_id", "wishlist.customer_id"],
      filters: {
        id: input.item_id,
      },
    })

    if (!items.length) {
      throw new MedusaError(MedusaError.Types.NOT_FOUND, "Wishlist item not found")
    }

    const item = items[0]

    if (item.wishlist?.customer_id !== input.customer_id) {
      throw new MedusaError(
        MedusaError.Types.NOT_ALLOWED,
        "Wishlist item does not belong to the authenticated customer"
      )
    }

    return new StepResponse(item)
  }
)
