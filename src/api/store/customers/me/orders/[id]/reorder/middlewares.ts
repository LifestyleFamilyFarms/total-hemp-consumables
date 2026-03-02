import { authenticate, MiddlewareRoute } from "@medusajs/framework/http"

const customerAuth = authenticate("customer", ["session", "bearer"])

export const storeCustomerOrderReorderMiddlewares: MiddlewareRoute[] = [
  {
    matcher: "/store/customers/me/orders/:id/reorder",
    method: "POST",
    middlewares: [customerAuth],
  },
]
