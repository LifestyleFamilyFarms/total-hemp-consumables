import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"

type FindAbandonedCartsStepInput = {
  lookback_hours?: number
  limit?: number
}

type CartRecord = {
  id: string
  email?: string | null
  updated_at?: string | Date | null
  metadata?: Record<string, unknown> | null
  customer?: {
    id: string
    first_name?: string | null
    last_name?: string | null
  } | null
  shipping_address?: {
    first_name?: string | null
    last_name?: string | null
  } | null
  items?: Array<{
    id: string
    title?: string | null
    quantity?: number | null
    unit_price?: number | null
    thumbnail?: string | null
  }> | null
}

const DEFAULT_LOOKBACK_HOURS = 24
const DEFAULT_LIMIT = 100

export const findAbandonedCartsStep = createStep(
  "abandoned-cart-find-candidates",
  async (input: FindAbandonedCartsStepInput, { container }) => {
    const lookbackHours = input.lookback_hours || DEFAULT_LOOKBACK_HOURS
    const limit = input.limit || DEFAULT_LIMIT
    const pageSize = Math.min(Math.max(limit, 50), 200)

    const cutoff = new Date(Date.now() - lookbackHours * 60 * 60 * 1000)

    const query = container.resolve("query") as {
      graph: (input: Record<string, unknown>) => Promise<{
        data: CartRecord[]
        metadata?: {
          count?: number
        }
      }>
    }

    const abandoned: CartRecord[] = []
    let offset = 0
    let total = Number.POSITIVE_INFINITY

    while (abandoned.length < limit && offset < total) {
      const { data: carts, metadata } = await query.graph({
        entity: "cart",
        fields: [
          "id",
          "email",
          "updated_at",
          "completed_at",
          "metadata",
          "customer.id",
          "customer.first_name",
          "customer.last_name",
          "shipping_address.first_name",
          "shipping_address.last_name",
          "items.id",
          "items.title",
          "items.quantity",
          "items.unit_price",
          "items.thumbnail",
        ],
        filters: {
          updated_at: {
            $lte: cutoff,
          },
          completed_at: null,
          email: {
            $ne: null,
          },
        },
        pagination: {
          take: pageSize,
          skip: offset,
        },
        order: {
          updated_at: "ASC",
        },
      })

      total = metadata?.count ?? offset + (carts?.length || 0)
      const fetched = carts || []

      if (!fetched.length) {
        break
      }

      for (const cart of fetched) {
        const hasItems = Array.isArray(cart.items) && cart.items.length > 0
        const alreadyNotified = Boolean(cart.metadata?.abandoned_notification_at)

        if (hasItems && !alreadyNotified) {
          abandoned.push(cart)
        }

        if (abandoned.length >= limit) {
          break
        }
      }

      offset += fetched.length
    }

    return new StepResponse({ carts: abandoned.slice(0, limit) })
  }
)
