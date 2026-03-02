import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import type { AbandonedCartVisibilityQuery } from "./middlewares"

type CartVisibilityRecord = {
  id: string
  email?: string | null
  updated_at?: string | null
  metadata?: Record<string, unknown> | null
}

export async function GET(
  req: MedusaRequest<AbandonedCartVisibilityQuery>,
  res: MedusaResponse
) {
  const { limit, offset } = req.validatedQuery as AbandonedCartVisibilityQuery

  const query = req.scope.resolve("query") as {
    graph: (input: Record<string, unknown>) => Promise<{
      data: CartVisibilityRecord[]
      metadata?: { count?: number }
    }>
  }

  const isAbandonedCandidate = (cart: CartVisibilityRecord) =>
    Boolean(
      cart.metadata?.abandoned_last_activity_at ||
        cart.metadata?.abandoned_notification_at
    )

  // Build deterministic pagination/count on abandoned-cart candidates,
  // not on all carts with post-filtered pages.
  const scanLimit = 200
  let scanOffset = 0
  let totalCarts = 0
  const candidates: CartVisibilityRecord[] = []

  do {
    const { data: carts, metadata } = await query.graph({
      entity: "cart",
      fields: ["id", "email", "updated_at", "metadata"],
      pagination: {
        take: scanLimit,
        skip: scanOffset,
      },
      order: {
        updated_at: "DESC",
      },
    })

    totalCarts = metadata?.count ?? 0
    scanOffset += scanLimit

    for (const cart of carts) {
      if (isAbandonedCandidate(cart)) {
        candidates.push(cart)
      }
    }
  } while (scanOffset < totalCarts)

  const paged = candidates.slice(offset, offset + limit)

  return res.status(200).json({
    carts: paged,
    count: candidates.length,
    limit,
    offset,
  })
}
