import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { MedusaError } from "@medusajs/framework/utils"
import { WISHLIST_MODULE } from "../../../modules/wishlist"

type WishlistItemRecord = {
  id: string
  wishlist_id: string
  variant_id: string
}

type WishlistService = {
  createWishlistItems: (
    data: Record<string, unknown> | Array<Record<string, unknown>>
  ) => Promise<WishlistItemRecord | WishlistItemRecord[]>
  deleteWishlistItems: (id: string | string[]) => Promise<void>
}

type CreateWishlistItemStepInput = {
  wishlist_id: string
  variant_id: string
}

export const createWishlistItemStep = createStep(
  "wishlist-create-wishlist-item",
  async (input: CreateWishlistItemStepInput, { container }) => {
    const wishlistService = container.resolve(WISHLIST_MODULE) as WishlistService

    const created = await wishlistService.createWishlistItems({
      wishlist_id: input.wishlist_id,
      variant_id: input.variant_id,
    })
    const item = Array.isArray(created) ? created[0] : created

    if (!item?.id) {
      throw new MedusaError(
        MedusaError.Types.UNEXPECTED_STATE,
        "Failed to create wishlist item"
      )
    }

    return new StepResponse(item, { item_id: item.id })
  },
  async (compensationInput, { container }) => {
    if (!compensationInput?.item_id) {
      return
    }

    const wishlistService = container.resolve(WISHLIST_MODULE) as WishlistService
    await wishlistService.deleteWishlistItems(compensationInput.item_id)
  }
)
