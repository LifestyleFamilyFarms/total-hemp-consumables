import {
  MiddlewareRoute,
  validateAndTransformBody,
} from "@medusajs/framework/http"
import { z } from "@medusajs/framework/zod"

export const ProcessAbandonedCartsBodySchema = z.object({
  lookback_hours: z.number().int().min(1).max(24 * 30).optional(),
  limit: z.number().int().min(1).max(500).optional(),
  dry_run: z.boolean().optional(),
})

export type ProcessAbandonedCartsBody = z.infer<
  typeof ProcessAbandonedCartsBodySchema
>

export const adminAbandonedCartsProcessMiddlewares: MiddlewareRoute[] = [
  {
    matcher: "/admin/abandoned-carts/process",
    method: "POST",
    middlewares: [validateAndTransformBody(ProcessAbandonedCartsBodySchema)],
  },
]
