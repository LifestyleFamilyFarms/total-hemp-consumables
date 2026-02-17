import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { propagateOrderSalesPersonMetadataWorkflow } from "../workflows/sales-people"

export default async function orderCreatedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  await propagateOrderSalesPersonMetadataWorkflow(container).run({
    input: {
      order_id: data.id,
    },
  })
}

export const config: SubscriberConfig = {
  event: "order.created",
}
