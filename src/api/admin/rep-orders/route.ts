import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

type OrderListItem = {
  id: string
  display_id?: number
  status?: string
  payment_status?: string
  fulfillment_status?: string
  total?: number
  currency_code?: string
  email?: string
  created_at?: string
  metadata?: Record<string, unknown> | null
}

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const orderService = req.scope.resolve("order") as {
    listOrders: (
      selector?: Record<string, unknown>,
      config?: Record<string, unknown>
    ) => Promise<OrderListItem[]>
    countOrders?: (selector?: Record<string, unknown>) => Promise<number>
  }

  const q = typeof req.query?.q === "string" ? req.query.q.trim() : ""
  const take = Math.min(Number(req.query?.take || 50) || 50, 200)
  const skip = Math.max(Number(req.query?.skip || 0) || 0, 0)
  const salesPersonId =
    typeof req.query?.sales_person_id === "string"
      ? req.query.sales_person_id.trim()
      : ""

  const selector: Record<string, unknown> = {}
  if (salesPersonId) {
    selector.metadata = {
      sales_person_id: salesPersonId,
    }
  }
  if (q) {
    selector.$or = [
      { id: { $ilike: `%${q}%` } },
      { email: { $ilike: `%${q}%` } },
    ]
  }

  const orders = await orderService.listOrders(selector, {
    take,
    skip,
    order: { created_at: "DESC" },
    select: [
      "id",
      "display_id",
      "status",
      "payment_status",
      "fulfillment_status",
      "total",
      "currency_code",
      "email",
      "created_at",
      "metadata",
    ],
  })

  const filtered = salesPersonId
    ? orders.filter(
        (order) => order.metadata?.sales_person_id === salesPersonId
      )
    : orders

  const total = typeof orderService.countOrders === "function"
    ? await orderService.countOrders(selector)
    : filtered.length

  return res.status(200).json({
    orders: filtered,
    total,
    take,
    skip,
  })
}
