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
  "abandoned-cart.find-candidates",
  async (input: FindAbandonedCartsStepInput, { container }) => {
    const lookbackHours = input.lookback_hours || DEFAULT_LOOKBACK_HOURS
    const limit = input.limit || DEFAULT_LIMIT

    const cutoff = new Date(Date.now() - lookbackHours * 60 * 60 * 1000)

    const query = container.resolve("query") as {
      graph: (input: Record<string, unknown>) => Promise<{
        data: CartRecord[]
      }>
    }

    const { data: carts } = await query.graph({
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
      },
      pagination: {
        take: limit,
        skip: 0,
      },
      order: {
        updated_at: "ASC",
      },
    })

    const abandoned = (carts || []).filter((cart) => {
      const hasEmail = Boolean(cart.email)
      const hasItems = Array.isArray(cart.items) && cart.items.length > 0
      const alreadyNotified = Boolean(cart.metadata?.abandoned_notification_at)

      return hasEmail && hasItems && !alreadyNotified
    })

    return new StepResponse({ carts: abandoned })
  }
)
