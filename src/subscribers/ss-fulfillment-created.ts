import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { ssSendGridSend, getSsSalesChannelId } from "../utils/ss-sendgrid"

type FulfillmentRecord = {
  id: string
  tracking_links?: Array<{
    tracking_number?: string | null
    url?: string | null
  }> | null
  items?: Array<{
    title?: string | null
    quantity?: number | null
  }> | null
  metadata?: Record<string, unknown> | null
  order?: {
    id: string
    display_id?: string | number | null
    email?: string | null
    sales_channel_id?: string | null
    currency_code?: string | null
    metadata?: Record<string, unknown> | null
    customer?: {
      first_name?: string | null
      last_name?: string | null
      email?: string | null
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
  } | null
}

export default async function ssFulfillmentCreatedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER) as {
    info: (msg: string) => void
    warn: (msg: string) => void
  }

  const ssChannelId = getSsSalesChannelId()
  if (!ssChannelId) return

  const templateId = (process.env.SS_SENDGRID_TEMPLATE_SHIPPING_CONFIRMATION || "").trim()
  if (!templateId) return

  try {
    const query = container.resolve("query") as {
      graph: (input: Record<string, unknown>) => Promise<{ data: unknown[] }>
    }

    const { data: fulfillments } = await query.graph({
      entity: "fulfillment",
      fields: [
        "id",
        "tracking_links.tracking_number",
        "tracking_links.url",
        "items.title",
        "items.quantity",
        "metadata",
        "order.id",
        "order.display_id",
        "order.email",
        "order.sales_channel_id",
        "order.currency_code",
        "order.metadata",
        "order.customer.first_name",
        "order.customer.last_name",
        "order.customer.email",
        "order.shipping_address.first_name",
        "order.shipping_address.last_name",
        "order.items.id",
        "order.items.title",
        "order.items.quantity",
        "order.items.unit_price",
        "order.items.thumbnail",
      ],
      filters: { id: data.id },
    })

    const fulfillment = (fulfillments?.[0] || null) as FulfillmentRecord | null
    if (!fulfillment?.order) return

    const order = fulfillment.order

    // Sales channel gate
    if (order.sales_channel_id !== ssChannelId) return

    // Idempotency: skip if this fulfillment already triggered a send
    if (fulfillment.metadata?.ss_shipping_confirmation_sent_at) return

    const email = order.email || order.customer?.email
    if (!email) return

    const tracking = fulfillment.tracking_links?.[0]
    const storefrontUrl = (process.env.SS_STOREFRONT_URL || "").trim().replace(/\/+$/, "")

    const result = await ssSendGridSend({
      to: email,
      templateId,
      dynamicTemplateData: {
        // v2 nested
        order: {
          id: order.id,
          display_id: order.display_id ?? null,
          items: (order.items || []).map((item) => ({
            id: item.id,
            title: item.title || "Item",
            product_name: item.title || "Item",
            quantity: item.quantity ?? 0,
            price: item.unit_price != null ? (item.unit_price / 1).toFixed(2) : "0.00",
            thumbnail: item.thumbnail || null,
          })),
        },
        // v1 flat aliases (template uses {{tracking.*}}, {{items}}, {{estimated_delivery}})
        tracking: {
          carrier: "USPS",
          number: tracking?.tracking_number || "",
          url: tracking?.url || "#",
        },
        estimated_delivery: "3–5 business days",
        order_number: order.display_id ?? null,
        items: (order.items || []).map((item) => ({
          product_name: item.title || "Item",
          quantity: item.quantity ?? 0,
          price: item.unit_price != null ? (item.unit_price / 1).toFixed(2) : "0.00",
        })),
        // v2 nested (kept for forward compat)
        shipping: {
          tracking_number: tracking?.tracking_number || null,
          tracking_url: tracking?.url || null,
        },
        customer: {
          first_name:
            order.customer?.first_name ||
            order.shipping_address?.first_name ||
            "",
          last_name:
            order.customer?.last_name ||
            order.shipping_address?.last_name ||
            "",
          email,
        },
        links: {
          order_url: storefrontUrl
            ? `${storefrontUrl}/account/orders/details/${order.id}`
            : null,
          website_url: storefrontUrl || null,
        },
        brand: {
          top_wordmark_url:
            (process.env.SS_SENDGRID_BRAND_TOP_WORDMARK_URL || "").trim() || null,
          footer_logo_url:
            (process.env.SS_SENDGRID_BRAND_FOOTER_LOGO_URL || "").trim() || null,
        },
      },
    })

    if (!result.success) {
      logger.warn(
        `[ss-fulfillment-created] SendGrid send failed for fulfillment ${fulfillment.id}: ${result.error}`
      )
      return
    }

    logger.info(
      `[ss-fulfillment-created] Shipping confirmation sent for fulfillment ${fulfillment.id} (order ${order.id})`
    )
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error"
    logger.warn(`[ss-fulfillment-created] Failed for fulfillment ${data.id}: ${msg}`)
  }
}

export const config: SubscriberConfig = {
  event: "fulfillment.created",
}
