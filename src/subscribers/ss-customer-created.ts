import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { ssSendGridSend, getSsSalesChannelId } from "../utils/ss-sendgrid"

/**
 * Sober Sativas — Welcome email on customer creation.
 *
 * Sales channel gating for customers is trickier than orders: a customer
 * entity doesn't have a sales_channel_id. We use two signals:
 *
 * 1. customer.metadata.source_storefront === "sober-sativas"
 *    (set by the SS storefront during registration)
 * 2. Fallback: check if the customer's most recent cart belongs to the SS
 *    sales channel.
 *
 * If neither signal matches, the email is skipped.
 */

type CustomerRecord = {
  id: string
  email?: string | null
  first_name?: string | null
  last_name?: string | null
  metadata?: Record<string, unknown> | null
}

export default async function ssCustomerCreatedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER) as {
    info: (msg: string) => void
    warn: (msg: string) => void
  }

  const ssChannelId = getSsSalesChannelId()
  if (!ssChannelId) return

  const templateId = (process.env.SS_SENDGRID_TEMPLATE_WELCOME || "").trim()
  if (!templateId) return

  try {
    const query = container.resolve("query") as {
      graph: (input: Record<string, unknown>) => Promise<{ data: unknown[] }>
    }

    const { data: customers } = await query.graph({
      entity: "customer",
      fields: ["id", "email", "first_name", "last_name", "metadata"],
      filters: { id: data.id },
    })

    const customer = (customers?.[0] || null) as CustomerRecord | null
    if (!customer?.email) return

    // Idempotency
    if (customer.metadata?.ss_welcome_sent_at) return

    // Signal 1: explicit storefront source in metadata
    const isFromSs = customer.metadata?.source_storefront === "sober-sativas"

    // Signal 2: check if there's a cart in the SS sales channel
    let hasSsCart = false
    if (!isFromSs) {
      try {
        const { data: carts } = await query.graph({
          entity: "cart",
          fields: ["id", "sales_channel_id"],
          filters: {
            customer_id: customer.id,
            sales_channel_id: ssChannelId,
          },
          pagination: { take: 1 },
        })
        hasSsCart = Array.isArray(carts) && carts.length > 0
      } catch {
        // Cart lookup failed — fall through
      }
    }

    if (!isFromSs && !hasSsCart) return

    const storefrontUrl = (process.env.SS_STOREFRONT_URL || "").trim().replace(/\/+$/, "")

    const result = await ssSendGridSend({
      to: customer.email,
      templateId,
      dynamicTemplateData: {
        customer: {
          first_name: customer.first_name || "",
          last_name: customer.last_name || "",
          email: customer.email,
        },
        links: {
          website_url: storefrontUrl || null,
          shop_url: storefrontUrl ? `${storefrontUrl}/store` : null,
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
        `[ss-customer-created] SendGrid send failed for customer ${customer.id}: ${result.error}`
      )
      return
    }

    // Mark as sent (idempotency)
    try {
      const customerService = container.resolve("customer") as {
        updateCustomers: (id: string, data: Record<string, unknown>) => Promise<unknown>
      }
      await customerService.updateCustomers(customer.id, {
        metadata: {
          ...(customer.metadata || {}),
          ss_welcome_sent_at: new Date().toISOString(),
        },
      })
    } catch {
      logger.warn(
        `[ss-customer-created] Email sent but metadata update failed for customer ${customer.id}`
      )
    }

    logger.info(`[ss-customer-created] Welcome email sent for customer ${customer.id}`)
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error"
    logger.warn(`[ss-customer-created] Failed for customer ${data.id}: ${msg}`)
  }
}

export const config: SubscriberConfig = {
  event: "customer.created",
}
