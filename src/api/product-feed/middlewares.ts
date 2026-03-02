import {
  MiddlewareRoute,
  validateAndTransformQuery,
} from "@medusajs/framework/http"
import { z } from "@medusajs/framework/zod"

export const ProductFeedQuerySchema = z.object({
  currency_code: z.string().length(3),
  country_code: z.string().length(2),
})

export type ProductFeedQuery = z.infer<typeof ProductFeedQuerySchema>

export const productFeedMiddlewares: MiddlewareRoute[] = [
  {
    matcher: "/product-feed",
    method: "GET",
    middlewares: [validateAndTransformQuery(ProductFeedQuerySchema, {})],
  },
]
