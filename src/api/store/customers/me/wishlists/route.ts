import {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { WISHLIST_MODULE } from "../../../../../modules/wishlist"

type WishlistRecord = {
  id: string
  customer_id: string
}

type WishlistItemRecord = {
  id: string
  wishlist_id: string
  variant_id: string
}

type WishlistService = {
  listWishlists: (
    selector?: Record<string, unknown>,
    config?: Record<string, unknown>
  ) => Promise<WishlistRecord[]>
  listWishlistItems: (
    selector?: Record<string, unknown>,
    config?: Record<string, unknown>
  ) => Promise<WishlistItemRecord[]>
}

type ProductVariantRecord = {
  id: string
  sku?: string | null
  title?: string | null
  product?: {
    id: string
    title?: string | null
    handle?: string | null
    thumbnail?: string | null
  }
}

export async function GET(req: AuthenticatedMedusaRequest, res: MedusaResponse) {
  const wishlistService = req.scope.resolve(WISHLIST_MODULE) as WishlistService

  const wishlists = await wishlistService.listWishlists(
    { customer_id: req.auth_context.actor_id },
    { take: 1 }
  )

  if (!wishlists.length) {
    return res.status(200).json({
      wishlist: null,
      items: [],
    })
  }

  const wishlist = wishlists[0]

  const items = await wishlistService.listWishlistItems(
    { wishlist_id: wishlist.id },
    {
      order: {
        created_at: "DESC",
      },
    }
  )

  const variantIds = items.map((item) => item.variant_id)

  let variants: ProductVariantRecord[] = []

  if (variantIds.length > 0) {
    const query = req.scope.resolve("query") as {
      graph: (input: Record<string, unknown>) => Promise<{
        data: ProductVariantRecord[]
      }>
    }

    const result = await query.graph({
      entity: "product_variant",
      fields: [
        "id",
        "sku",
        "title",
        "product.id",
        "product.title",
        "product.handle",
        "product.thumbnail",
      ],
      filters: {
        id: variantIds,
      },
    })

    variants = result.data
  }

  const variantsMap = new Map(variants.map((variant) => [variant.id, variant]))

  return res.status(200).json({
    wishlist,
    items: items.map((item) => ({
      ...item,
      variant: variantsMap.get(item.variant_id) || null,
    })),
  })
}
