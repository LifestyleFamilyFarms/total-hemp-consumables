import type { MedusaContainer } from "@medusajs/framework/types"
import { createHmac } from "node:crypto"
import { ssSendGridSend, getSsSalesChannelId } from "../utils/ss-sendgrid"

const DEFAULT_LOOKBACK_HOURS = 24
const DEFAULT_LIMIT = 100
const DEFAULT_RECOVERY_TTL_HOURS = 72

type CartRecord = {
  id: string
  email?: string | null
  currency_code?: string | null
  updated_at?: string | Date | null
  metadata?: Record<string, unknown> | null
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

const formatUnitPrice = (amount: unknown, code?: string | null): string | null => {
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

const buildRecoveryUrl = (
  cartId: string,
  websiteUrl: string | null,
  secret: string,
  ttlHours: number
): string | null => {
  if (!websiteUrl) return null
  if (!secret) return `${websiteUrl}/cart`

  const nowSeconds = Math.floor(Date.now() / 1000)
  const payload = {
    v: 1,
    cart_id: cartId,
    iat: nowSeconds,
    exp: nowSeconds + ttlHours * 60 * 60,
  }
  const encoded = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url")
  const sig = createHmac("sha256", secret).update(encoded).digest("base64url")

  return `${websiteUrl}/cart/recover?token=${encodeURIComponent(`${encoded}.${sig}`)}`
}

export default async function ssProcessAbandonedCartsJob(
  container: MedusaContainer
) {
  const logger = container.resolve("logger") as {
    info: (msg: string) => void
    warn: (msg: string) => void
  }

  const disabled = (process.env.SS_ABANDONED_CART_JOB_DISABLED || "")
    .trim()
    .toLowerCase()
  if (["1", "true", "yes"].includes(disabled)) return

  const ssChannelId = getSsSalesChannelId()
  if (!ssChannelId) return

  const templateId = (process.env.SS_SENDGRID_TEMPLATE_ABANDONED_CART || "").trim()
  if (!templateId) return

  const lookbackHours = parsePositive(
    process.env.SS_ABANDONED_CART_LOOKBACK_HOURS,
    DEFAULT_LOOKBACK_HOURS
  )
  const limit = Math.floor(
    parsePositive(process.env.SS_ABANDONED_CART_LIMIT, DEFAULT_LIMIT)
  )

  const cutoff = new Date(Date.now() - lookbackHours * 60 * 60 * 1000)

  const query = container.resolve("query") as {
    graph: (input: Record<string, unknown>) => Promise<{
      data: CartRecord[]
      metadata?: { count?: number }
    }>
  }

  // Find abandoned SS carts
  const abandoned: CartRecord[] = []
  const seenEmails = new Set<string>()
  let offset = 0
  let total = Number.POSITIVE_INFINITY
  const pageSize = Math.min(Math.max(limit, 50), 200)

  while (abandoned.length < limit && offset < total) {
    const { data: carts, metadata } = await query.graph({
      entity: "cart",
      fields: [
        "id",
        "email",
        "currency_code",
        "updated_at",
        "completed_at",
        "metadata",
        "sales_channel_id",
        "customer.first_name",
        "customer.last_name",
        "shipping_address.first_name",
        "shipping_address.last_name",
        "items.title",
        "items.quantity",
        "items.unit_price",
        "items.thumbnail",
      ],
      filters: {
        updated_at: { $lte: cutoff },
        completed_at: null,
        email: { $ne: null },
        sales_channel_id: ssChannelId,
      },
      pagination: { take: pageSize, skip: offset },
      order: { updated_at: "DESC" },
    })

    total = metadata?.count ?? offset + (carts?.length || 0)
    const fetched = carts || []
    if (!fetched.length) break

    for (const cart of fetched) {
      const hasItems = Array.isArray(cart.items) && cart.items.length > 0
      const alreadyNotified = Boolean(cart.metadata?.abandoned_notification_at)
      const emailKey = (cart.email || "").trim().toLowerCase()

      if (hasItems && !alreadyNotified && emailKey && !seenEmails.has(emailKey)) {
        abandoned.push(cart)
        seenEmails.add(emailKey)
      }
      if (abandoned.length >= limit) break
    }

    offset += fetched.length
  }

  if (!abandoned.length) return

  // Send notifications
  const storefrontUrl = (process.env.SS_STOREFRONT_URL || "").trim().replace(/\/+$/, "") || null
  const recoverySecret = (process.env.SS_SENDGRID_ABANDONED_CART_RECOVERY_SECRET || "").trim()
  const recoveryTtlHours = parsePositive(
    process.env.SS_SENDGRID_ABANDONED_CART_RECOVERY_TTL_HOURS,
    DEFAULT_RECOVERY_TTL_HOURS
  )

  let sentCount = 0

  const cartService = container.resolve("cart") as {
    updateCarts: (data: Array<{ id: string; metadata: Record<string, unknown> }>) => Promise<unknown>
  }

  for (const cart of abandoned) {
    if (!cart.email) continue

    const recoverUrl = buildRecoveryUrl(
      cart.id,
      storefrontUrl,
      recoverySecret,
      recoveryTtlHours
    )

    const result = await ssSendGridSend({
      to: cart.email,
      templateId,
      dynamicTemplateData: {
        customer: {
          first_name:
            cart.customer?.first_name ||
            cart.shipping_address?.first_name ||
            "",
          last_name:
            cart.customer?.last_name ||
            cart.shipping_address?.last_name ||
            "",
        },
        cart_id: cart.id,
        recover_url: recoverUrl,
        items: (cart.items || []).map((item) => ({
          title: item.title,
          quantity: item.quantity,
          unit_price: item.unit_price,
          unit_price_display: formatUnitPrice(item.unit_price, cart.currency_code),
          thumbnail: item.thumbnail,
        })),
        links: {
          website_url: storefrontUrl,
        },
        brand: {
          top_wordmark_url:
            (process.env.SS_SENDGRID_BRAND_TOP_WORDMARK_URL || "").trim() || null,
          footer_logo_url:
            (process.env.SS_SENDGRID_BRAND_FOOTER_LOGO_URL || "").trim() || null,
        },
      },
    })

    if (result.success) {
      sentCount++
      try {
        await cartService.updateCarts([
          {
            id: cart.id,
            metadata: {
              ...(cart.metadata || {}),
              abandoned_notification_at: new Date().toISOString(),
            },
          },
        ])
      } catch {
        logger.warn(
          `[ss-abandoned-cart] Email sent but metadata update failed for cart ${cart.id}`
        )
      }
    } else {
      logger.warn(
        `[ss-abandoned-cart] SendGrid failed for cart ${cart.id}: ${result.error}`
      )
    }
  }

  if (sentCount > 0) {
    logger.info(
      `[ss-abandoned-cart] Sent ${sentCount} abandoned cart notification(s).`
    )
  }
}

function parsePositive(value: string | undefined, fallback: number): number {
  const parsed = Number.parseFloat((value || "").trim())
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

export const config = {
  name: "ss-process-abandoned-carts",
  schedule: "30 */4 * * *",
}
