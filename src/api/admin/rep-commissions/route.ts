import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

type OrderSummary = {
  id: string
  total: number
  metadata?: Record<string, unknown>
}

type AdminUser = {
  id: string
  metadata?: Record<string, unknown> | null
}

const resolveAdminUser = async (req: MedusaRequest): Promise<AdminUser | null> => {
  const directUser = (req as { user?: AdminUser }).user
  if (directUser?.metadata) {
    return directUser
  }

  const authUser = (req as { auth?: { user?: AdminUser } }).auth?.user
  if (authUser?.metadata) {
    return authUser
  }

  const actorId = (req as { auth_context?: { actor_id?: string } })?.auth_context
    ?.actor_id

  if (!actorId) {
    return null
  }

  const userServiceCandidates = ["user", "users", "userService"]
  for (const key of userServiceCandidates) {
    try {
      const service = req.scope.resolve(key) as {
        retrieveUser?: (id: string) => Promise<AdminUser>
      }
      if (service?.retrieveUser) {
        return await service.retrieveUser(actorId)
      }
    } catch (error) {
      continue
    }
  }

  return null
}

const resolveRepSalesPersonId = (user: AdminUser | null) => {
  const metadata = user?.metadata || {}
  const role =
    typeof metadata.sales_role === "string"
      ? metadata.sales_role
      : typeof metadata.role === "string"
      ? metadata.role
      : ""
  const salesPersonId =
    typeof metadata.sales_person_id === "string"
      ? metadata.sales_person_id
      : typeof metadata.sales_rep_id === "string"
      ? metadata.sales_rep_id
      : ""
  return role === "rep" || role === "sales_rep" ? salesPersonId : ""
}

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const orderService = req.scope.resolve("order") as {
    listOrders: (
      selector?: Record<string, unknown>,
      config?: Record<string, unknown>
    ) => Promise<OrderSummary[]>
  }

  const user = await resolveAdminUser(req)
  const repSalesPersonId = resolveRepSalesPersonId(user)
  if (repSalesPersonId) {
    return res.status(403).json({
      message: "Rep commissions are only available to admins.",
    })
  }

  const from = typeof req.query?.from === "string" ? req.query.from : ""
  const to = typeof req.query?.to === "string" ? req.query.to : ""
  const rateRaw = typeof req.query?.rate === "string" ? req.query.rate : ""
  const commissionRate = Number(rateRaw || 0.1)

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

  const items = Array.from(report.values())
    .map((item) => ({
      ...item,
      commission_rate: commissionRate,
      commission: Math.round(item.revenue * commissionRate),
    }))
    .sort((a, b) => b.revenue - a.revenue)

  const csvHeaders = [
    "Rep Code",
    "Rep ID",
    "Orders",
    "Revenue",
    "Commission Rate",
    "Commission",
  ]
  const csvRows = items.map((item) => [
    item.rep_code,
    item.rep_id || "",
    item.orders,
    item.revenue,
    item.commission_rate,
    item.commission,
  ])
  const escapeValue = (value: string) => {
    const needsQuotes = /[",\n]/.test(value)
    const escaped = value.replace(/"/g, '""')
    return needsQuotes ? `"${escaped}"` : escaped
  }
  const csv = [csvHeaders, ...csvRows]
    .map((row) => row.map((value) => escapeValue(String(value))).join(","))
    .join("\n")

  return res.status(200).json({
    items,
    total_orders: orders.length,
    commission_rate: commissionRate,
    csv,
  })
}
