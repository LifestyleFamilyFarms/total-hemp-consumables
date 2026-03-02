import {
  MiddlewareRoute,
  validateAndTransformBody,
} from "@medusajs/framework/http"
import { z } from "@medusajs/framework/zod"

export const UpdateCategoryImagesBodySchema = z.object({
  thumbnail: z.string().url().optional().nullable(),
  banner: z.string().url().optional().nullable(),
  gallery: z.array(z.string().url()).optional(),
})

export type UpdateCategoryImagesBody = z.infer<typeof UpdateCategoryImagesBodySchema>

export const adminCategoryImagesMiddlewares: MiddlewareRoute[] = [
  {
    matcher: "/admin/product-categories/:id/images",
    method: "POST",
    middlewares: [validateAndTransformBody(UpdateCategoryImagesBodySchema)],
  },
]
