import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { handleOrderPointsWorkflow } from "../workflows/loyalty"

export default async function orderPlacedLoyaltyHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
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
