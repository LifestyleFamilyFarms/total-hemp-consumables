import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { sendOrderTransactionalEmailWorkflow } from "../workflows/transactional-emails"

export default async function orderPlacedTransactionalEmailHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER) as {
    info: (message: string) => void
    warn: (message: string) => void
  }

  // Gate on TH sales channel — SS has its own order subscriber
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
        logger.info(`[transactional-email] Skipping order ${data.id} — not TH sales channel`)
        return
      }
    } catch {
      // If lookup fails, proceed with send (fail-open for TH)
    }
  }

  try {
    await sendOrderTransactionalEmailWorkflow(container).run({
      input: {
        order_id: data.id,
        trigger: "order_confirmation",
      },
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown workflow error"
    logger.warn(
      `[transactional-email] order.placed notification workflow failed for order ${data.id}: ${message}`
    )
  }
}

export const config: SubscriberConfig = {
  event: "order.placed",
}
