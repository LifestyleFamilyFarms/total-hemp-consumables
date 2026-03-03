import { MedusaError } from "@medusajs/framework/utils"
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
  createReviews: (
    data: Record<string, unknown> | Array<Record<string, unknown>>
  ) => Promise<ReviewRecord | ReviewRecord[]>
  deleteReviews: (id: string | string[]) => Promise<void>
}

type CreateReviewCompensationInput = {
  review_id: string | null
}

export const createReviewStep = createStep(
  "reviews-create-review",
  async (input: CreateReviewStepInput, { container }) => {
    const reviewService = container.resolve(
      PRODUCT_REVIEW_MODULE
    ) as ProductReviewModuleService

    const created = await reviewService.createReviews({
      product_id: input.product_id,
      customer_id: input.customer_id,
      rating: input.rating,
      title: input.title ?? null,
      content: input.content,
      status: "pending",
    })

    const review = Array.isArray(created) ? created[0] : created

    if (!review?.id) {
      throw new MedusaError(
        MedusaError.Types.UNEXPECTED_STATE,
        "Failed to create review"
      )
    }

    return new StepResponse<ReviewRecord, CreateReviewCompensationInput>(review, {
      review_id: review.id,
    })
  },
  async (compensationInput, { container }) => {
    if (!compensationInput?.review_id) {
      return
    }

    const reviewService = container.resolve(
      PRODUCT_REVIEW_MODULE
    ) as ProductReviewModuleService

    await reviewService.deleteReviews(compensationInput.review_id)
  }
)
