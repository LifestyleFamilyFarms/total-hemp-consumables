import { MiddlewareRoute, validateAndTransformBody } from "@medusajs/framework/http"
import { z } from "@medusajs/framework/zod"

export const AssignSalesStoreBodySchema = z.object({
  sales_person_id: z.string().trim().min(1),
  sales_store_id: z.string().trim().min(1),
  notes: z.string().optional(),
})

export type AssignSalesStoreBody = z.infer<typeof AssignSalesStoreBodySchema>

export const adminSalesPeopleAssignmentsMiddlewares: MiddlewareRoute[] = [
  {
    matcher: "/admin/sales-people/assignments",
    method: "POST",
    middlewares: [validateAndTransformBody(AssignSalesStoreBodySchema)],
  },
]
