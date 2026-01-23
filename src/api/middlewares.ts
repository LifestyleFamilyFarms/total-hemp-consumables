import {
  defineMiddlewares,
  MedusaNextFunction,
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"

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

const resolveRepContext = (user: AdminUser | null) => {
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

  return {
    isRep: role === "rep" || role === "sales_rep",
    salesPersonId,
  }
}

const getPath = (req: MedusaRequest) => {
  const raw =
    (req as { path?: string }).path ||
    (req as { originalUrl?: string }).originalUrl ||
    (req as { url?: string }).url ||
    ""
  return raw.split("?")[0]
}

const toSegments = (path: string) => path.split("/").filter(Boolean)

const isAllowedForRep = (path: string) => {
  if (path.startsWith("/admin/orders")) return true
  if (path.startsWith("/admin/rep-dashboard")) return true
  if (path.startsWith("/admin/rep-orders")) return true
  if (path.startsWith("/admin/rep-customers")) return true
  if (path.startsWith("/admin/rep-commissions")) return true
  if (path.startsWith("/admin/draft-orders")) return true
  if (path.startsWith("/admin/sales-stores")) return true
  if (path.startsWith("/admin/trip-planner")) return true
  if (path.startsWith("/admin/sales-reports/orders-by-rep")) return true
  if (path === "/admin/sales-people") return true
  if (path.startsWith("/admin/customers")) return true
  return false
}

const isWriteMethod = (method: string) =>
  ["POST", "PUT", "PATCH", "DELETE"].includes(method.toUpperCase())

const resolveOrderService = (req: MedusaRequest) => {
  return req.scope.resolve("order") as unknown as {
    retrieveOrder: (
      id: string,
      config?: Record<string, unknown>
    ) => Promise<{ id: string; metadata?: Record<string, unknown> | null }>
    listOrders?: (
      selector?: Record<string, unknown>,
      config?: Record<string, unknown>
    ) => Promise<
      Array<{
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
      }>
    >
    countOrders?: (sel: Record<string, unknown>) => Promise<number>
  }
}

const resolveDraftOrderService = (req: MedusaRequest) => {
  const keys = ["draftOrder", "draftOrders"]
  for (const key of keys) {
    try {
      return req.scope.resolve(key) as {
        retrieveDraftOrder?: (
          id: string,
          config?: Record<string, unknown>
        ) => Promise<{ id: string; metadata?: Record<string, unknown> | null }>
      }
    } catch (error) {
      continue
    }
  }
  return null
}

const ensureOrderOwnership = async (
  req: MedusaRequest,
  orderId: string,
  salesPersonId: string
) => {
  const orderService = resolveOrderService(req)
  const order = await orderService.retrieveOrder(orderId, {
    select: ["id", "metadata"],
  })
  const orderRepId =
    typeof order?.metadata?.sales_person_id === "string"
      ? order.metadata.sales_person_id
      : ""
  return Boolean(orderRepId && orderRepId === salesPersonId)
}

const ensureDraftOrderOwnership = async (
  req: MedusaRequest,
  orderId: string,
  salesPersonId: string
) => {
  const draftOrderService = resolveDraftOrderService(req)
  if (!draftOrderService?.retrieveDraftOrder) {
    return false
  }
  const draftOrder = await draftOrderService.retrieveDraftOrder(orderId, {
    select: ["id", "metadata"],
  })
  const orderRepId =
    typeof draftOrder?.metadata?.sales_person_id === "string"
      ? draftOrder.metadata.sales_person_id
      : ""
  return Boolean(orderRepId && orderRepId === salesPersonId)
}

const ensureStoreOwnership = async (
  req: MedusaRequest,
  storeId: string,
  salesPersonId: string
) => {
  const salesStores = req.scope.resolve("salesStores") as {
    listSalesStores: (
      selector?: Record<string, unknown>,
      config?: Record<string, unknown>
    ) => Promise<Array<{ id: string; assigned_sales_person_id?: string | null }>>
  }
  const [store] = await salesStores.listSalesStores({ id: storeId }, { take: 1 })
  if (!store) {
    return false
  }
  return store.assigned_sales_person_id === salesPersonId
}

const ensureStoreOwnershipByAddress = async (
  req: MedusaRequest,
  address: string,
  salesPersonId: string
) => {
  const salesStores = req.scope.resolve("salesStores") as {
    listSalesStores: (
      selector?: Record<string, unknown>,
      config?: Record<string, unknown>
    ) => Promise<Array<{ id: string; assigned_sales_person_id?: string | null }>>
  }
  const normalized = address.trim().toLowerCase().replace(/\s+/g, " ")
  const [store] = await salesStores.listSalesStores(
    { normalized_address: normalized },
    { take: 1 }
  )
  if (!store) {
    return true
  }
  return store.assigned_sales_person_id === salesPersonId
}

const repGuard = async (
  req: MedusaRequest,
  res: MedusaResponse,
  next: MedusaNextFunction
) => {
  const path = getPath(req)
  const user = await resolveAdminUser(req)
  const { isRep, salesPersonId } = resolveRepContext(user)

  if (!isRep) {
    return next()
  }

  if (!salesPersonId) {
    return res.status(403).json({
      message:
        "Sales rep access is not configured. Contact an admin to assign your rep ID.",
    })
  }

  if (!isAllowedForRep(path)) {
    return res.status(403).json({ message: "Sales reps are not allowed here." })
  }

  if (path.startsWith("/admin/sales-people/assignments")) {
    return res.status(403).json({ message: "Sales reps cannot reassign reps." })
  }

  if (path === "/admin/sales-people" && req.method !== "GET") {
    return res.status(403).json({ message: "Sales reps cannot edit reps." })
  }

  if (path.startsWith("/admin/sales-reports/orders-by-rep") && req.method !== "GET") {
    return res.status(403).json({ message: "Sales reps can only view reports." })
  }

  if (path.startsWith("/admin/orders")) {
    const segments = toSegments(path)
    const orderId = segments[2]
    if (!orderId) {
      if (req.method === "GET") {
        const orderService = resolveOrderService(req)
        const limit = Math.min(
          Number((req.query as Record<string, unknown>)?.limit || 50) || 50,
          200
        )
        const offset = Math.max(
          Number((req.query as Record<string, unknown>)?.offset || 0) || 0,
          0
        )
        const q = typeof req.query?.q === "string" ? req.query.q.trim() : ""

        const selector: Record<string, unknown> = {
          metadata: {
            sales_person_id: salesPersonId,
          },
        }
        if (q) {
          selector.$or = [
            { id: { $ilike: `%${q}%` } },
            { email: { $ilike: `%${q}%` } },
          ]
        }

        const listOrders = orderService.listOrders
        if (!listOrders) {
          return res.status(500).json({ message: "Orders list unavailable." })
        }
        const orders = await listOrders(selector, {
          take: limit,
          skip: offset,
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
        const filtered = orders.filter(
          (order) => order.metadata?.sales_person_id === salesPersonId
        )
        const countOrders = (
          orderService as unknown as {
            countOrders?: (sel: Record<string, unknown>) => Promise<number>
          }
        ).countOrders
        const count =
          typeof countOrders === "function"
            ? await countOrders(selector)
            : filtered.length

        return res.status(200).json({
          orders: filtered,
          count,
          offset,
          limit,
        })
      }
      if (req.method === "POST") {
        const body = (req.body || {}) as { metadata?: Record<string, unknown> }
        const metadata = body.metadata || {}
        if (
          metadata.sales_person_id &&
          metadata.sales_person_id !== salesPersonId
        ) {
          return res.status(403).json({
            message: "Sales reps can only create their own orders.",
          })
        }
        body.metadata = {
          ...metadata,
          sales_person_id: salesPersonId,
        }
        req.body = body
        return next()
      }
      return res.status(403).json({
        message: "Sales reps can only create orders for assigned customers.",
      })
    }
    const hasAccess = await ensureOrderOwnership(req, orderId, salesPersonId)
    if (!hasAccess) {
      return res.status(403).json({
        message: "Sales reps can only access their own orders.",
      })
    }
  }

  if (path.startsWith("/admin/rep-orders")) {
    if (req.method !== "GET") {
      return res.status(403).json({
        message: "Rep Orders is read-only.",
      })
    }
  }

  if (path.startsWith("/admin/rep-customers")) {
    if (req.method !== "GET") {
      return res.status(403).json({
        message: "Rep Customers is read-only.",
      })
    }
  }

  if (path.startsWith("/admin/draft-orders")) {
    const segments = toSegments(path)
    const draftId = segments[2]
    if (!draftId) {
      if (req.method === "GET") {
        const query = (req.query || {}) as Record<string, unknown>
        query.sales_person_id = salesPersonId
        query.metadata = {
          ...(typeof query.metadata === "object" && query.metadata ? query.metadata : {}),
          sales_person_id: salesPersonId,
        }
        ;(req as unknown as { query: Record<string, unknown> }).query = query
        return next()
      }
      if (req.method === "POST") {
        const body = (req.body || {}) as { metadata?: Record<string, unknown> }
        const metadata = body.metadata || {}
        if (
          metadata.sales_person_id &&
          metadata.sales_person_id !== salesPersonId
        ) {
          return res.status(403).json({
            message: "Sales reps can only create their own draft orders.",
          })
        }
        body.metadata = {
          ...metadata,
          sales_person_id: salesPersonId,
        }
        req.body = body
        return next()
      }
      return res.status(403).json({
        message: "Sales reps can only create draft orders for assigned customers.",
      })
    }
    const hasAccess = await ensureDraftOrderOwnership(req, draftId, salesPersonId)
    if (!hasAccess) {
      return res.status(403).json({
        message: "Sales reps can only access their own draft orders.",
      })
    }
  }

  if (path.startsWith("/admin/sales-stores") && isWriteMethod(req.method)) {
    if (path === "/admin/sales-stores/bulk") {
      const body = (req.body || {}) as {
        stores?: Array<Record<string, unknown>>
      }
      const stores = body.stores || []
      for (const store of stores) {
        const address =
          typeof store.address === "string" ? store.address.trim() : ""
        if (!address) {
          return res.status(400).json({ message: "Store address is required." })
        }
        const hasAccess = await ensureStoreOwnershipByAddress(
          req,
          address,
          salesPersonId
        )
        if (!hasAccess) {
          return res.status(403).json({
            message:
              "Sales reps can only update stores assigned to themselves.",
          })
        }
        store.assigned_sales_person_id = salesPersonId
      }
      return next()
    }

    const segments = toSegments(path)
    const storeId = segments[2]
    if (storeId) {
      const hasAccess = await ensureStoreOwnership(req, storeId, salesPersonId)
      if (!hasAccess) {
        return res.status(403).json({
          message: "Sales reps can only update their assigned stores.",
        })
      }
    }
  }

  if (path.startsWith("/admin/customers")) {
    const customerMatch = path.match(/^\/admin\/customers\/([^/]+)/)

    if (!customerMatch) {
      if (req.method === "GET") {
        return res.status(403).json({
          message: "Sales reps can only access assigned customers directly.",
        })
      }

      if (req.method === "POST") {
        const body = req.body as { metadata?: Record<string, unknown> }
        const metadata = body?.metadata || {}
        if (
          metadata.sales_person_id &&
          metadata.sales_person_id !== salesPersonId
        ) {
          return res.status(403).json({
            message:
              "Sales reps can only create customers assigned to themselves.",
          })
        }
        body.metadata = {
          ...metadata,
          sales_person_id: salesPersonId,
        }
        return next()
      }
    }

    if (customerMatch) {
      const customerId = customerMatch[1]
      const customerService = req.scope.resolve("customer") as {
        retrieveCustomer: (id: string) => Promise<{ metadata?: Record<string, unknown> }>
      }
      try {
        const customer = await customerService.retrieveCustomer(customerId)
        const customerRepId =
          typeof customer?.metadata?.sales_person_id === "string"
            ? customer.metadata.sales_person_id
            : ""
        if (!customerRepId || customerRepId !== salesPersonId) {
          return res.status(403).json({
            message: "Sales reps can only access assigned customers.",
          })
        }
      } catch (error) {
        return res.status(404).json({ message: "Customer not found." })
      }
    }
  }

  return next()
}

export default defineMiddlewares({
  routes: [
    {
      matcher: /^\/admin\/.*/,
      middlewares: [repGuard],
    },
  ],
})
