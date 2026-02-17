import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { repGuard } from "../middlewares"

type ServicePair = [unknown, unknown]

type BuildReqInput = {
  path: string
  method?: string
  user?: Record<string, unknown>
  query?: Record<string, unknown>
  body?: Record<string, unknown>
  headers?: Record<string, unknown>
  servicePairs?: ServicePair[]
}

type MockResponse = {
  statusCode: number
  payload: unknown
  status: jest.Mock
  json: jest.Mock
}

const repUser = {
  id: "user_rep_1",
  metadata: {
    sales_role: "rep",
    sales_person_id: "sp_1",
  },
}

const adminUser = {
  id: "user_admin_1",
  metadata: {
    role: "admin",
  },
}

const buildReq = (input: BuildReqInput) => {
  const registry = new Map<unknown, unknown>(input.servicePairs ?? [])

  return {
    path: input.path,
    method: input.method ?? "GET",
    user: input.user ?? repUser,
    query: input.query ?? {},
    body: input.body ?? {},
    headers: input.headers ?? {},
    scope: {
      resolve: (key: unknown) => {
        if (registry.has(key)) {
          return registry.get(key)
        }

        throw new Error(`Service not mocked in test: ${String(key)}`)
      },
    },
  }
}

const buildRes = (): MockResponse => {
  const res = {
    statusCode: 200,
    payload: undefined,
    status: jest.fn(),
    json: jest.fn(),
  } as unknown as MockResponse

  res.status.mockImplementation((code: number) => {
    res.statusCode = code
    return res
  })

  res.json.mockImplementation((payload: unknown) => {
    res.payload = payload
    return res
  })

  return res
}

const ownedOrderService = {
  retrieveOrder: jest.fn(async () => ({
    id: "order_1",
    metadata: { sales_person_id: "sp_1" },
  })),
}

