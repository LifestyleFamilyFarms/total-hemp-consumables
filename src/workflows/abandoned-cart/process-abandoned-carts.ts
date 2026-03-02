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
  "abandoned-cart.process",
  function (input: ProcessAbandonedCartsWorkflowInput) {
    const found = findAbandonedCartsStep({
      lookback_hours: input.lookback_hours,
      limit: input.limit,
    })

    when({ input, found }, (data) => {
      return !Boolean(data.input.dry_run) && data.found.carts.length > 0
    }).then(() => {
      sendAbandonedNotificationsStep({
        carts: found.carts,
      })

      const updates = transform({ found }, (data) => {
        const notifiedAt = new Date().toISOString()

        return data.found.carts.map((cart) => ({
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
    const processedCount = transform({ input, found }, (data) =>
      Boolean(data.input.dry_run) ? 0 : data.found.carts.length
    )

    return new WorkflowResponse({
      candidates: found.carts,
      candidate_count: found.carts.length,
      processed_count: processedCount,
      dry_run: Boolean(input.dry_run),
      cart_ids: cartIds,
    })
  }
)

export default processAbandonedCartsWorkflow
