import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { propagateOrderSalesPersonMetadataWorkflow } from "../workflows/sales-people"

export default async function orderCreatedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  try {
    await propagateOrderSalesPersonMetadataWorkflow(container).run({
      input: {
        order_id: data.id,
      },
    })
  } catch (error) {
    console.error(
      `[order-created] Failed for order_id=${data.id}:`,
      error
    )
    return
  }
}

export const config: SubscriberConfig = {
  event: "order.created",
}
