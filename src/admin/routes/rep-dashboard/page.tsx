import { defineRouteConfig } from "@medusajs/admin-sdk"
import { ChartBar } from "@medusajs/icons"
import {
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
  stores?: Array<unknown>
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

const RepDashboardPage = () => {
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null)
  const [ordersTotal, setOrdersTotal] = useState(0)
  const [customersTotal, setCustomersTotal] = useState(0)
  const [storesTotal, setStoresTotal] = useState(0)
  const [recentOrders, setRecentOrders] = useState<RepOrdersResponse["orders"]>([])
  const [recentCustomers, setRecentCustomers] =
    useState<RepCustomersResponse["customers"]>([])
  const [isLoading, setIsLoading] = useState(false)

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
          take: 1,
          skip: 0,
        }),
      ])
      setOrdersTotal(orders.total || 0)
      setCustomersTotal(customers.total || 0)
      setStoresTotal(stores.total || stores.stores?.length || 0)
      setRecentOrders(orders.orders || [])
      setRecentCustomers(customers.customers || [])
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
                  <Text size="small">
                    #{order.display_id || order.id} ·{" "}
                    {formatMoney(order.total, order.currency_code)}
                  </Text>
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
      </div>
      <div className="flex">
        <Button variant="secondary" onClick={loadStats} isLoading={isLoading}>
          Refresh stats
        </Button>
      </div>
    </Container>
  )
}

export const config = defineRouteConfig({
  label: "Rep Dashboard",
  icon: ChartBar,
})

export default RepDashboardPage
