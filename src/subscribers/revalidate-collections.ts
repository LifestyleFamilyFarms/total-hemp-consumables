import { createRevalidateSubscriber } from "./revalidate-factory"

export const { handler, config } = createRevalidateSubscriber({
    tags: ["collections"],
    events: [
        "product-collection.updated",
        "product-collection.created",
        "product-collection.deleted",
    ],
})