import {
  authenticate,
  MiddlewareRoute,
  validateAndTransformBody,
} from "@medusajs/framework/http"
import { z } from "@medusajs/framework/zod"

export const AddWishlistItemBodySchema = z.object({
  variant_id: z.string().min(1),
})

export type AddWishlistItemBody = z.infer<typeof AddWishlistItemBodySchema>
const customerAuth = authenticate("customer", ["session", "bearer"])

export const storeWishlistItemMiddlewares: MiddlewareRoute[] = [
  {
    matcher: "/store/customers/me/wishlists/items",
    method: "POST",
    middlewares: [
      customerAuth,
      validateAndTransformBody(AddWishlistItemBodySchema),
    ],
  },
  {
    matcher: "/store/customers/me/wishlists/items/:id",
    method: "DELETE",
    middlewares: [customerAuth],
  },
]
