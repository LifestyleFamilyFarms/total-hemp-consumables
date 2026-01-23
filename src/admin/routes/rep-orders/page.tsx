import { defineRouteConfig } from "@medusajs/admin-sdk"
import { ChartBar } from "@medusajs/icons"
import {
  Button,
  Container,
  Heading,
  Input,
  Table,
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

type RepOrder = {
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

type OrdersResponse = {
  orders: RepOrder[]
  total: number
  take: number
  skip: number
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

const RepOrdersPage = () => {
  const [orders, setOrders] = useState<RepOrder[]>([])
  const [total, setTotal] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [skip, setSkip] = useState(0)
  const take = 50
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null)

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

  const loadOrders = async (options?: { reset?: boolean }) => {
    setIsLoading(true)
    try {
      const response = await getAdmin<OrdersResponse>("/admin/rep-orders", {
        q: searchTerm.trim() || undefined,
        take,
        skip: options?.reset ? 0 : skip,
        sales_person_id: repSalesPersonId || undefined,
      })
      setOrders((prev) =>
        options?.reset ? response.orders || [] : [...prev, ...(response.orders || [])]
      )
      setTotal(response.total || 0)
      setSkip(options?.reset ? response.orders.length : skip + response.orders.length)
    } catch (error) {
      toast.error("Could not load rep orders.")
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
    const timer = window.setTimeout(() => {
      setSkip(0)
      void loadOrders({ reset: true })
    }, 300)
    return () => window.clearTimeout(timer)
  }, [searchTerm, repSalesPersonId])

  const copyOrderId = async (orderId: string) => {
    try {
      await navigator.clipboard.writeText(orderId)
      toast.success("Order ID copied.")
    } catch (error) {
      toast.error("Could not copy order ID.")
    }
  }

  const openOrder = (orderId: string) => {
    window.open(`/app/orders/${orderId}`, "_blank")
  }

  return (
    <Container className="flex flex-col gap-6">
      <Toaster />
      <div>
        <Heading level="h1">Rep Orders</Heading>
        <Text size="small" className="text-ui-fg-subtle">
          Orders assigned to your sales rep code.
        </Text>
      </div>
      <div>
        <Button
          variant="secondary"
          onClick={() => window.open("/app/draft-orders/create", "_blank")}
        >
          Create draft order
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        <Text size="small" className="text-ui-fg-subtle">
          Search by order ID or customer email
        </Text>
        <Input
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search orders"
        />
      </div>

      <Text size="small" className="text-ui-fg-subtle">
        Showing {orders.length} of {total} orders
      </Text>

      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Order</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Customer</Table.HeaderCell>
            <Table.HeaderCell>Total</Table.HeaderCell>
            <Table.HeaderCell>Created</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {orders.map((order) => (
            <Table.Row key={order.id}>
              <Table.Cell>#{order.display_id || order.id}</Table.Cell>
              <Table.Cell>
                {order.status || "-"} / {order.payment_status || "-"}
              </Table.Cell>
              <Table.Cell>{order.email || "-"}</Table.Cell>
              <Table.Cell>{formatMoney(order.total, order.currency_code)}</Table.Cell>
              <Table.Cell>{formatDate(order.created_at)}</Table.Cell>
              <Table.Cell>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="secondary"
                    onClick={() => openOrder(order.id)}
                  >
                    Open
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => copyOrderId(order.id)}
                  >
                    Copy ID
                  </Button>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      {orders.length < total && (
        <div className="flex justify-center">
          <Button variant="secondary" isLoading={isLoading} onClick={() => loadOrders()}>
            Load more
          </Button>
        </div>
      )}
    </Container>
  )
}

export const config = defineRouteConfig({
  label: "Rep Orders",
  icon: ChartBar,
})

export default RepOrdersPage
