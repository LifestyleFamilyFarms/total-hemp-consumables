import { createRevalidateSubscriber } from "../utils/revalidate-factory"

const { handler, config } = createRevalidateSubscriber({
  tags: ["categories"],
  events: [
    "product-category.updated",
    "product-category.created",
    "product-category.deleted",
  ],
})

export default handler
export { config }
