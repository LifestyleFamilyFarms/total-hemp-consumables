import {
  createWorkflow,
  transform,
  when,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import { updateCartsStep } from "@medusajs/medusa/core-flows"
import { findAbandonedCartsStep } from "./steps/find-abandoned-carts"
import { sendAbandonedNotificationsStep } from "./steps/send-abandoned-notifications"

export type ProcessAbandonedCartsWorkflowInput = {
  lookback_hours?: number
  limit?: number
  dry_run?: boolean
}

const processAbandonedCartsWorkflow = createWorkflow(
  "abandoned-cart-process",
  function (input: ProcessAbandonedCartsWorkflowInput) {
    const found = findAbandonedCartsStep({
      lookback_hours: input.lookback_hours,
      limit: input.limit,
    })

    const notifications = sendAbandonedNotificationsStep({
      carts: found.carts,
      dry_run: input.dry_run,
    })

    when({ notifications }, (data) => {
      return data.notifications.processed_cart_ids.length > 0
    }).then(() => {
      const updates = transform({ found, notifications }, (data) => {
        const notifiedAt = new Date().toISOString()
        const processedCartIds = new Set(data.notifications.processed_cart_ids)

        return data.found.carts
          .filter((cart) => processedCartIds.has(cart.id))
          .map((cart) => ({
            id: cart.id,
            metadata: {
              ...(cart.metadata || {}),
              abandoned_notification_at: notifiedAt,
            },
          }))
      })

      updateCartsStep(updates)
    })

    const cartIds = transform({ found }, (data) => data.found.carts.map((cart) => cart.id))
    const notifiedCartIds = transform(
      { notifications },
      (data) => data.notifications.processed_cart_ids
    )
    const candidateCount = transform({ found }, (data) => data.found.carts.length)
    const processedCount = transform({ input, found }, (data) => {
      if (data.input.dry_run) {
        return 0
      }

      return data.found.carts.length
    })
    const notificationSentCount = transform(
      { notifications },
      (data) => data.notifications.processed_cart_ids.length
    )
    const dryRun = transform({ input }, (data) => Boolean(data.input.dry_run))

    return new WorkflowResponse({
      candidates: found.carts,
      candidate_count: candidateCount,
      processed_count: processedCount,
      notification_sent_count: notificationSentCount,
      dry_run: dryRun,
      cart_ids: cartIds,
      notification_sent_cart_ids: notifiedCartIds,
    })
  }
)

export default processAbandonedCartsWorkflow
