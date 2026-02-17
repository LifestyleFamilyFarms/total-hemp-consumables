import { MiddlewareRoute, validateAndTransformBody } from "@medusajs/framework/http"
import { z } from "@medusajs/framework/zod"

export const SalesStoreBulkEntrySchema = z.object({
  name: z.string().trim().optional(),
  address: z.string().trim().min(1),
  lat: z.number().optional(),
  lng: z.number().optional(),
  source: z.string().optional(),
  stage: z.string().optional(),
  notes: z.string().optional(),
  assigned_sales_person_id: z.string().trim().optional(),
})

export const UpsertSalesStoresBodySchema = z.object({
  stores: z.array(SalesStoreBulkEntrySchema).min(1),
})

export type UpsertSalesStoresBody = z.infer<typeof UpsertSalesStoresBodySchema>

export const adminSalesStoresBulkMiddlewares: MiddlewareRoute[] = [
  {
    matcher: "/admin/sales-stores/bulk",
    method: "POST",
    middlewares: [validateAndTransformBody(UpsertSalesStoresBodySchema)],
  },
]
