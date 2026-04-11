import { MiddlewareRoute } from "@medusajs/framework/http"

export const shipstationWebhookMiddlewares: MiddlewareRoute[] = [
  {
    matcher: "/hooks/shipstation/tracking",
    bodyParser: false,
    middlewares: [],
  },
]
