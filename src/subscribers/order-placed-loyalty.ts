import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { handleOrderPointsWorkflow } from "../workflows/loyalty"

export default async function orderPlacedLoyaltyHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER) as {
    info: (message: string) => void
    warn: (message: string) => void
  }

  // Gate on TH sales channel — SS guests don't have accounts for loyalty
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
        logger.info(`[order-placed-loyalty] Skipping order ${data.id} — not TH sales channel`)
        return
      }
    } catch {
      // If lookup fails, proceed with workflow (fail-open for TH)
    }
  }

  try {
    await handleOrderPointsWorkflow(container).run({
      input: {
        order_id: data.id,
      },
    })
  } catch (error) {
    console.error(
      `[order-placed-loyalty] Failed for order_id=${data.id}:`,
      error
    )
    return
  }
}

export const config: SubscriberConfig = {
  event: "order.placed",
}
