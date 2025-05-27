import { createRevalidateSubscriber } from "./revalidate-factory"

export const { handler, config } = createRevalidateSubscriber({
    tags: ["orders"],
    events: [
        "order.placed",
        "order.updated",
        "order.canceled",
        "order.completed",
        "order.archived",
        "order.fulfillment_created",
        "order.fulfillment_canceled",
        "order.return_requested",
        "order.return_received",
        "order.claim_created",
        "order.exchange_created",
        "order.transfer_requested", 
    ]
})