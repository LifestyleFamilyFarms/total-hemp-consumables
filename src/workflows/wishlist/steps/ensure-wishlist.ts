import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { WISHLIST_MODULE } from "../../../modules/wishlist"

type WishlistRecord = {
  id: string
  customer_id: string
}

type WishlistService = {
  listWishlists: (
    selector?: Record<string, unknown>,
    config?: Record<string, unknown>
  ) => Promise<WishlistRecord[]>
  createWishlists: (data: Record<string, unknown>) => Promise<WishlistRecord>
  deleteWishlists: (id: string | string[]) => Promise<void>
}

type EnsureWishlistStepInput = {
  customer_id: string
}

type EnsureWishlistCompensationInput = {
  created_wishlist_id: string | null
}

export const ensureWishlistStep = createStep(
  "wishlist.ensure-wishlist",
  async (input: EnsureWishlistStepInput, { container }) => {
    const wishlistService = container.resolve(WISHLIST_MODULE) as WishlistService

    const existing = await wishlistService.listWishlists(
      { customer_id: input.customer_id },
      { take: 1 }
    )

    if (existing.length) {
      return new StepResponse(
        {
          wishlist: existing[0],
        },
        {
          created_wishlist_id: null,
        }
      )
    }

    const created = await wishlistService.createWishlists({
      customer_id: input.customer_id,
    })

    return new StepResponse(
      {
        wishlist: created,
      },
      {
        created_wishlist_id: created.id,
      }
    )
  },
  async (compensationInput: EnsureWishlistCompensationInput, { container }) => {
    if (!compensationInput?.created_wishlist_id) {
      return
    }

    const wishlistService = container.resolve(WISHLIST_MODULE) as WishlistService
    await wishlistService.deleteWishlists(compensationInput.created_wishlist_id)
  }
)
