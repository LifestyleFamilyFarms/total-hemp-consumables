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
    detail?: {
      quantity?: number | null
    } | null
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
        "items.quantity",
        "items.unit_price",
        "items.total",
        "items.thumbnail",
        "items.detail.quantity",
      ],
      filters: { id: data.id },
    })

    const order = (orders?.[0] || null) as OrderRecord | null
    if (!order) return

    // Sales channel gate
    if (order.sales_channel_id !== ssChannelId) return

    // query.graph() doesn't return computed totals — fetch via order module service
    const orderModuleService = container.resolve("order") as unknown as {
      retrieveOrder: (id: string, config?: Record<string, unknown>) => Promise<Record<string, unknown>>
    }
    const orderWithTotals = await orderModuleService.retrieveOrder(data.id, {
      select: ["id", "total", "subtotal", "tax_total", "shipping_total", "discount_total"],
    })
    // Overlay computed totals onto order
    const totals = {
      total: typeof orderWithTotals.total === "number" ? orderWithTotals.total : order.total,
      subtotal: typeof orderWithTotals.subtotal === "number" ? orderWithTotals.subtotal : order.subtotal,
      tax_total: typeof orderWithTotals.tax_total === "number" ? orderWithTotals.tax_total : order.tax_total,
      shipping_total: typeof orderWithTotals.shipping_total === "number" ? orderWithTotals.shipping_total : order.shipping_total,
      discount_total: typeof orderWithTotals.discount_total === "number" ? orderWithTotals.discount_total : order.discount_total,
    }

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
            ? new Date(
                typeof order.created_at === "string"
                  ? order.created_at
                  : (order.created_at as Date).toISOString()
              ).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : null,
          currency_code: cc,
          totals: {
            total: totals.total,
            total_display: formatCurrency(totals.total, cc),
            subtotal: totals.subtotal,
            subtotal_display: formatCurrency(totals.subtotal, cc),
            tax_total: totals.tax_total,
            tax_total_display: formatCurrency(totals.tax_total, cc),
            shipping_total: totals.shipping_total,
            shipping_total_display: formatCurrency(totals.shipping_total, cc),
            discount_total: totals.discount_total,
            discount_total_display: formatCurrency(totals.discount_total, cc),
          },
          items: (order.items || []).map((item) => ({
            id: item.id,
            title: item.title || "Item",
            quantity: item.detail?.quantity ?? item.quantity ?? 0,
            unit_price: item.unit_price,
            unit_price_display: formatCurrency(item.unit_price, cc),
            line_total_display: formatCurrency((item.detail?.quantity ?? item.quantity ?? 1) * (item.unit_price ?? 0), cc),
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
          support_url: storefrontUrl
            ? `${storefrontUrl}/contact`
            : "mailto:hello@sobersativas.com",
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

    // Notify fulfillment/ops team via plain-text email
    const fulfillmentEmail = (process.env.SS_FULFILLMENT_NOTIFICATION_EMAIL || "").trim()
    const ssApiKey = (process.env.SS_SENDGRID_API_KEY || "").trim()
    const ssFrom = (process.env.SS_SENDGRID_FROM || "").trim()
    if (fulfillmentEmail && ssApiKey && ssFrom) {
      const items = (order.items || [])
        .map((i) =>
          `${i.quantity ?? 1}x ${i.title ?? "Item"}`
        )
        .join("\n  ")
      const sa = order.shipping_address
      const addr = sa
        ? `${sa.first_name} ${sa.last_name}\n  ${sa.address_1}${sa.address_2 ? `, ${sa.address_2}` : ""}\n  ${sa.city}, ${sa.province || ""} ${sa.postal_code}`
        : "No shipping address"
      const adminUrl = (process.env.MEDUSA_ADMIN_URL || "").trim()

      await fetch("https://api.sendgrid.com/v3/mail/send", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${ssApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: fulfillmentEmail }] }],
          from: { email: ssFrom, name: "Sober Sativas Orders" },
          subject: `🌿 New Order #${order.display_id} — ${formatCurrency(totals.total, cc)}`,
          content: [{
            type: "text/plain",
            value: [
              `New order on Sober Sativas!`,
              ``,
              `Order #${order.display_id}`,
              `Date: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`,
              `Customer: ${email}`,
              `Total: ${formatCurrency(totals.total, cc)}`,
              ``,
              `Items:`,
              `  ${items}`,
              ``,
              `Ship to:`,
              `  ${addr}`,
              adminUrl ? `\nView in admin: ${adminUrl}/orders/${order.id}` : "",
            ].join("\n"),
          }],
        }),
      }).catch((err) => {
        logger.warn(`[ss-order-placed] Fulfillment notification failed: ${err instanceof Error ? err.message : "unknown"}`)
      })
      logger.info(`[ss-order-placed] Fulfillment notification sent to ${fulfillmentEmail} for order ${order.id}`)
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
