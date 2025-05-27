import { createRevalidateSubscriber } from "./revalidate-factory"

export const { handler, config } = createRevalidateSubscriber({
    tags: ["account"],
    events: [
        "customer.created",
        "customer.updated",
        "customer.deleted",
    ],
})