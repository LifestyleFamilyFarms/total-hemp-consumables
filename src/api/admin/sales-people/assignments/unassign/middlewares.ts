import { MiddlewareRoute, validateAndTransformBody } from "@medusajs/framework/http"
import { z } from "@medusajs/framework/zod"

export const UnassignSalesStoreBodySchema = z.object({
  sales_store_id: z.string().trim().min(1),
})

export type UnassignSalesStoreBody = z.infer<typeof UnassignSalesStoreBodySchema>

export const adminSalesPeopleUnassignMiddlewares: MiddlewareRoute[] = [
  {
    matcher: "/admin/sales-people/assignments/unassign",
    method: "POST",
    middlewares: [validateAndTransformBody(UnassignSalesStoreBodySchema)],
  },
]
