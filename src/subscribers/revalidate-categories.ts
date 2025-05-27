import { createRevalidateSubscriber } from "./revalidate-factory"

export const { handler, config } = createRevalidateSubscriber({
    tags: ["categories"],
    events: [
        "product-category.updated",
        "product-category.created",
        "product-category.deleted",
    ],
})