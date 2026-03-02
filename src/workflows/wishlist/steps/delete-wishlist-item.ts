import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { WISHLIST_MODULE } from "../../../modules/wishlist"

type WishlistService = {
  deleteWishlistItems: (id: string | string[]) => Promise<void>
  restoreWishlistItems: (id: string | string[]) => Promise<void>
}

type DeleteWishlistItemStepInput = {
  id: string
}

export const deleteWishlistItemStep = createStep(
  "wishlist.delete-wishlist-item",
  async (input: DeleteWishlistItemStepInput, { container }) => {
    const wishlistService = container.resolve(WISHLIST_MODULE) as WishlistService
    await wishlistService.deleteWishlistItems(input.id)

    return new StepResponse({ id: input.id }, input.id)
  },
  async (itemId, { container }) => {
    if (!itemId) {
      return
    }

    const wishlistService = container.resolve(WISHLIST_MODULE) as WishlistService
    await wishlistService.restoreWishlistItems(itemId)
  }
)
