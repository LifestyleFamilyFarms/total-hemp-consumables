import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"

export type TransactionalEmailTrigger =
  | "order_confirmation"
  | "shipping_status"
  | "refund_status"
  | "cancellation_status"

export type ProcessOrderTransactionalEmailStepInput = {
  order_id: string
  trigger: TransactionalEmailTrigger
}

type ProcessOrderTransactionalEmailStepOutput = {
  sent: boolean
  skipped_reason: string | null
  trigger: TransactionalEmailTrigger
  order_id: string
  template: string | null
}

type OrderRecord = {
  id: string
  display_id?: string | number | null
  email?: string | null
  created_at?: string | Date | null
  status?: string | null
  payment_status?: string | null
  fulfillment_status?: string | null
  canceled_at?: string | Date | null
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
  items?: Array<{
    id: string
    title?: string | null
    quantity?: number | null
    unit_price?: number | null
    thumbnail?: string | null
  }> | null
}

type NotificationService = {
  createNotifications: (data: Array<Record<string, unknown>>) => Promise<unknown[]>
}

type OrderService = {
  updateOrders: (id: string, data: Record<string, unknown>) => Promise<unknown>
}

type Logger = {
  warn: (message: string) => void
}

type NotificationPlan = {
  type: TransactionalEmailTrigger
  template: string
  metadata_patch: Record<string, unknown>
  data: Record<string, unknown>
}

const ORDER_CONFIRMATION_SENT_AT = "transactional_email_order_confirmation_sent_at"
const SHIPPING_CONFIRMATION_SENT_AT = "transactional_email_shipping_confirmation_sent_at"
const SHIPPING_UPDATE_SENT_AT = "transactional_email_shipping_update_sent_at"
const LAST_NOTIFIED_FULFILLMENT_STATUS =
  "transactional_email_last_notified_fulfillment_status"
const REFUND_CONFIRMATION_SENT_AT = "transactional_email_refund_confirmation_sent_at"
const LAST_NOTIFIED_PAYMENT_STATUS = "transactional_email_last_notified_payment_status"
const CANCELLATION_CONFIRMATION_SENT_AT =
  "transactional_email_cancellation_confirmation_sent_at"

const SHIPPING_ACTIVE_STATUSES = new Set([
  "partially_fulfilled",
  "fulfilled",
  "partially_shipped",
  "shipped",
])

const REFUNDED_STATUSES = new Set(["partially_refunded", "refunded"])

const toStatus = (value: unknown): string =>
  typeof value === "string" ? value.trim().toLowerCase() : ""

const asNumber = (value: unknown): number | null =>
  typeof value === "number" && Number.isFinite(value) ? value : null

const asIso = (value: unknown): string | null => {
  if (!value) {
    return null
  }

  if (typeof value === "string") {
    return value
  }

  if (value instanceof Date) {
    return value.toISOString()
  }

  return null
}

const toAbsoluteUrl = (value: string | undefined): string | null => {
  const trimmed = (value || "").trim().replace(/\/+$/, "")
  if (!trimmed || !/^https?:\/\//i.test(trimmed)) {
    return null
  }

  return trimmed
}

const toCurrencyCode = (value: string | null | undefined): string => {
  const normalized = (value || "").trim().toUpperCase()
  if (/^[A-Z]{3}$/.test(normalized)) {
    return normalized
  }
  return "USD"
}

