import { createRevalidateSubscriber } from "./revalidate-factory"

export const { handler, config } = createRevalidateSubscriber({
  tags: ["types"],
  events: [
    "product-type.created",
    "product-type.updated",
    "product-type.deleted",
  ],
})