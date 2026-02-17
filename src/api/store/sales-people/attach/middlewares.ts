import { MiddlewareRoute, validateAndTransformBody } from "@medusajs/framework/http"
import { z } from "@medusajs/framework/zod"

export const AttachSalesPersonBodySchema = z.object({
  rep_code: z.string().trim().min(1),
  cart_id: z.string().trim().optional(),
  customer_id: z.string().trim().optional(),
})

export type AttachSalesPersonBody = z.infer<typeof AttachSalesPersonBodySchema>

export const storeSalesPeopleAttachMiddlewares: MiddlewareRoute[] = [
  {
    matcher: "/store/sales-people/attach",
    method: "POST",
    middlewares: [validateAndTransformBody(AttachSalesPersonBodySchema)],
  },
]
