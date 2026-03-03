import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"

type CartRecord = {
  id: string
  email?: string | null
  customer?: {
    first_name?: string | null
    last_name?: string | null
  } | null
  shipping_address?: {
    first_name?: string | null
    last_name?: string | null
  } | null
  items?: Array<{
    title?: string | null
    quantity?: number | null
    unit_price?: number | null
    thumbnail?: string | null
  }> | null
}

type SendAbandonedNotificationsStepInput = {
  carts: CartRecord[]
  dry_run?: boolean
}

type NotificationService = {
  createNotifications: (data: Array<Record<string, unknown>>) => Promise<unknown[]>
}

export const sendAbandonedNotificationsStep = createStep(
  "abandoned-cart-send-notifications",
  async (input: SendAbandonedNotificationsStepInput, { container }) => {
    if (input.dry_run || !input.carts.length) {
      return new StepResponse({
        notifications: [],
        processed_cart_ids: [],
      })
    }

    const notificationModule = container.resolve(
      Modules.NOTIFICATION
    ) as unknown as NotificationService

    const logger = container.resolve(ContainerRegistrationKeys.LOGGER) as {
      warn: (message: string) => void
    }
    const template = (process.env.ABANDONED_CART_TEMPLATE_ID || "").trim()

    if (!template) {
      logger.warn(
        "[abandoned-cart] ABANDONED_CART_TEMPLATE_ID is not set; skipping abandoned-cart notification send."
      )

      return new StepResponse({
        notifications: [],
        processed_cart_ids: [],
      })
    }

    const notifications: unknown[] = []
    const processedCartIds: string[] = []

    for (const cart of input.carts) {
      const payload = {
        to: cart.email,
        channel: "email",
        template,
        data: {
          customer: {
            first_name: cart.customer?.first_name || cart.shipping_address?.first_name || "",
            last_name: cart.customer?.last_name || cart.shipping_address?.last_name || "",
          },
          cart_id: cart.id,
          items: (cart.items || []).map((item) => ({
            title: item.title,
            quantity: item.quantity,
            unit_price: item.unit_price,
            thumbnail: item.thumbnail,
          })),
        },
      }

      try {
        const created = await notificationModule.createNotifications([payload])
        notifications.push(...created)
        processedCartIds.push(cart.id)
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown notification error"
        logger.warn(
          `[abandoned-cart] Failed to send notification for cart ${cart.id}: ${message}`
        )
      }
    }

    return new StepResponse({
      notifications,
      processed_cart_ids: processedCartIds,
    })
  }
)
