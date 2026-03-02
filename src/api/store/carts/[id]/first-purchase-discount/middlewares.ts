import {
  authenticate,
  MiddlewareRoute,
  validateAndTransformBody,
} from "@medusajs/framework/http"
import { z } from "@medusajs/framework/zod"

export const ApplyFirstPurchaseDiscountBodySchema = z.object({}).passthrough()

export type ApplyFirstPurchaseDiscountBody = z.infer<
  typeof ApplyFirstPurchaseDiscountBodySchema
>

const customerAuth = authenticate("customer", ["session", "bearer"])

export const storeFirstPurchaseDiscountMiddlewares: MiddlewareRoute[] = [
  {
    matcher: "/store/carts/:id/first-purchase-discount",
    method: "POST",
    middlewares: [
      customerAuth,
      validateAndTransformBody(ApplyFirstPurchaseDiscountBodySchema),
    ],
  },
]
