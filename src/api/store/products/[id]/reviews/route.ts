import {
  AuthenticatedMedusaRequest,
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { createReviewWorkflow } from "../../../../../workflows/reviews"
import type {
  CreateProductReviewBody,
  ListProductReviewsQuery,
} from "./middlewares"

type ReviewListRecord = {
  id: string
  product_id: string
  customer_id: string
  rating: number
  title: string | null
  content: string
  status: string
  created_at: string
}

type SortDirection = "ASC" | "DESC"

const resolveReviewOrder = (order: string | undefined): SortDirection => {
  if (!order) {
    return "DESC"
  }

  const normalized = order.trim().toLowerCase()

  if (normalized === "-created_at" || normalized === "created_at:desc") {
    return "DESC"
  }

  if (
    normalized === "created_at" ||
    normalized === "+created_at" ||
    normalized === "created_at:asc"
  ) {
    return "ASC"
  }

  return "DESC"
}

export async function GET(
  req: MedusaRequest<ListProductReviewsQuery>,
  res: MedusaResponse
) {
  const { id: productId } = req.params as { id: string }
  const { limit, offset, order } = req.validatedQuery
  const sortDirection = resolveReviewOrder(order)

  const query = req.scope.resolve("query") as {
    graph: (input: Record<string, unknown>) => Promise<{
      data: ReviewListRecord[]
      metadata?: { count?: number }
    }>
  }

  const { data: reviews, metadata } = await query.graph({
    entity: "review",
    fields: [
      "id",
      "product_id",
      "customer_id",
      "rating",
      "title",
      "content",
      "status",
      "created_at",
    ],
    filters: {
      product_id: productId,
      status: "approved",
    },
    pagination: {
      take: limit,
      skip: offset,
    },
    order: {
      created_at: sortDirection,
    },
  })

  return res.status(200).json({
    reviews,
    count: metadata?.count ?? reviews.length,
    limit,
    offset,
  })
}

export async function POST(
  req: AuthenticatedMedusaRequest<CreateProductReviewBody>,
  res: MedusaResponse
) {
  const { id: productId } = req.params as { id: string }

  const { result } = await createReviewWorkflow(req.scope).run({
    input: {
      product_id: productId,
      customer_id: req.auth_context.actor_id,
      rating: req.validatedBody.rating,
      title: req.validatedBody.title,
      content: req.validatedBody.content,
    },
  })

  return res.status(200).json(result)
}
