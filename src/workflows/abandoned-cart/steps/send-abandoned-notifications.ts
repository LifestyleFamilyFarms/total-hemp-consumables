import { Modules } from "@medusajs/framework/utils"
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
}

type NotificationService = {
  createNotifications: (data: Array<Record<string, unknown>>) => Promise<unknown[]>
}

export const sendAbandonedNotificationsStep = createStep(
  "abandoned-cart.send-notifications",
  async (input: SendAbandonedNotificationsStepInput, { container }) => {
    if (!input.carts.length) {
      return new StepResponse({ notifications: [] })
    }

    const notificationModule = container.resolve(
      Modules.NOTIFICATION
    ) as unknown as NotificationService

    const template = process.env.ABANDONED_CART_TEMPLATE_ID || "abandoned-cart"

    const payload = input.carts.map((cart) => ({
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
    }))

    const notifications = await notificationModule.createNotifications(payload)

    return new StepResponse({ notifications })
  }
)
