import { defineRouteConfig } from "@medusajs/admin-sdk"
import { ChartBar } from "@medusajs/icons"
import {
  Badge,
  Button,
  Container,
  Heading,
  Text,
  Toaster,
  toast,
} from "@medusajs/ui"
import { useEffect, useMemo, useState } from "react"
import { getAdmin, getAdminUser } from "../../lib/sdk"

type AdminUser = {
  id: string
  email: string
  metadata?: Record<string, unknown> | null
}

type RepOrdersResponse = {
  total: number
  orders?: Array<{
    id: string
    display_id?: number
    status?: string
    payment_status?: string
    fulfillment_status?: string
    total?: number
    currency_code?: string
    email?: string
    created_at?: string
  }>
}

type RepCustomersResponse = {
  total: number
  customers?: Array<{
    id: string
    email?: string
    first_name?: string | null
    last_name?: string | null
    created_at?: string
  }>
}

type SalesStoresResponse = {
  total?: number
  stores?: Array<{
    id: string
    name?: string
    address?: string
    stage?: string
    stage_updated_at?: string
  }>
}

const STAGES = [
  "discovered",
  "visited",
  "samples_dropped",
  "follow_up",
  "ordering",
  "inactive",
]

const formatStage = (stage?: string) => (stage ? stage.replace(/_/g, " ") : "unknown")

const stageColor = (stage?: string) => {
  switch (stage) {
    case "discovered":
      return "blue"
    case "visited":
      return "green"
    case "samples_dropped":
      return "purple"
    case "follow_up":
      return "orange"
    case "ordering":
      return "green"
    case "inactive":
      return "grey"
    default:
      return "blue"
  }
}

const statusColor = (value?: string) => {
  if (!value) return "grey"
  if (value.includes("cancel")) return "red"
  if (value.includes("fulfill") || value.includes("captured")) return "green"
  if (value.includes("pending") || value.includes("awaiting")) return "orange"
  return "blue"
}

const StatCard = ({
  label,
  value,
  actionLabel,
  onClick,
}: {
  label: string
  value: string
  actionLabel?: string
  onClick?: () => void
}) => {
  return (
    <div className="flex flex-col gap-2 rounded-md border border-ui-border-base p-4">
      <Text size="small" className="text-ui-fg-subtle">
        {label}
      </Text>
      <Heading level="h2">{value}</Heading>
      {actionLabel && onClick && (
        <Button variant="secondary" onClick={onClick}>
          {actionLabel}
        </Button>
      )}
    </div>
  )
}

const formatMoney = (amount?: number, currency?: string) => {
  if (typeof amount !== "number") return "-"
  if (!currency) return amount.toString()
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amount / 100)
  } catch (error) {
    return `${amount / 100} ${currency?.toUpperCase()}`
  }
}

const formatDate = (value?: string) => {
  if (!value) return "-"
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleString()
}

const toTimestamp = (value?: string) => {
  if (!value) return 0
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? 0 : date.getTime()
}

