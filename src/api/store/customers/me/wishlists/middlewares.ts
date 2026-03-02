import { authenticate, MiddlewareRoute } from "@medusajs/framework/http"

const customerAuth = authenticate("customer", ["session", "bearer"])

export const storeWishlistMiddlewares: MiddlewareRoute[] = [
  {
    matcher: "/store/customers/me/wishlists",
    method: "GET",
    middlewares: [customerAuth],
  },
]
