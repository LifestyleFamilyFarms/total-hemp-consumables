import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"

export default async function orderCreatedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const orderService = container.resolve("order") as {
    retrieveOrder: (id: string, config?: Record<string, unknown>) => Promise<{
      id: string
      metadata?: Record<string, unknown>
      cart_id?: string
      customer_id?: string
    }>
    updateOrders: (id: string, data: Record<string, unknown>) => Promise<unknown>
  }

  const cartService = container.resolve("cart") as {
    retrieveCart: (id: string) => Promise<{ metadata?: Record<string, unknown> }>
  }

  const customerService = container.resolve("customer") as {
    retrieveCustomer: (id: string) => Promise<{ metadata?: Record<string, unknown> }>
  }

  const order = await orderService.retrieveOrder(data.id, {
    select: ["id", "metadata", "cart_id", "customer_id"],
  })

  const existing = order.metadata || {}
  if (existing.sales_person_id || existing.sales_person_code) {
    return
  }

  let repMetadata: Record<string, unknown> | null = null

  if (order.cart_id) {
    const cart = await cartService.retrieveCart(order.cart_id)
    if (cart?.metadata?.sales_person_id || cart?.metadata?.sales_person_code) {
      repMetadata = {
        sales_person_id: cart.metadata.sales_person_id,
        sales_person_code: cart.metadata.sales_person_code,
      }
    }
  }

  if (!repMetadata && order.customer_id) {
    const customer = await customerService.retrieveCustomer(order.customer_id)
    if (
      customer?.metadata?.sales_person_id ||
      customer?.metadata?.sales_person_code
    ) {
      repMetadata = {
        sales_person_id: customer.metadata.sales_person_id,
        sales_person_code: customer.metadata.sales_person_code,
      }
    }
  }

  if (!repMetadata) {
    return
  }

  await orderService.updateOrders(order.id, {
    metadata: {
      ...existing,
      ...repMetadata,
    },
  })
}

export const config: SubscriberConfig = {
  event: "order.created",
}
