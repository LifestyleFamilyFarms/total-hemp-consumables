import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { ssSendGridSend, getSsSalesChannelId } from "../utils/ss-sendgrid"

type OrderRecord = {
  id: string
  display_id?: string | number | null
  email?: string | null
  created_at?: string | Date | null
  sales_channel_id?: string | null
  currency_code?: string | null
  total?: number | null
  subtotal?: number | null
  tax_total?: number | null
  shipping_total?: number | null
  discount_total?: number | null
  metadata?: Record<string, unknown> | null
  customer?: {
    first_name?: string | null
    last_name?: string | null
    email?: string | null
  } | null
  shipping_address?: {
    first_name?: string | null
    last_name?: string | null
    address_1?: string | null
    address_2?: string | null
    city?: string | null
    province?: string | null
    postal_code?: string | null
    country_code?: string | null
  } | null
  items?: Array<{
    id: string
    title?: string | null
    quantity?: number | null
    unit_price?: number | null
    thumbnail?: string | null
  }> | null
}

const formatCurrency = (amount: unknown, code?: string | null): string | null => {
  if (typeof amount !== "number" || !Number.isFinite(amount)) return null
  const currency = (code || "USD").toUpperCase()
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
    }).format(amount)
  } catch {
    return `$${(amount as number).toFixed(2)}`
  }
}

export default async function ssOrderPlacedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER) as {
    info: (msg: string) => void
    warn: (msg: string) => void
  }

  const ssChannelId = getSsSalesChannelId()
  if (!ssChannelId) return

  const templateId = (process.env.SS_SENDGRID_TEMPLATE_ORDER_CONFIRMATION || "").trim()
  if (!templateId) return

  try {
    const query = container.resolve("query") as {
      graph: (input: Record<string, unknown>) => Promise<{ data: unknown[] }>
    }

    const { data: orders } = await query.graph({
      entity: "order",
      fields: [
        "id",
        "display_id",
        "email",
        "created_at",
        "sales_channel_id",
        "currency_code",
        "+total",
        "+subtotal",
        "+tax_total",
        "+shipping_total",
        "+discount_total",
        "metadata",
        "customer.first_name",
        "customer.last_name",
        "customer.email",
        "shipping_address.first_name",
        "shipping_address.last_name",
        "shipping_address.address_1",
        "shipping_address.address_2",
        "shipping_address.city",
        "shipping_address.province",
        "shipping_address.postal_code",
        "shipping_address.country_code",
        "items.id",
        "items.title",
        "+items.quantity",
        "+items.unit_price",
        "+items.total",
        "items.thumbnail",
      ],
      filters: { id: data.id },
    })

    const order = (orders?.[0] || null) as OrderRecord | null
    if (!order) return

    // Sales channel gate
    if (order.sales_channel_id !== ssChannelId) return

    // Idempotency: skip if already sent
    if (order.metadata?.ss_order_confirmation_sent_at) return

    const email = order.email || order.customer?.email
    if (!email) return

    const cc = order.currency_code
    const storefrontUrl = (process.env.SS_STOREFRONT_URL || "").trim().replace(/\/+$/, "")

    const result = await ssSendGridSend({
      to: email,
      templateId,
      dynamicTemplateData: {
        order: {
          id: order.id,
          display_id: order.display_id ?? null,
          created_at: order.created_at
            ? typeof order.created_at === "string"
              ? order.created_at
              : (order.created_at as Date).toISOString()
            : null,
          currency_code: cc,
          totals: {
            total: order.total,
            total_display: formatCurrency(order.total, cc),
            subtotal: order.subtotal,
            subtotal_display: formatCurrency(order.subtotal, cc),
            tax_total: order.tax_total,
            tax_total_display: formatCurrency(order.tax_total, cc),
            shipping_total: order.shipping_total,
            shipping_total_display: formatCurrency(order.shipping_total, cc),
            discount_total: order.discount_total,
            discount_total_display: formatCurrency(order.discount_total, cc),
          },
          items: (order.items || []).map((item) => ({
            id: item.id,
            title: item.title || "Item",
            quantity: item.quantity ?? 0,
            unit_price: item.unit_price,
            unit_price_display: formatCurrency(item.unit_price, cc),
            thumbnail: item.thumbnail || null,
          })),
        },
        customer: {
          first_name: order.customer?.first_name || order.shipping_address?.first_name || "",
          last_name: order.customer?.last_name || order.shipping_address?.last_name || "",
          email,
        },
        shipping_address: order.shipping_address
          ? {
              address_1: order.shipping_address.address_1 || "",
              address_2: order.shipping_address.address_2 || "",
              city: order.shipping_address.city || "",
              province: order.shipping_address.province || "",
              postal_code: order.shipping_address.postal_code || "",
              country_code: order.shipping_address.country_code || "",
            }
          : null,
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
        `[ss-order-placed] SendGrid send failed for order ${order.id}: ${result.error}`
      )
      return
    }

    // Mark as sent (idempotency)
    try {
      const orderService = container.resolve("order") as {
        updateOrders: (id: string, data: Record<string, unknown>) => Promise<unknown>
      }
      await orderService.updateOrders(order.id, {
        metadata: {
          ...(order.metadata || {}),
          ss_order_confirmation_sent_at: new Date().toISOString(),
        },
      })
    } catch (metaErr) {
      logger.warn(
        `[ss-order-placed] Email sent but metadata update failed for order ${order.id}`
      )
    }

    logger.info(`[ss-order-placed] Order confirmation sent for order ${order.id}`)
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error"
    logger.warn(`[ss-order-placed] Failed for order ${data.id}: ${msg}`)
  }
}

export const config: SubscriberConfig = {
  event: "order.placed",
}
