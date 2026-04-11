import {
  defineMiddlewares,
  MedusaNextFunction,
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@medusajs/framework/utils"
import { adminSalesPersonByIdMiddlewares } from "./admin/sales-people/[id]/middlewares"
import { adminSalesPeopleAssignmentsMiddlewares } from "./admin/sales-people/assignments/middlewares"
import { adminSalesPeopleUnassignMiddlewares } from "./admin/sales-people/assignments/unassign/middlewares"
import { adminSalesPeopleMiddlewares } from "./admin/sales-people/middlewares"
import { adminSalesStoreStagesMiddlewares } from "./admin/sales-stores/[id]/stages/middlewares"
import { adminSalesStoresBulkMiddlewares } from "./admin/sales-stores/bulk/middlewares"
import { adminAbandonedCartsProcessMiddlewares } from "./admin/abandoned-carts/process/middlewares"
import { adminAbandonedCartsVisibilityMiddlewares } from "./admin/abandoned-carts/visibility/middlewares"
import { adminCategoryImagesMiddlewares } from "./admin/product-categories/[id]/images/middlewares"
import { productFeedMiddlewares } from "./product-feed/middlewares"
import { shipstationWebhookMiddlewares } from "./hooks/shipstation/tracking/middlewares"
import { storeCartLoyaltyPointsMiddlewares } from "./store/carts/[id]/loyalty-points/middlewares"
import { storeFirstPurchaseDiscountMiddlewares } from "./store/carts/[id]/first-purchase-discount/middlewares"
import { storeCartResetMiddlewares } from "./store/carts/[id]/reset/middlewares"
import { storeCustomerLoyaltyHistoryMiddlewares } from "./store/customers/me/loyalty-points/history/middlewares"
import { storeCustomerOrderReorderMiddlewares } from "./store/customers/me/orders/[id]/reorder/middlewares"
import { storeWishlistMiddlewares } from "./store/customers/me/wishlists/middlewares"
import { storeWishlistItemMiddlewares } from "./store/customers/me/wishlists/items/middlewares"
import { storeProductReviewsMiddlewares } from "./store/products/[id]/reviews/middlewares"
import { storeSalesPeopleAttachMiddlewares } from "./store/sales-people/attach/middlewares"

type AdminUser = {
  id: string
  metadata?: Record<string, unknown> | null
}

const resolveAdminUser = async (req: MedusaRequest): Promise<AdminUser | null> => {
  const directUser = (req as { user?: AdminUser }).user
  if (directUser) {
    return directUser
  }

  const authUser = (req as { auth?: { user?: AdminUser } }).auth?.user
  if (authUser) {
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

const getRepDefaultStockLocationId = () =>
  (process.env.REP_DEFAULT_STOCK_LOCATION_ID || "").trim()

const getRequestId = (req: MedusaRequest) => {
  const header =
    (req.headers?.["x-request-id"] as string | undefined) ||
    (req.headers?.["x-correlation-id"] as string | undefined)
  return header || ""
}

const logRepAction = (input: {
  userId?: string
  salesPersonId: string
  method: string
  path: string
  requestId?: string
}) => {
  const payload = {
    event: "rep_action",
    user_id: input.userId || "",
    sales_person_id: input.salesPersonId,
    method: input.method,
    path: input.path,
    request_id: input.requestId || "",
    at: new Date().toISOString(),
  }
  console.info(JSON.stringify(payload))
}

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
  if (path.startsWith("/admin/regions")) return true
  if (path.startsWith("/admin/sales-channels")) return true
  if (path.startsWith("/admin/product-variants")) return true
  if (path.startsWith("/admin/shipping-options")) return true
  if (path.startsWith("/admin/stock-locations")) return true
  if (path.startsWith("/admin/promotions")) return true
  if (path === "/admin/users/me") return true
  if (path.startsWith("/admin/users/")) return true
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

const stockLocationExists = async (req: MedusaRequest, locationId: string) => {
  if (!locationId) {
    return false
  }

  const remoteQuery = req.scope.resolve(
    ContainerRegistrationKeys.REMOTE_QUERY
  ) as (query: unknown) => Promise<Array<{ id: string }>>

  const query = remoteQueryObjectFromString({
    entryPoint: "stock_location",
    variables: {
      filters: { id: locationId },
    },
    fields: ["id"],
  })

  const stockLocations = await remoteQuery(query)
  return stockLocations.some((location) => location.id === locationId)
}

export const repGuard = async (
  req: MedusaRequest,
  res: MedusaResponse,
  next: MedusaNextFunction
) => {
  const path = getPath(req)
  const user = await resolveAdminUser(req)
  const actorId =
    (req as { auth_context?: { actor_id?: string } })?.auth_context?.actor_id ||
    ""

  if (actorId && !user) {
    return res.status(403).json({
      message: "Unable to resolve user context for this request.",
    })
  }

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
        const adjustedCount =
          filtered.length !== orders.length ? filtered.length : count

        return res.status(200).json({
          orders: filtered,
          count: adjustedCount,
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

    if (isWriteMethod(req.method)) {
      const isCreateFulfillment =
        req.method === "POST" &&
        segments.length === 4 &&
        segments[3] === "fulfillments"

      if (!isCreateFulfillment) {
        return res.status(403).json({
          message:
            "Sales reps can only create fulfillments for their own orders.",
        })
      }

      const defaultStockLocationId = getRepDefaultStockLocationId()
      const body = (req.body || {}) as Record<string, unknown>

      if (defaultStockLocationId) {
        body.location_id = defaultStockLocationId
      } else {
        const requestedLocationId =
          typeof body.location_id === "string" ? body.location_id.trim() : ""

        if (!requestedLocationId) {
          return res.status(400).json({
            message:
              "A stock location must be selected before creating fulfillment.",
          })
        }

        const locationFound = await stockLocationExists(req, requestedLocationId)
        if (!locationFound) {
          return res.status(400).json({
            message: "Selected stock location is invalid.",
          })
        }

        body.location_id = requestedLocationId
      }

      req.body = body
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

  if (path.startsWith("/admin/rep-commissions")) {
    return res.status(403).json({
      message: "Rep commissions are only available to admins.",
    })
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

  if (path.startsWith("/admin/regions")) {
    if (req.method !== "GET") {
      return res.status(403).json({
        message: "Sales reps can only view regions.",
      })
    }
  }

  if (path.startsWith("/admin/sales-channels")) {
    if (req.method !== "GET") {
      return res.status(403).json({
        message: "Sales reps can only view sales channels.",
      })
    }
  }

  if (path.startsWith("/admin/product-variants")) {
    if (req.method !== "GET") {
      return res.status(403).json({
        message: "Sales reps can only view product variants.",
      })
    }
  }

  if (path.startsWith("/admin/shipping-options")) {
    if (req.method !== "GET") {
      return res.status(403).json({
        message: "Sales reps can only view shipping options.",
      })
    }
  }

  if (path.startsWith("/admin/stock-locations")) {
    if (req.method !== "GET") {
      return res.status(403).json({
        message: "Sales reps can only view stock locations.",
      })
    }

    const defaultStockLocationId = getRepDefaultStockLocationId()

    if (defaultStockLocationId) {
      const segments = toSegments(path)
      const locationId = segments[2]
      if (locationId && locationId !== defaultStockLocationId) {
        return res.status(403).json({
          message: "Sales reps can only access the default stock location.",
        })
      }

      if (!locationId) {
        const query = (req.query || {}) as Record<string, unknown>
        query.id = defaultStockLocationId
        ;(req as unknown as { query: Record<string, unknown> }).query = query
      }
    }
  }

  if (path.startsWith("/admin/promotions")) {
    if (req.method !== "GET") {
      return res.status(403).json({
        message: "Sales reps can only view promotions.",
      })
    }
  }

  if (path === "/admin/users/me") {
    if (req.method !== "GET") {
      return res.status(403).json({
        message: "Sales reps can only view their own user profile.",
      })
    }
  }

  if (path.startsWith("/admin/users/") && path !== "/admin/users/me") {
    if (req.method !== "GET") {
      return res.status(403).json({
        message: "Sales reps can only view their own user profile.",
      })
    }

    const segments = toSegments(path)
    const requestedUserId = segments[2]
    if (!requestedUserId || requestedUserId !== user?.id) {
      return res.status(403).json({
        message: "Sales reps can only access their own user profile.",
      })
    }
  }

  if (path === "/admin/sales-stores" && req.method === "GET") {
    const query = (req.query || {}) as Record<string, unknown>
    query.sales_person_id = salesPersonId
    ;(req as unknown as { query: Record<string, unknown> }).query = query
    return next()
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

      return res.status(403).json({
        message: "Sales reps can only list or create assigned customers.",
      })
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

  const shouldLog =
    isWriteMethod(req.method) ||
    path.startsWith("/admin/rep-") ||
    path.startsWith("/admin/orders") ||
    path.startsWith("/admin/draft-orders") ||
    path.startsWith("/admin/sales-stores") ||
    path.startsWith("/admin/customers") ||
    path.startsWith("/admin/regions") ||
    path.startsWith("/admin/sales-channels") ||
    path.startsWith("/admin/product-variants") ||
    path.startsWith("/admin/shipping-options") ||
    path.startsWith("/admin/stock-locations") ||
    path.startsWith("/admin/promotions") ||
    path.startsWith("/admin/users")

  if (shouldLog) {
    logRepAction({
      userId: user?.id,
      salesPersonId,
      method: req.method,
      path,
      requestId: getRequestId(req),
    })
  }

  return next()
}

export default defineMiddlewares({
  routes: [
    ...productFeedMiddlewares,
    ...adminAbandonedCartsProcessMiddlewares,
    ...adminAbandonedCartsVisibilityMiddlewares,
    ...adminCategoryImagesMiddlewares,
    ...adminSalesPeopleMiddlewares,
    ...adminSalesPersonByIdMiddlewares,
    ...adminSalesPeopleAssignmentsMiddlewares,
    ...adminSalesPeopleUnassignMiddlewares,
    ...adminSalesStoresBulkMiddlewares,
    ...adminSalesStoreStagesMiddlewares,
    ...storeProductReviewsMiddlewares,
    ...storeCustomerOrderReorderMiddlewares,
    ...storeWishlistMiddlewares,
    ...storeWishlistItemMiddlewares,
    ...storeSalesPeopleAttachMiddlewares,
    ...storeCartResetMiddlewares,
    ...storeCartLoyaltyPointsMiddlewares,
    ...storeFirstPurchaseDiscountMiddlewares,
    ...storeCustomerLoyaltyHistoryMiddlewares,
    ...shipstationWebhookMiddlewares,
    {
      matcher: /^\/admin\/.*/,
      middlewares: [repGuard],
    },
  ],
})