const formatCurrency = (
  amount: number | null,
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

const buildTemplateData = (order: OrderRecord, type: TransactionalEmailTrigger) => {
  const storefrontUrl = toAbsoluteUrl(process.env.STOREFRONT_URL)
  const websiteUrl = toAbsoluteUrl(process.env.SENDGRID_WEBSITE_URL) || storefrontUrl
  const supportUrl =
    toAbsoluteUrl(process.env.SENDGRID_SUPPORT_URL) ||
    (storefrontUrl ? `${storefrontUrl}/content/contact` : websiteUrl)
  const orderUrl = storefrontUrl ? `${storefrontUrl}/account/orders/details/${order.id}` : null
  const topWordmarkUrl = toAbsoluteUrl(process.env.SENDGRID_BRAND_TOP_WORDMARK_URL)
  const footerLogoUrl = toAbsoluteUrl(process.env.SENDGRID_BRAND_FOOTER_LOGO_URL)
  const currencyCode = toCurrencyCode(order.currency_code || null)

  const nowIso = new Date().toISOString()
  const totalAmount = asNumber(order.total)

  return {
    order: {
      id: order.id,
      display_id: order.display_id ?? null,
      created_at: asIso(order.created_at),
      status: order.status || null,
      payment_status: order.payment_status || null,
      fulfillment_status: order.fulfillment_status || null,
      currency_code: order.currency_code || null,
      totals: {
        total: totalAmount,
        total_display: formatCurrency(totalAmount, currencyCode),
        subtotal: asNumber(order.subtotal),
        subtotal_display: formatCurrency(asNumber(order.subtotal), currencyCode),
        tax_total: asNumber(order.tax_total),
        tax_total_display: formatCurrency(asNumber(order.tax_total), currencyCode),
        shipping_total: asNumber(order.shipping_total),
        shipping_total_display: formatCurrency(
          asNumber(order.shipping_total),
          currencyCode
        ),
        discount_total: asNumber(order.discount_total),
        discount_total_display: formatCurrency(
          asNumber(order.discount_total),
          currencyCode
        ),
      },
      items: (order.items || []).map((item) => ({
        id: item.id,
        title: item.title || "Item",
        quantity: asNumber(item.quantity) ?? 0,
        unit_price: asNumber(item.unit_price),
        unit_price_display: formatCurrency(asNumber(item.unit_price), currencyCode),
        thumbnail: item.thumbnail || null,
      })),
    },
    customer: {
      first_name: order.customer?.first_name || "",
      last_name: order.customer?.last_name || "",
      email: order.email || order.customer?.email || "",
    },
    shipping: {
      carrier: null,
      tracking: null,
      method: null,
      status: order.fulfillment_status || null,
      eta: null,
    },
    refund: {
      amount:
        toStatus(order.payment_status) === "refunded"
          ? totalAmount
          : null,
      amount_display:
        toStatus(order.payment_status) === "refunded"
          ? formatCurrency(totalAmount, currencyCode)
          : null,
      reason: null,
      timestamp: type === "refund_status" ? nowIso : null,
    },
    links: {
      order_url: orderUrl,
      support_url: supportUrl,
      website_url: websiteUrl,
    },
    brand: {
      top_wordmark_url: topWordmarkUrl,
      footer_logo_url: footerLogoUrl,
      website_url: websiteUrl,
    },
  }
}

const buildNotificationPlan = (
  order: OrderRecord,
  trigger: TransactionalEmailTrigger,
  nowIso: string
): NotificationPlan | null => {
  const metadata = order.metadata || {}

  if (trigger === "order_confirmation") {
    if (metadata[ORDER_CONFIRMATION_SENT_AT]) {
      return null
    }

    const template = (process.env.SENDGRID_TEMPLATE_ORDER_CONFIRMATION || "").trim()
    if (!template) {
      return null
    }

    return {
      type: trigger,
      template,
      metadata_patch: {
        [ORDER_CONFIRMATION_SENT_AT]: nowIso,
      },
      data: buildTemplateData(order, trigger),
    }
  }

  if (trigger === "shipping_status") {
    const fulfillmentStatus = toStatus(order.fulfillment_status)
    if (!SHIPPING_ACTIVE_STATUSES.has(fulfillmentStatus)) {
      return null
    }

    const hasShippingConfirmation = Boolean(metadata[SHIPPING_CONFIRMATION_SENT_AT])
    const lastFulfillmentStatus = toStatus(metadata[LAST_NOTIFIED_FULFILLMENT_STATUS])

    if (!hasShippingConfirmation) {
      const template = (process.env.SENDGRID_TEMPLATE_SHIPPING_CONFIRMATION || "").trim()
      if (!template) {
        return null
      }

      return {
        type: trigger,
        template,
        metadata_patch: {
          [SHIPPING_CONFIRMATION_SENT_AT]: nowIso,
          [LAST_NOTIFIED_FULFILLMENT_STATUS]: fulfillmentStatus,
        },
        data: buildTemplateData(order, trigger),
      }
    }

    if (lastFulfillmentStatus === fulfillmentStatus) {
      return null
    }

    const template = (process.env.SENDGRID_TEMPLATE_SHIPPING_UPDATE || "").trim()
    if (!template) {
      return null
    }

    return {
      type: trigger,
      template,
      metadata_patch: {
        [SHIPPING_UPDATE_SENT_AT]: nowIso,
        [LAST_NOTIFIED_FULFILLMENT_STATUS]: fulfillmentStatus,
      },
      data: buildTemplateData(order, trigger),
    }
  }

  if (trigger === "refund_status") {
    const paymentStatus = toStatus(order.payment_status)
    if (!REFUNDED_STATUSES.has(paymentStatus)) {
      return null
    }

    const lastPaymentStatus = toStatus(metadata[LAST_NOTIFIED_PAYMENT_STATUS])
    if (lastPaymentStatus === paymentStatus) {
      return null
    }

    const template = (process.env.SENDGRID_TEMPLATE_REFUND_CONFIRMATION || "").trim()
    if (!template) {
      return null
    }

    return {
      type: trigger,
      template,
      metadata_patch: {
        [REFUND_CONFIRMATION_SENT_AT]: nowIso,
        [LAST_NOTIFIED_PAYMENT_STATUS]: paymentStatus,
      },
      data: buildTemplateData(order, trigger),
    }
  }

  const isCanceled =
    toStatus(order.status) === "canceled" ||
    toStatus(order.status) === "cancelled" ||
    Boolean(order.canceled_at)

  if (!isCanceled || metadata[CANCELLATION_CONFIRMATION_SENT_AT]) {
    return null
  }

  const template = (process.env.SENDGRID_TEMPLATE_CANCELLATION_CONFIRMATION || "").trim()
  if (!template) {
    return null
  }

  return {
    type: trigger,
    template,
    metadata_patch: {
      [CANCELLATION_CONFIRMATION_SENT_AT]: nowIso,
    },
    data: buildTemplateData(order, trigger),
  }
}

export const processOrderTransactionalEmailStep = createStep(
  "transactional-emails-process-order",
  async (
    input: ProcessOrderTransactionalEmailStepInput,
    { container }
  ): Promise<StepResponse<ProcessOrderTransactionalEmailStepOutput>> => {
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER) as Logger
    const query = container.resolve("query") as {
      graph: (
        input: Record<string, unknown>,
        options?: Record<string, unknown>
      ) => Promise<{ data: unknown[] }>
    }

    const { data: orders } = await query.graph(
      {
        entity: "order",
        fields: [
          "id",
          "display_id",
          "email",
          "created_at",
          "status",
          "payment_status",
          "fulfillment_status",
          "canceled_at",
          "currency_code",
          "total",
          "subtotal",
          "tax_total",
          "shipping_total",
          "discount_total",
          "metadata",
          "customer.id",
          "customer.first_name",
          "customer.last_name",
          "customer.email",
          "items.id",
          "items.title",
          "items.quantity",
          "items.unit_price",
          "items.thumbnail",
        ],
        filters: {
          id: input.order_id,
        },
      },
      {
        throwIfKeyNotFound: true,
      }
    )

    const order = (orders?.[0] || null) as OrderRecord | null

    if (!order) {
      return new StepResponse({
        sent: false,
        skipped_reason: "order_not_found",
        trigger: input.trigger,
        order_id: input.order_id,
        template: null,
      })
    }

    const email = order.email || order.customer?.email || null
    if (!email) {
      logger.warn(
        `[transactional-email] Skipping ${input.trigger} for order ${order.id}: missing email.`
      )
      return new StepResponse({
        sent: false,
        skipped_reason: "missing_email",
        trigger: input.trigger,
        order_id: order.id,
        template: null,
      })
    }

    const nowIso = new Date().toISOString()
    const plan = buildNotificationPlan(order, input.trigger, nowIso)

    if (!plan) {
      return new StepResponse({
        sent: false,
        skipped_reason: "not_eligible_or_template_missing",
        trigger: input.trigger,
        order_id: order.id,
        template: null,
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
        `[transactional-email] Notification provider unavailable for ${plan.type} on order ${order.id}: ${message}`
      )
      return new StepResponse({
        sent: false,
        skipped_reason: "notification_provider_unavailable",
        trigger: input.trigger,
        order_id: order.id,
        template: null,
      })
    }

    try {
      await notificationModule.createNotifications([
        {
          to: email,
          channel: "email",
          template: plan.template,
          data: plan.data,
        },
      ])
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown notification error"
      logger.warn(
        `[transactional-email] Failed ${plan.type} send for order ${order.id}: ${message}`
      )
      return new StepResponse({
        sent: false,
        skipped_reason: "notification_send_failed",
        trigger: input.trigger,
        order_id: order.id,
        template: null,
      })
    }

    const orderService = container.resolve("order") as OrderService
    await orderService.updateOrders(order.id, {
      metadata: {
        ...(order.metadata || {}),
        ...plan.metadata_patch,
      },
    })

    return new StepResponse({
      sent: true,
      skipped_reason: null,
      trigger: input.trigger,
      order_id: order.id,
      template: plan.template,
    })
  }
)
