import { createRevalidateSubscriber } from "./revalidate-factory"

export const { handler, config } = createRevalidateSubscriber({
    tags: ["products"],
    events: [
        "product.updated", 
        "product.created", 
        "product.deleted",
        "product.variant.updated",
        "product.variant.created",
        "product.variant.deleted",
    ],
})