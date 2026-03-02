import { createWorkflow, transform, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { useQueryGraphStep } from "@medusajs/medusa/core-flows"
import { createReviewStep } from "./steps/create-review"

export type CreateReviewWorkflowInput = {
  product_id: string
  customer_id: string
  rating: number
  title?: string | null
  content: string
}

const createReviewWorkflow = createWorkflow(
  "reviews.create-review-workflow",
  function (input: CreateReviewWorkflowInput) {
    const { data: products } = useQueryGraphStep({
      entity: "product",
      fields: ["id"],
      filters: {
        id: input.product_id,
      },
      options: {
        throwIfKeyNotFound: true,
      },
    })

    const productId = transform({ products }, (data) => data.products[0].id)

    const review = createReviewStep({
      product_id: productId,
      customer_id: input.customer_id,
      rating: input.rating,
      title: input.title,
      content: input.content,
    })

    return new WorkflowResponse({ review })
  }
)

export default createReviewWorkflow
