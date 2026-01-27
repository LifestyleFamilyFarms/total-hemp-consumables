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
    ) => Promise<OrderListItem[]>
    countOrders?: (selector?: Record<string, unknown>) => Promise<number>
  }

  const user = await resolveAdminUser(req)
  const repSalesPersonId = resolveRepSalesPersonId(user)
  const q = typeof req.query?.q === "string" ? req.query.q.trim() : ""
  const take = Math.min(Number(req.query?.take || 50) || 50, 200)
  const skip = Math.max(Number(req.query?.skip || 0) || 0, 0)
  const salesPersonId = repSalesPersonId
    ? repSalesPersonId
    : typeof req.query?.sales_person_id === "string"
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
