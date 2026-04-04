import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { sendOrderTransactionalEmailWorkflow } from "../workflows/transactional-emails"

const ORDER_UPDATED_TRIGGERS = [
  "shipping_status",
  "refund_status",
  "cancellation_status",
] as const

export default async function orderUpdatedTransactionalEmailHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER) as {
    info: (message: string) => void
    warn: (message: string) => void
  }

  // Gate on TH sales channel — SS has its own subscribers
  const thChannelId = (process.env.TH_SALES_CHANNEL_ID || "").trim()
  if (thChannelId) {
    try {
      const query = container.resolve("query") as {
        graph: (input: Record<string, unknown>) => Promise<{ data: unknown[] }>
      }
      const { data: orders } = await query.graph({
        entity: "order",
        fields: ["id", "sales_channel_id"],
        filters: { id: data.id },
      })
      const order = orders?.[0] as { sales_channel_id?: string } | undefined
      if (order?.sales_channel_id && order.sales_channel_id !== thChannelId) {
        logger.info(`[transactional-email] Skipping order.updated ${data.id} — not TH sales channel`)
        return
      }
    } catch {
      // Fail-open for TH
    }
  }

  for (const trigger of ORDER_UPDATED_TRIGGERS) {
    try {
      await sendOrderTransactionalEmailWorkflow(container).run({
        input: {
          order_id: data.id,
          trigger,
        },
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown workflow error"
      logger.warn(
        `[transactional-email] order.updated notification workflow failed for trigger ${trigger} on order ${data.id}: ${message}`
      )
    }
  }
}

export const config: SubscriberConfig = {
  event: "order.updated",
}
