import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { createHmac } from "node:crypto"

type CartRecord = {
  id: string
  email?: string | null
  currency_code?: string | null
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

type Logger = {
  warn: (message: string) => void
}

const DEFAULT_RECOVERY_TTL_HOURS = 72

const toAbsoluteUrl = (value: string | undefined): string | null => {
  const trimmed = (value || "").trim().replace(/\/+$/, "")
  if (!trimmed || !/^https?:\/\//i.test(trimmed)) {
    return null
  }

  return trimmed
}

const toPositiveInteger = (
  value: string | undefined,
  fallback: number
): number => {
  const parsed = Number.parseInt((value || "").trim(), 10)

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback
  }

  return parsed
}

const buildRecoveryToken = (
  cartId: string,
  secret: string,
  ttlHours: number
): string => {
  const nowSeconds = Math.floor(Date.now() / 1000)
  const payload = {
    v: 1,
    cart_id: cartId,
    iat: nowSeconds,
    exp: nowSeconds + ttlHours * 60 * 60,
  }
  const encodedPayload = Buffer.from(JSON.stringify(payload), "utf8").toString(
    "base64url"
  )
  const signature = createHmac("sha256", secret)
    .update(encodedPayload)
    .digest("base64url")

  return `${encodedPayload}.${signature}`
}

const buildRecoveryUrl = ({
  websiteUrl,
  cartId,
  recoverySecret,
  recoveryTtlHours,
}: {
  websiteUrl: string | null
  cartId: string
  recoverySecret: string
  recoveryTtlHours: number
}): string | null => {
  if (!websiteUrl) {
    return null
  }

  if (!recoverySecret) {
    return `${websiteUrl}/cart`
  }

  const token = buildRecoveryToken(cartId, recoverySecret, recoveryTtlHours)
  return `${websiteUrl}/cart/recover?token=${encodeURIComponent(token)}`
}

const toCurrencyCode = (value: string | null | undefined): string => {
  const normalized = (value || "").trim().toUpperCase()
  if (/^[A-Z]{3}$/.test(normalized)) {
    return normalized
  }
  return "USD"
}

const formatUnitPrice = (
  amount: number | null | undefined,
  currencyCode: string | null | undefined
): string | null => {
  if (typeof amount !== "number" || !Number.isFinite(amount)) {
    return null
  }

  const code = toCurrencyCode(currencyCode)

  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: code,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  } catch {
    return `$${amount.toFixed(2)}`
  }
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

    const logger = container.resolve(ContainerRegistrationKeys.LOGGER) as Logger
    const template = (process.env.SENDGRID_TEMPLATE_ABANDONED_CART || "").trim()

    if (!template) {
      logger.warn(
        "[abandoned-cart] SENDGRID_TEMPLATE_ABANDONED_CART is not set; skipping abandoned-cart notification send."
      )

      return new StepResponse({
        notifications: [],
        processed_cart_ids: [],
      })
    }

    let notificationModule: NotificationService
    try {
      notificationModule = container.resolve(
        Modules.NOTIFICATION
      ) as unknown as NotificationService
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown notification module error"
      logger.warn(
        `[abandoned-cart] Notification module/provider unavailable; skipping abandoned-cart notification send. ${message}`
      )
      return new StepResponse({
        notifications: [],
        processed_cart_ids: [],
      })
    }

    const notifications: unknown[] = []
    const processedCartIds: string[] = []
    const storefrontUrl = toAbsoluteUrl(process.env.STOREFRONT_URL)
    const websiteUrl = toAbsoluteUrl(process.env.SENDGRID_WEBSITE_URL) || storefrontUrl
    const supportUrl =
      toAbsoluteUrl(process.env.SENDGRID_SUPPORT_URL) ||
      (storefrontUrl ? `${storefrontUrl}/content/contact` : websiteUrl)
    const recoverySecret = (process.env.SENDGRID_ABANDONED_CART_RECOVERY_SECRET || "").trim()
    const recoveryTtlHours = toPositiveInteger(
      process.env.SENDGRID_ABANDONED_CART_RECOVERY_TTL_HOURS,
      DEFAULT_RECOVERY_TTL_HOURS
    )
    const topWordmarkUrl = toAbsoluteUrl(process.env.SENDGRID_BRAND_TOP_WORDMARK_URL)
    const footerLogoUrl = toAbsoluteUrl(process.env.SENDGRID_BRAND_FOOTER_LOGO_URL)

    for (const cart of input.carts) {
      if (!cart.email) {
        logger.warn(
          `[abandoned-cart] Skipping cart ${cart.id}: missing customer email.`
        )
        continue
      }

      const recoverUrl = buildRecoveryUrl({
        websiteUrl,
        cartId: cart.id,
        recoverySecret,
        recoveryTtlHours,
      })
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
          recover_url: recoverUrl,
          links: {
            website_url: websiteUrl,
            support_url: supportUrl,
          },
          brand: {
            top_wordmark_url: topWordmarkUrl,
            footer_logo_url: footerLogoUrl,
            website_url: websiteUrl,
          },
          items: (cart.items || []).map((item) => ({
            title: item.title,
            quantity: item.quantity,
            unit_price: item.unit_price,
            unit_price_display: formatUnitPrice(item.unit_price, cart.currency_code),
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
