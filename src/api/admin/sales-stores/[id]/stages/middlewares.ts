import { MiddlewareRoute, validateAndTransformBody } from "@medusajs/framework/http"
import { z } from "@medusajs/framework/zod"

export const AddSalesStoreStageBodySchema = z.object({
  stage: z.string().trim().min(1),
  notes: z.string().optional(),
})

export type AddSalesStoreStageBody = z.infer<typeof AddSalesStoreStageBodySchema>

export const adminSalesStoreStagesMiddlewares: MiddlewareRoute[] = [
  {
    matcher: "/admin/sales-stores/:id/stages",
    method: "POST",
    middlewares: [validateAndTransformBody(AddSalesStoreStageBodySchema)],
  },
]
