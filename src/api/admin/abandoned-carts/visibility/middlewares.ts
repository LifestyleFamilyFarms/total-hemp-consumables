import {
  MiddlewareRoute,
  validateAndTransformQuery,
} from "@medusajs/framework/http"
import { z } from "@medusajs/framework/zod"

export const AbandonedCartVisibilityQuerySchema = z.object({
  limit: z.preprocess(
    (value) => (typeof value === "string" ? Number.parseInt(value, 10) : value),
    z.number().int().min(1).max(200).default(50)
  ),
  offset: z.preprocess(
    (value) => (typeof value === "string" ? Number.parseInt(value, 10) : value),
    z.number().int().min(0).default(0)
  ),
})

export type AbandonedCartVisibilityQuery = z.infer<
  typeof AbandonedCartVisibilityQuerySchema
>

export const adminAbandonedCartsVisibilityMiddlewares: MiddlewareRoute[] = [
  {
    matcher: "/admin/abandoned-carts/visibility",
    method: "GET",
    middlewares: [validateAndTransformQuery(AbandonedCartVisibilityQuerySchema, {})],
  },
]
