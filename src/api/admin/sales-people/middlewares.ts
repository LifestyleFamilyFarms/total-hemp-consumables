import { MiddlewareRoute, validateAndTransformBody } from "@medusajs/framework/http"
import { z } from "@medusajs/framework/zod"

export const CreateSalesPersonBodySchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().optional(),
  phone: z.string().trim().optional(),
  rep_code: z.string().trim().min(1),
  active: z.boolean().optional(),
  notes: z.string().optional(),
})

export type CreateSalesPersonBody = z.infer<typeof CreateSalesPersonBodySchema>

export const adminSalesPeopleMiddlewares: MiddlewareRoute[] = [
  {
    matcher: "/admin/sales-people",
    method: "POST",
    middlewares: [validateAndTransformBody(CreateSalesPersonBodySchema)],
  },
]
