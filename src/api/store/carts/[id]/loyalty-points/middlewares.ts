import {
  authenticate,
  MiddlewareRoute,
  validateAndTransformBody,
} from "@medusajs/framework/http"
import { z } from "@medusajs/framework/zod"

export const LoyaltyPointsCartBodySchema = z.object({}).passthrough()

export type LoyaltyPointsCartBody = z.infer<typeof LoyaltyPointsCartBodySchema>

const customerAuth = authenticate("customer", ["session", "bearer"])

export const storeCartLoyaltyPointsMiddlewares: MiddlewareRoute[] = [
  {
    matcher: "/store/carts/:id/loyalty-points",
    method: "POST",
    middlewares: [customerAuth, validateAndTransformBody(LoyaltyPointsCartBodySchema)],
  },
  {
    matcher: "/store/carts/:id/loyalty-points",
    method: "DELETE",
    middlewares: [customerAuth, validateAndTransformBody(LoyaltyPointsCartBodySchema)],
  },
]
