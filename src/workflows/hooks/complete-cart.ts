import { completeCartWorkflow } from "@medusajs/medusa/core-flows"
import { MedusaError, ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { CartData, getCartLoyaltyPromotion } from "../../utils/promo"
import LoyaltyModuleService from "../../modules/loyalty/service"
import { LOYALTY_MODULE } from "../../modules/loyalty"
import { ssSendGridSend, getSsSalesChannelId } from "../../utils/ss-sendgrid"

completeCartWorkflow.hooks.validate(async ({ cart }, { container }) => {
  const query = container.resolve("query") as {
    graph: (
      data: Record<string, unknown>,
      config: Record<string, unknown>
    ) => Promise<{ data: Array<Record<string, any>> }>
  }

  const loyaltyModuleService: LoyaltyModuleService = container.resolve(LOYALTY_MODULE)

  const { data: carts } = await query.graph(
    {
      entity: "cart",
      fields: [
        "id",
        "promotions.*",
        "promotions.rules.*",
        "promotions.rules.values.*",
        "promotions.application_method.*",
        "customer.*",
        "metadata",
      ],
      filters: {
        id: cart.id,
      },
    },
    {
      throwIfKeyNotFound: true,
    }
  )

  const loyaltyPromo = getCartLoyaltyPromotion(carts[0] as CartData)

  if (!loyaltyPromo) {
    return
  }

  if (!carts[0].customer?.id) {
    throw new MedusaError(MedusaError.Types.INVALID_DATA, "Customer not found")
  }

  const customerLoyaltyPoints = await loyaltyModuleService.getPoints(
    carts[0].customer.id
  )

  const requiredPoints = await loyaltyModuleService.calculateRedeemPointsFromAmount(
    Number(loyaltyPromo.application_method?.value || 0)
  )

  if (customerLoyaltyPoints < requiredPoints) {
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      `Insufficient loyalty points. Required: ${requiredPoints}, Available: ${customerLoyaltyPoints}`
    )
  }
})

/**
 * Order confirmation email — fires on the server process, bypasses event bus.
 *
 * The event-bus path (order.placed subscriber) uses grouped events that are
 * staged in Redis and released after the workflow commits. If the worker
 * doesn't pick them up (Redis config, timing, etc.), no email is sent.
 * This hook runs synchronously on the server — no event bus dependency.
 */
// @ts-expect-error — orderCreated hook exists at runtime (complete-cart.js:522) but missing from 2.13.0 types
completeCartWorkflow.hooks.orderCreated(
  async ({ order_id }: { order_id: string }, { container }: { container: { resolve: (key: string) => unknown } }) => {
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER) as {
      info: (msg: string) => void
      warn: (msg: string) => void
    }

    const ssChannelId = getSsSalesChannelId()
    if (!ssChannelId) return

    const templateId = (
      process.env.SS_SENDGRID_TEMPLATE_ORDER_CONFIRMATION || ""
    ).trim()
    if (!templateId) return

    // Fire async — don't block the checkout response
    void (async () => {
      try {
        const query = container.resolve("query") as {
          graph: (
            input: Record<string, unknown>
          ) => Promise<{ data: unknown[] }>
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
            "total",
            "subtotal",
            "tax_total",
            "shipping_total",
            "discount_total",
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
            "items.thumbnail",
          ],
          filters: { id: order_id },
        })

        const order = orders?.[0] as Record<string, unknown> | undefined
        if (!order) return

        if (order.sales_channel_id !== ssChannelId) return
        if (
          (order.metadata as Record<string, unknown> | null)
            ?.ss_order_confirmation_sent_at
        )
          return

        const email =
          (order.email as string) ||
          (order.customer as Record<string, unknown> | null)?.email
        if (!email) return

        const cc = order.currency_code as string | undefined
        const fmt = (amount: unknown): string | null => {
          if (typeof amount !== "number" || !Number.isFinite(amount))
            return null
          try {
            return new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: (cc || "USD").toUpperCase(),
              minimumFractionDigits: 2,
            }).format(amount)
          } catch {
            return `$${(amount as number).toFixed(2)}`
          }
        }

        const storefrontUrl = (process.env.SS_STOREFRONT_URL || "")
          .trim()
          .replace(/\/+$/, "")
        const items = (order.items as Array<Record<string, unknown>>) || []
        const shipping = order.shipping_address as Record<
          string,
          unknown
        > | null

        const result = await ssSendGridSend({
          to: email as string,
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
                total_display: fmt(order.total),
                subtotal: order.subtotal,
                subtotal_display: fmt(order.subtotal),
                tax_total: order.tax_total,
                tax_total_display: fmt(order.tax_total),
                shipping_total: order.shipping_total,
                shipping_total_display: fmt(order.shipping_total),
                discount_total: order.discount_total,
                discount_total_display: fmt(order.discount_total),
              },
              items: items.map((item) => ({
                id: item.id,
                title: item.title || "Item",
                quantity: item.quantity ?? 0,
                unit_price: item.unit_price,
                unit_price_display: fmt(item.unit_price),
                thumbnail: item.thumbnail || null,
              })),
            },
            customer: {
              first_name:
                (order.customer as Record<string, unknown> | null)
                  ?.first_name ||
                shipping?.first_name ||
                "",
              last_name:
                (order.customer as Record<string, unknown> | null)
                  ?.last_name ||
                shipping?.last_name ||
                "",
              email,
            },
            shipping_address: shipping
              ? {
                  address_1: shipping.address_1 || "",
                  address_2: shipping.address_2 || "",
                  city: shipping.city || "",
                  province: shipping.province || "",
                  postal_code: shipping.postal_code || "",
                  country_code: shipping.country_code || "",
                }
              : null,
            links: {
              order_url: storefrontUrl
                ? `${storefrontUrl}/account/orders/details/${order.id}`
                : null,
              website_url: storefrontUrl || null,
            },
          },
        })

        if (result.success) {
          logger.info(
            `[ss-order-hook] Order confirmation sent for ${order_id}`
          )
        } else {
          logger.warn(
            `[ss-order-hook] SendGrid failed for ${order_id}: ${result.error}`
          )
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Unknown error"
        logger.warn(`[ss-order-hook] Failed for ${order_id}: ${msg}`)
      }
    })()
  }
)
