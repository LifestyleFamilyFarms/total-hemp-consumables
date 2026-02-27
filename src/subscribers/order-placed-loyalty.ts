import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { handleOrderPointsWorkflow } from "../workflows/loyalty"

export default async function orderPlacedLoyaltyHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  await handleOrderPointsWorkflow(container).run({
    input: {
      order_id: data.id,
    },
  })
}

export const config: SubscriberConfig = {
  event: "order.placed",
}
