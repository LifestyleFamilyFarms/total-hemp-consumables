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
    warn: (message: string) => void
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
