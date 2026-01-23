import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

type OrderSummary = {
  id: string
  total: number
  metadata?: Record<string, unknown>
}

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const orderService = req.scope.resolve("order") as {
    listOrders: (
      selector?: Record<string, unknown>,
      config?: Record<string, unknown>
    ) => Promise<OrderSummary[]>
  }

  const from = typeof req.query?.from === "string" ? req.query.from : ""
  const to = typeof req.query?.to === "string" ? req.query.to : ""

  const selector: Record<string, unknown> = {}
  if (from || to) {
    selector.created_at = {
      ...(from ? { $gte: new Date(from) } : {}),
      ...(to ? { $lte: new Date(to) } : {}),
    }
  }

  const orders = await orderService.listOrders(selector, {
    take: 500,
    order: { created_at: "DESC" },
    select: ["id", "total", "metadata"],
  })

  const report = new Map<
    string,
    { rep_code: string; rep_id?: string; orders: number; revenue: number }
  >()

  orders.forEach((order) => {
    const repCode = String(order.metadata?.sales_person_code || "").trim()
    if (!repCode) {
      return
    }
    const repId = order.metadata?.sales_person_id
      ? String(order.metadata.sales_person_id)
      : undefined

    const current =
      report.get(repCode) ||
      ({ rep_code: repCode, rep_id: repId, orders: 0, revenue: 0 })

    report.set(repCode, {
      rep_code: repCode,
      rep_id: repId || current.rep_id,
      orders: current.orders + 1,
      revenue: current.revenue + (order.total || 0),
    })
  })

  return res.status(200).json({
    items: Array.from(report.values()).sort((a, b) => b.revenue - a.revenue),
    total_orders: orders.length,
  })
}
