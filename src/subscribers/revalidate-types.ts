import { createRevalidateSubscriber } from "../utils/revalidate-factory"

const { handler, config } = createRevalidateSubscriber({
  tags: ["types"],
  events: [
    "product-type.created",
    "product-type.updated",
    "product-type.deleted",
  ],
})

export default handler
export { config }
