import { MiddlewareRoute, validateAndTransformBody } from "@medusajs/framework/http"
import { z } from "@medusajs/framework/zod"

export const AttachSalesPersonBodySchema = z.object({
  rep_code: z.string().trim().min(1),
  cart_id: z.string().trim().optional(),
  customer_id: z.string().trim().optional(),
}).superRefine((value, ctx) => {
  if (!value.cart_id && !value.customer_id) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Either cart_id or customer_id is required.",
      path: ["cart_id"],
    })
  }

  if (value.customer_id && !value.cart_id) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "cart_id is required when customer_id is provided.",
      path: ["cart_id"],
    })
  }
})

export type AttachSalesPersonBody = z.infer<typeof AttachSalesPersonBodySchema>

export const storeSalesPeopleAttachMiddlewares: MiddlewareRoute[] = [
  {
    matcher: "/store/sales-people/attach",
    method: "POST",
    middlewares: [validateAndTransformBody(AttachSalesPersonBodySchema)],
  },
]
