import { createWorkflow, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { createReviewStep } from "./steps/create-review"
import { ensureProductExistsStep } from "./steps/ensure-product-exists"

export type CreateReviewWorkflowInput = {
  product_id: string
  customer_id: string
  rating: number
  title?: string | null
  content: string
}

const createReviewWorkflow = createWorkflow(
  "reviews-create-review-workflow",
  function (input: CreateReviewWorkflowInput) {
    const { product_id } = ensureProductExistsStep({
      product_id: input.product_id,
    })

    const review = createReviewStep({
      product_id,
      customer_id: input.customer_id,
      rating: input.rating,
      title: input.title,
      content: input.content,
    })

    return new WorkflowResponse({ review })
  }
)

export default createReviewWorkflow
