import { createRevalidateSubscriber } from "./revalidate-factory"

export const { handler, config } = createRevalidateSubscriber({
    tags: ["cart"],
    events: [
        "cart.created",
        "cart.updated",
        "cart.deleted",
        "cart.region_updated",
        "cart.customer_transferred",
    ],
})