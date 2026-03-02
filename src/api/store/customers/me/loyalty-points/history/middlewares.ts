import {
  authenticate,
  MiddlewareRoute,
  validateAndTransformQuery,
} from "@medusajs/framework/http"
import { z } from "@medusajs/framework/zod"

export const GetLoyaltyHistoryQuerySchema = z.object({
  limit: z.preprocess(
    (val) => {
      if (typeof val === "string") {
        return Number.parseInt(val, 10)
      }
      return val
    },
    z.number().int().min(1).max(100).default(20)
  ),
  offset: z.preprocess(
    (val) => {
      if (typeof val === "string") {
        return Number.parseInt(val, 10)
      }
      return val
    },
    z.number().int().min(0).default(0)
  ),
})

export type GetLoyaltyHistoryQuery = z.infer<typeof GetLoyaltyHistoryQuerySchema>
const customerAuth = authenticate("customer", ["session", "bearer"])

export const storeCustomerLoyaltyHistoryMiddlewares: MiddlewareRoute[] = [
  {
    matcher: "/store/customers/me/loyalty-points/history",
    method: "GET",
    middlewares: [
      customerAuth,
      validateAndTransformQuery(GetLoyaltyHistoryQuerySchema, {}),
    ],
  },
]
