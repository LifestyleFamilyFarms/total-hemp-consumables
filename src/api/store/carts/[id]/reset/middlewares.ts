import { MiddlewareRoute, validateAndTransformBody } from "@medusajs/framework/http"
import { z } from "@medusajs/framework/zod"

export const ResetCartBodySchema = z.object({})

export type ResetCartBody = z.infer<typeof ResetCartBodySchema>

export const storeCartResetMiddlewares: MiddlewareRoute[] = [
  {
    matcher: "/store/carts/:id/reset",
    method: "POST",
    middlewares: [validateAndTransformBody(ResetCartBodySchema)],
  },
]
