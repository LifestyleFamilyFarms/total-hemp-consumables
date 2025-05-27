import { createRevalidateSubscriber } from "./revalidate-factory"

export const { handler, config } = createRevalidateSubscriber({
    tags: ["tags"],
    events: [
        "product-tag.created",
        "product-tag.updated",
        "product-tag.deleted",
    ],
})  