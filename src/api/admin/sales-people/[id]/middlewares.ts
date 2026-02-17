import { MiddlewareRoute, validateAndTransformBody } from "@medusajs/framework/http"
import { z } from "@medusajs/framework/zod"

export const UpdateSalesPersonBodySchema = z.object({
  name: z.string().trim().min(1).optional(),
  email: z.string().trim().optional(),
  phone: z.string().trim().optional(),
  rep_code: z.string().trim().min(1).optional(),
  active: z.boolean().optional(),
  notes: z.string().optional(),
})

export type UpdateSalesPersonBody = z.infer<typeof UpdateSalesPersonBodySchema>

export const adminSalesPersonByIdMiddlewares: MiddlewareRoute[] = [
  {
    matcher: "/admin/sales-people/:id",
    method: "POST",
    middlewares: [validateAndTransformBody(UpdateSalesPersonBodySchema)],
  },
]
