import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { sendOrderTransactionalEmailWorkflow } from "../workflows/transactional-emails"

export default async function orderPlacedTransactionalEmailHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER) as {
    warn: (message: string) => void
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
