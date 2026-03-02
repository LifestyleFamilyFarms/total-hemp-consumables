import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { PRODUCT_REVIEW_MODULE } from "../../../modules/product-review"

type CreateReviewStepInput = {
  product_id: string
  customer_id: string
  rating: number
  title?: string | null
  content: string
}

type ReviewRecord = {
  id: string
  product_id: string
  customer_id: string
  rating: number
  title: string | null
  content: string
  status: "pending" | "approved" | "rejected"
}

type ProductReviewModuleService = {
  createReviews: (data: Record<string, unknown>) => Promise<ReviewRecord>
  deleteReviews: (id: string | string[]) => Promise<void>
}

export const createReviewStep = createStep(
  "reviews.create-review",
  async (input: CreateReviewStepInput, { container }) => {
    const reviewService = container.resolve(
      PRODUCT_REVIEW_MODULE
    ) as ProductReviewModuleService

    const review = await reviewService.createReviews({
      product_id: input.product_id,
      customer_id: input.customer_id,
      rating: input.rating,
      title: input.title ?? null,
      content: input.content,
      status: "pending",
    })

    return new StepResponse(review, review.id)
  },
  async (reviewId, { container }) => {
    if (!reviewId) {
      return
    }

    const reviewService = container.resolve(
      PRODUCT_REVIEW_MODULE
    ) as ProductReviewModuleService

    await reviewService.deleteReviews(reviewId)
  }
)