const RepDashboardPage = () => {
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null)
  const [ordersTotal, setOrdersTotal] = useState(0)
  const [customersTotal, setCustomersTotal] = useState(0)
  const [storesTotal, setStoresTotal] = useState(0)
  const [recentOrders, setRecentOrders] = useState<RepOrdersResponse["orders"]>([])
  const [recentCustomers, setRecentCustomers] =
    useState<RepCustomersResponse["customers"]>([])
  const [recentStores, setRecentStores] = useState<SalesStoresResponse["stores"]>(
    []
  )
  const [stageSummary, setStageSummary] = useState<Record<string, number>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [activityFilter, setActivityFilter] = useState<
    "all" | "orders" | "customers" | "stores"
  >("all")

  const repSalesPersonId = useMemo(() => {
    const metadata = currentUser?.metadata || {}
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
  }, [currentUser])

  const loadStats = async () => {
    if (!repSalesPersonId) {
      return
    }
    setIsLoading(true)
    try {
      const [orders, customers, stores] = await Promise.all([
        getAdmin<RepOrdersResponse>("/admin/rep-orders", {
          sales_person_id: repSalesPersonId,
          take: 5,
          skip: 0,
        }),
        getAdmin<RepCustomersResponse>("/admin/rep-customers", {
          sales_person_id: repSalesPersonId,
          take: 5,
          skip: 0,
        }),
        getAdmin<SalesStoresResponse>("/admin/sales-stores", {
          sales_person_id: repSalesPersonId,
          take: 200,
          skip: 0,
        }),
      ])
      setOrdersTotal(orders.total || 0)
      setCustomersTotal(customers.total || 0)
      setStoresTotal(stores.total || stores.stores?.length || 0)
      setRecentOrders(orders.orders || [])
      setRecentCustomers(customers.customers || [])
      const stageCounts = (stores.stores || []).reduce<Record<string, number>>(
        (acc, store) => {
          const stage = store.stage || "unknown"
          acc[stage] = (acc[stage] || 0) + 1
          return acc
        },
        {}
      )
      setStageSummary(stageCounts)
      const sortedStores = (stores.stores || [])
        .slice()
        .sort((a, b) => {
          const aTime = a.stage_updated_at
            ? new Date(a.stage_updated_at).getTime()
            : 0
          const bTime = b.stage_updated_at
            ? new Date(b.stage_updated_at).getTime()
            : 0
          return bTime - aTime
        })
        .slice(0, 5)
      setRecentStores(sortedStores)
    } catch (error) {
      toast.error("Could not load rep dashboard stats.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await getAdminUser<{ user: AdminUser }>()
        setCurrentUser(response.user || null)
      } catch (error) {
        setCurrentUser(null)
      }
    }
    void loadUser()
  }, [])

  useEffect(() => {
    void loadStats()
  }, [repSalesPersonId])

  return (
    <Container className="flex flex-col gap-6">
      <Toaster />
      <div>
        <Heading level="h1">Rep Dashboard</Heading>
        <Text size="small" className="text-ui-fg-subtle">
          Quick view of your assigned sales activity.
        </Text>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="secondary"
          onClick={() => window.open("/app/customers/create", "_blank")}
        >
          Create customer
        </Button>
        <Button
          variant="secondary"
          onClick={() => window.open("/app/draft-orders/create", "_blank")}
        >
          Create draft order
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          label="Orders"
          value={`${ordersTotal}`}
          actionLabel="View orders"
          onClick={() => window.open("/app/rep-orders", "_self")}
        />
        <StatCard
          label="Customers"
          value={`${customersTotal}`}
          actionLabel="View customers"
          onClick={() => window.open("/app/rep-customers", "_self")}
        />
        <StatCard
          label="Sales Stores"
          value={`${storesTotal}`}
          actionLabel="View stores"
          onClick={() => window.open("/app/sales-stores", "_self")}
        />
      </div>
      <div className="rounded-md border border-ui-border-base p-4">
        <div className="mb-2 flex items-center justify-between">
          <Heading level="h2">Store Pipeline</Heading>
          <Button
            variant="secondary"
            onClick={() => window.open("/app/sales-stores", "_self")}
          >
            Manage stores
          </Button>
        </div>
        <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-6">
          {STAGES.map((stage) => (
            <div
              key={stage}
              className="rounded-md border border-ui-border-base p-3"
            >
              <Badge color={stageColor(stage)}>{formatStage(stage)}</Badge>
              <Heading level="h2">{stageSummary[stage] || 0}</Heading>
            </div>
          ))}
        </div>
        {storesTotal > 200 && (
          <Text size="xsmall" className="mt-2 text-ui-fg-subtle">
            Showing stage totals for the first 200 assigned stores.
          </Text>
        )}
      </div>
      <div className="rounded-md border border-ui-border-base p-4">
        <div className="mb-2 flex items-center justify-between">
          <Heading level="h2">Activity Feed</Heading>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={activityFilter === "all" ? "primary" : "secondary"}
              onClick={() => setActivityFilter("all")}
            >
              All
            </Button>
            <Button
              variant={activityFilter === "orders" ? "primary" : "secondary"}
              onClick={() => setActivityFilter("orders")}
            >
              Orders
            </Button>
            <Button
              variant={activityFilter === "customers" ? "primary" : "secondary"}
              onClick={() => setActivityFilter("customers")}
            >
              Customers
            </Button>
            <Button
              variant={activityFilter === "stores" ? "primary" : "secondary"}
              onClick={() => setActivityFilter("stores")}
            >
              Stores
            </Button>
            <Button variant="secondary" onClick={loadStats} isLoading={isLoading}>
              Refresh
            </Button>
          </div>
        </div>
        {(() => {
          const items: Array<{
            id: string
            label: string
            detail: string
            at: string
            href?: string
            type: "orders" | "customers" | "stores"
            customerId?: string
            statuses?: Array<{ label: string; value?: string }>
          }> = []

          recentOrders?.forEach((order) => {
            items.push({
              id: `order-${order.id}`,
              label: `Order #${order.display_id || order.id}`,
              detail: `${order.email || "-"} · ${formatMoney(
                order.total,
                order.currency_code
              )}`,
              at: order.created_at || "",
              href: `/app/orders/${order.id}`,
              type: "orders",
              statuses: [
                { label: "Order", value: order.status },
                { label: "Payment", value: order.payment_status },
                { label: "Fulfillment", value: order.fulfillment_status },
              ],
            })
          })

          recentCustomers?.forEach((customer) => {
            const name =
              `${customer.first_name || ""} ${customer.last_name || ""}`.trim() ||
              "Unknown"
            items.push({
              id: `customer-${customer.id}`,
              label: `Customer: ${name}`,
              detail: customer.email || "-",
              at: customer.created_at || "",
              href: `/app/customers/${customer.id}`,
              type: "customers",
              customerId: customer.id,
            })
          })

          recentStores?.forEach((store) => {
            items.push({
              id: `store-${store.id}`,
              label: `Store: ${store.name || "Unnamed store"}`,
              detail: `${store.stage || "unknown"} · ${store.address || "-"}`,
              at: store.stage_updated_at || "",
              href: `/app/sales-stores`,
              type: "stores",
            })
          })

          const sorted = items
            .sort((a, b) => toTimestamp(b.at) - toTimestamp(a.at))
            .slice(0, 12)

          const filtered =
            activityFilter === "all"
              ? sorted
              : sorted.filter((item) => item.type === activityFilter)

          if (filtered.length === 0) {
            return (
              <Text size="small" className="text-ui-fg-subtle">
                No activity yet.
              </Text>
            )
          }

          return (
            <div className="flex flex-col gap-2">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-1 rounded-md border border-ui-border-base p-3"
                >
                  <div className="flex items-center gap-2">
                    <Badge color="blue">
                      {item.type === "orders"
                        ? "Order"
                        : item.type === "customers"
                        ? "Customer"
                        : "Store"}
                    </Badge>
                    {item.href ? (
                      <button
                        type="button"
                        className="text-left text-sm text-ui-fg-base hover:text-ui-fg-subtle"
                        onClick={() => window.open(item.href!, "_blank")}
                      >
                        {item.label}
                      </button>
                    ) : (
                      <Text size="small">{item.label}</Text>
                    )}
                  </div>
                  {item.href ? (
                    <div className="flex flex-wrap items-center gap-2">
                      {item.type === "customers" && (
                        <Button
                          variant="secondary"
                          className="h-7 px-2 text-xs"
                          onClick={() =>
                            window.open(
                              `/app/draft-orders/create?customer_id=${item.customerId || ""}`,
                              "_blank"
                            )
                          }
                        >
                          Draft order
                        </Button>
                      )}
                      {item.type === "stores" && (
                        <Button
                          variant="secondary"
                          className="h-7 px-2 text-xs"
                          onClick={() =>
                            window.open("/app/draft-orders/create", "_blank")
                          }
                        >
                          Draft order
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div />
                  )}
                  {item.type === "orders" && item.statuses && (
                    <div className="flex flex-wrap gap-2">
                      {item.statuses.map((status) => (
                        <Badge
                          key={`${item.id}-${status.label}`}
                          color={statusColor(status.value)}
                        >
                          {status.label}: {status.value || "-"}
                        </Badge>
                      ))}
                    </div>
                  )}
                  <Text size="xsmall" className="text-ui-fg-subtle">
                    {item.detail} · {formatDate(item.at)}
                  </Text>
                </div>
              ))}
            </div>
          )
        })()}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-md border border-ui-border-base p-4">
          <div className="mb-2 flex items-center justify-between">
            <Heading level="h2">Recent Orders</Heading>
            <Button
              variant="secondary"
              onClick={() => window.open("/app/rep-orders", "_self")}
            >
              View all
            </Button>
          </div>
          {recentOrders && recentOrders.length > 0 ? (
            <div className="flex flex-col gap-2">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex flex-col gap-1 rounded-md border border-ui-border-base p-3"
                >
                  <div className="flex items-center gap-2">
                    <Text size="small">
                      #{order.display_id || order.id} ·{" "}
                      {formatMoney(order.total, order.currency_code)}
                    </Text>
                    <Button
                      variant="secondary"
                      className="h-7 px-2 text-xs"
                      onClick={() => window.open(`/app/orders/${order.id}`, "_blank")}
                    >
                      Open
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge color={statusColor(order.status)}>
                      Order: {order.status || "-"}
                    </Badge>
                    <Badge color={statusColor(order.payment_status)}>
                      Payment: {order.payment_status || "-"}
                    </Badge>
                    <Badge color={statusColor(order.fulfillment_status)}>
                      Fulfillment: {order.fulfillment_status || "-"}
                    </Badge>
                  </div>
                  <Text size="xsmall" className="text-ui-fg-subtle">
                    {order.email || "-"} · {formatDate(order.created_at)}
                  </Text>
                </div>
              ))}
            </div>
          ) : (
            <Text size="small" className="text-ui-fg-subtle">
              No recent orders yet.
            </Text>
          )}
        </div>
        <div className="rounded-md border border-ui-border-base p-4">
          <div className="mb-2 flex items-center justify-between">
            <Heading level="h2">Recent Customers</Heading>
            <Button
              variant="secondary"
              onClick={() => window.open("/app/rep-customers", "_self")}
            >
              View all
            </Button>
          </div>
          {recentCustomers && recentCustomers.length > 0 ? (
            <div className="flex flex-col gap-2">
              {recentCustomers.map((customer) => (
                <div
                  key={customer.id}
                  className="flex flex-col gap-1 rounded-md border border-ui-border-base p-3"
                >
                  <Text size="small">
                    {`${customer.first_name || ""} ${
                      customer.last_name || ""
                    }`.trim() || "Unknown"}
                  </Text>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="secondary"
                      className="h-7 px-2 text-xs"
                      onClick={() =>
                        window.open(`/app/customers/${customer.id}`, "_blank")
                      }
                    >
                      Open
                    </Button>
                    <Button
                      variant="secondary"
                      className="h-7 px-2 text-xs"
                      onClick={() =>
                        window.open(
                          `/app/draft-orders/create?customer_id=${customer.id}`,
                          "_blank"
                        )
                      }
                    >
                      Draft order
                    </Button>
                  </div>
                  <Text size="xsmall" className="text-ui-fg-subtle">
                    {customer.email || "-"} · {formatDate(customer.created_at)}
                  </Text>
                </div>
              ))}
            </div>
          ) : (
            <Text size="small" className="text-ui-fg-subtle">
              No recent customers yet.
            </Text>
          )}
        </div>
        <div className="rounded-md border border-ui-border-base p-4">
          <div className="mb-2 flex items-center justify-between">
            <Heading level="h2">Recent Store Updates</Heading>
            <Button
              variant="secondary"
              onClick={() => window.open("/app/sales-stores", "_self")}
            >
              View all
            </Button>
          </div>
          {recentStores && recentStores.length > 0 ? (
            <div className="flex flex-col gap-2">
              {recentStores.map((store) => (
                <div
                  key={store.id}
                  className="flex flex-col gap-1 rounded-md border border-ui-border-base p-3"
                >
                  <div className="flex items-center gap-2">
                    <Text size="small">{store.name || "Unnamed store"}</Text>
                    <Badge color={stageColor(store.stage)}>
                      {formatStage(store.stage)}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="secondary"
                      className="h-7 px-2 text-xs"
                      onClick={() => window.open("/app/sales-stores", "_self")}
                    >
                      Open stores
                    </Button>
                    <Button
                      variant="secondary"
                      className="h-7 px-2 text-xs"
                      onClick={() =>
                        window.open("/app/draft-orders/create", "_blank")
                      }
                    >
                      Draft order
                    </Button>
                  </div>
                  <Text size="xsmall" className="text-ui-fg-subtle">
                    {store.address || "-"} · {store.stage || "unknown"} ·{" "}
                    {formatDate(store.stage_updated_at)}
                  </Text>
                </div>
              ))}
            </div>
          ) : (
            <Text size="small" className="text-ui-fg-subtle">
              No recent store updates yet.
            </Text>
          )}
        </div>
      </div>
    </Container>
  )
}

export const config = defineRouteConfig({
  label: "Rep Dashboard",
  icon: ChartBar,
})

export default RepDashboardPage
