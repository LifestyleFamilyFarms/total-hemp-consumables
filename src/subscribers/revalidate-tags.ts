import { createRevalidateSubscriber } from "../utils/revalidate-factory"

const { handler, config } = createRevalidateSubscriber({
  tags: ["tags"],
  events: [
    "product-tag.created",
    "product-tag.updated",
    "product-tag.deleted",
  ],
})

export default handler
export { config }
