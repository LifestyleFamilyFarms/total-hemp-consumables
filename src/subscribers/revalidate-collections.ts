import { createRevalidateSubscriber } from "../utils/revalidate-factory"

const { handler, config } = createRevalidateSubscriber({
  tags: ["collections"],
  events: [
    "product-collection.updated",
    "product-collection.created",
    "product-collection.deleted",
  ],
})

export default handler
export { config }
