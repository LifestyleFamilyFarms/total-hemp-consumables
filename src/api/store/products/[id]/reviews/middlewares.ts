import {
  authenticate,
  MiddlewareRoute,
  validateAndTransformBody,
  validateAndTransformQuery,
} from "@medusajs/framework/http"
import { z } from "@medusajs/framework/zod"

export const CreateProductReviewBodySchema = z.object({
  rating: z.number().min(1).max(5),
  title: z.string().max(120).optional().nullable(),
  content: z.string().min(3).max(5000),
})

export const ListProductReviewsQuerySchema = z.object({
  limit: z.preprocess(
    (value) => (typeof value === "string" ? Number.parseInt(value, 10) : value),
    z.number().int().min(1).max(100).default(20)
  ),
  offset: z.preprocess(
    (value) => (typeof value === "string" ? Number.parseInt(value, 10) : value),
    z.number().int().min(0).default(0)
  ),
  order: z.string().trim().min(1).max(40).optional(),
})

export type CreateProductReviewBody = z.infer<typeof CreateProductReviewBodySchema>
export type ListProductReviewsQuery = z.infer<typeof ListProductReviewsQuerySchema>

const customerAuth = authenticate("customer", ["session", "bearer"])

export const storeProductReviewsMiddlewares: MiddlewareRoute[] = [
  {
    matcher: "/store/products/:id/reviews",
    method: "GET",
    middlewares: [validateAndTransformQuery(ListProductReviewsQuerySchema, {})],
  },
  {
    matcher: "/store/products/:id/reviews",
    method: "POST",
    middlewares: [customerAuth, validateAndTransformBody(CreateProductReviewBodySchema)],
  },
]
