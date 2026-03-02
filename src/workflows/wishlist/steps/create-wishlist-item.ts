import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { WISHLIST_MODULE } from "../../../modules/wishlist"

type WishlistItemRecord = {
  id: string
  wishlist_id: string
  variant_id: string
}

type WishlistService = {
  createWishlistItems: (data: Record<string, unknown>) => Promise<WishlistItemRecord>
  deleteWishlistItems: (id: string | string[]) => Promise<void>
}

type CreateWishlistItemStepInput = {
  wishlist_id: string
  variant_id: string
}

export const createWishlistItemStep = createStep(
  "wishlist.create-wishlist-item",
  async (input: CreateWishlistItemStepInput, { container }) => {
    const wishlistService = container.resolve(WISHLIST_MODULE) as WishlistService

    const item = await wishlistService.createWishlistItems({
      wishlist_id: input.wishlist_id,
      variant_id: input.variant_id,
    })

    return new StepResponse(item, item.id)
  },
  async (itemId, { container }) => {
    if (!itemId) {
      return
    }

    const wishlistService = container.resolve(WISHLIST_MODULE) as WishlistService
    await wishlistService.deleteWishlistItems(itemId)
  }
)
