import { createStep } from "@medusajs/framework/workflows-sdk"
import { MedusaError } from "@medusajs/framework/utils"
import { WISHLIST_MODULE } from "../../../modules/wishlist"

type WishlistItemRecord = {
  id: string
}

type WishlistService = {
  listWishlistItems: (
    selector?: Record<string, unknown>,
    config?: Record<string, unknown>
  ) => Promise<WishlistItemRecord[]>
}

type ValidateItemNotInWishlistStepInput = {
  wishlist_id: string
  variant_id: string
}

export const validateItemNotInWishlistStep = createStep(
  "wishlist.validate-item-not-in-wishlist",
  async (input: ValidateItemNotInWishlistStepInput, { container }) => {
    const wishlistService = container.resolve(WISHLIST_MODULE) as WishlistService

    const existing = await wishlistService.listWishlistItems(
      {
        wishlist_id: input.wishlist_id,
        variant_id: input.variant_id,
      },
      { take: 1 }
    )

    if (existing.length > 0) {
      throw new MedusaError(
        MedusaError.Types.CONFLICT,
        "Variant already exists in wishlist"
      )
    }
  }
)