describe("repGuard", () => {
  const originalDefaultStockLocation = process.env.REP_DEFAULT_STOCK_LOCATION_ID

  beforeEach(() => {
    jest.clearAllMocks()
    jest.spyOn(console, "info").mockImplementation(() => undefined)
    process.env.REP_DEFAULT_STOCK_LOCATION_ID = ""
  })

  afterEach(() => {
    process.env.REP_DEFAULT_STOCK_LOCATION_ID = originalDefaultStockLocation
  })

  it("allows non-rep admin users through", async () => {
    const req = buildReq({
      path: "/admin/products",
      user: adminUser,
    })
    const res = buildRes()
    const next = jest.fn()

    await repGuard(req as never, res as never, next as never)

    expect(next).toHaveBeenCalledTimes(1)
    expect(res.status).not.toHaveBeenCalled()
  })

  it("blocks reps from non-allowlisted admin routes", async () => {
    const req = buildReq({ path: "/admin/products" })
    const res = buildRes()
    const next = jest.fn()

    await repGuard(req as never, res as never, next as never)

    expect(next).not.toHaveBeenCalled()
    expect(res.statusCode).toBe(403)
    expect(res.payload).toEqual({ message: "Sales reps are not allowed here." })
  })

  it("injects rep ownership filter on GET /admin/customers", async () => {
    const req = buildReq({
      path: "/admin/customers",
      query: { limit: "10" },
    })
    const res = buildRes()
    const next = jest.fn()

    await repGuard(req as never, res as never, next as never)

    expect(next).toHaveBeenCalledTimes(1)
    expect(req.query.sales_person_id).toBe("sp_1")
    expect((req.query.metadata as Record<string, unknown>).sales_person_id).toBe("sp_1")
  })

  it("blocks reps from loading customers assigned to another rep", async () => {
    const req = buildReq({
      path: "/admin/customers/cus_other",
      servicePairs: [
        [
          "customer",
          {
            retrieveCustomer: jest.fn(async () => ({
              id: "cus_other",
              metadata: { sales_person_id: "sp_2" },
            })),
          },
        ],
      ],
    })
    const res = buildRes()
    const next = jest.fn()

    await repGuard(req as never, res as never, next as never)

    expect(next).not.toHaveBeenCalled()
    expect(res.statusCode).toBe(403)
    expect(res.payload).toEqual({
      message: "Sales reps can only access assigned customers.",
    })
  })

  it("injects rep attribution on POST /admin/draft-orders", async () => {
    const req = buildReq({
      path: "/admin/draft-orders",
      method: "POST",
      body: {},
    })
    const res = buildRes()
    const next = jest.fn()

    await repGuard(req as never, res as never, next as never)

    expect(next).toHaveBeenCalledTimes(1)
    expect((req.body.metadata as Record<string, unknown>).sales_person_id).toBe("sp_1")
  })

  it("forces default stock location on rep fulfillment when configured", async () => {
    process.env.REP_DEFAULT_STOCK_LOCATION_ID = "sloc_default"

    const req = buildReq({
      path: "/admin/orders/order_1/fulfillments",
      method: "POST",
      body: { location_id: "sloc_old" },
      servicePairs: [["order", ownedOrderService]],
    })
    const res = buildRes()
    const next = jest.fn()

    await repGuard(req as never, res as never, next as never)

    expect(next).toHaveBeenCalledTimes(1)
    expect(req.body.location_id).toBe("sloc_default")
  })

  it("requires a selected location when default stock location is unset", async () => {
    const req = buildReq({
      path: "/admin/orders/order_1/fulfillments",
      method: "POST",
      body: {},
      servicePairs: [["order", ownedOrderService]],
    })
    const res = buildRes()
    const next = jest.fn()

    await repGuard(req as never, res as never, next as never)

    expect(next).not.toHaveBeenCalled()
    expect(res.statusCode).toBe(400)
    expect(res.payload).toEqual({
      message: "A stock location must be selected before creating fulfillment.",
    })
  })

  it("rejects unknown selected stock locations when default is unset", async () => {
    const req = buildReq({
      path: "/admin/orders/order_1/fulfillments",
      method: "POST",
      body: { location_id: "sloc_unknown" },
      servicePairs: [
        ["order", ownedOrderService],
        [ContainerRegistrationKeys.REMOTE_QUERY, jest.fn(async () => [])],
      ],
    })
    const res = buildRes()
    const next = jest.fn()

    await repGuard(req as never, res as never, next as never)

    expect(next).not.toHaveBeenCalled()
    expect(res.statusCode).toBe(400)
    expect(res.payload).toEqual({ message: "Selected stock location is invalid." })
  })

  it("allows a valid selected stock location when default is unset", async () => {
    const req = buildReq({
      path: "/admin/orders/order_1/fulfillments",
      method: "POST",
      body: { location_id: "sloc_valid" },
      servicePairs: [
        ["order", ownedOrderService],
        [ContainerRegistrationKeys.REMOTE_QUERY, jest.fn(async () => [{ id: "sloc_valid" }])],
      ],
    })
    const res = buildRes()
    const next = jest.fn()

    await repGuard(req as never, res as never, next as never)

    expect(next).toHaveBeenCalledTimes(1)
    expect(req.body.location_id).toBe("sloc_valid")
  })

  it("limits rep stock-location list to the configured default", async () => {
    process.env.REP_DEFAULT_STOCK_LOCATION_ID = "sloc_default"

    const req = buildReq({ path: "/admin/stock-locations", query: {} })
    const res = buildRes()
    const next = jest.fn()

    await repGuard(req as never, res as never, next as never)

    expect(next).toHaveBeenCalledTimes(1)
    expect(req.query.id).toBe("sloc_default")
  })

  it("blocks rep access to non-default stock-location details", async () => {
    process.env.REP_DEFAULT_STOCK_LOCATION_ID = "sloc_default"

    const req = buildReq({ path: "/admin/stock-locations/sloc_other" })
    const res = buildRes()
    const next = jest.fn()

    await repGuard(req as never, res as never, next as never)

    expect(next).not.toHaveBeenCalled()
    expect(res.statusCode).toBe(403)
    expect(res.payload).toEqual({
      message: "Sales reps can only access the default stock location.",
    })
  })
})
