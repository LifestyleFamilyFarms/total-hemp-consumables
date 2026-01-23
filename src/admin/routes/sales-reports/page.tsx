import { defineRouteConfig } from "@medusajs/admin-sdk"
import { ChartBar } from "@medusajs/icons"
import {
  Alert,
  Button,
  Container,
  Heading,
  Input,
  Table,
  Text,
  Toaster,
  toast,
} from "@medusajs/ui"
import { useEffect, useState } from "react"
import { getAdmin } from "../../lib/sdk"

type OrdersByRep = {
  rep_code: string
  rep_id?: string
  orders: number
  revenue: number
}

const formatMoney = (amount: number) => {
  if (!Number.isFinite(amount)) {
    return "$0.00"
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount / 100)
}

const SalesReportsPage = () => {
  const [items, setItems] = useState<OrdersByRep[]>([])
  const [totalOrders, setTotalOrders] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")

  const loadReport = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await getAdmin<{
        items: OrdersByRep[]
        total_orders: number
      }>("/admin/sales-reports/orders-by-rep", {
        from: fromDate || undefined,
        to: toDate || undefined,
      })
      setItems(response.items || [])
      setTotalOrders(response.total_orders || 0)
    } catch (loadError) {
      const message =
        loadError instanceof Error
          ? loadError.message
          : "Failed to load sales reports."
      setError(message)
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void loadReport()
  }, [])

  return (
    <Container className="flex flex-col gap-6">
      <Toaster />
      <div className="flex items-center justify-between">
        <div>
          <Heading level="h1">Sales Reports</Heading>
          <Text size="small" className="text-ui-fg-subtle">
            Orders and revenue by sales rep.
          </Text>
        </div>
        <Button variant="secondary" onClick={loadReport} isLoading={isLoading}>
          Refresh
        </Button>
      </div>

      {error && <Alert variant="error">{error}</Alert>}

      <Container className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="flex flex-col gap-2">
            <Text size="small" className="text-ui-fg-subtle">
              From date
            </Text>
            <Input
              type="date"
              value={fromDate}
              onChange={(event) => setFromDate(event.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Text size="small" className="text-ui-fg-subtle">
              To date
            </Text>
            <Input
              type="date"
              value={toDate}
              onChange={(event) => setToDate(event.target.value)}
            />
          </div>
          <div className="flex items-end">
            <Button variant="secondary" onClick={loadReport} isLoading={isLoading}>
              Apply filter
            </Button>
          </div>
        </div>
        <Text size="small" className="text-ui-fg-subtle">
          {totalOrders} total orders included
        </Text>
      </Container>

      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Rep Code</Table.HeaderCell>
            <Table.HeaderCell>Orders</Table.HeaderCell>
            <Table.HeaderCell>Revenue</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {items.map((row) => (
            <Table.Row key={row.rep_code}>
              <Table.Cell>{row.rep_code}</Table.Cell>
              <Table.Cell>{row.orders}</Table.Cell>
              <Table.Cell>{formatMoney(row.revenue)}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <div className="flex justify-end">
        <Button
          variant="secondary"
          onClick={() => {
            if (!items.length) {
              toast.error("No report data to export.")
              return
            }
            const headers = ["Rep Code", "Orders", "Revenue"]
            const rows = items.map((row) => [
              row.rep_code,
              String(row.orders),
              formatMoney(row.revenue),
            ])
            const escapeValue = (value: string) => {
              const needsQuotes = /[\",\n]/.test(value)
              const escaped = value.replace(/\"/g, "\"\"")
              return needsQuotes ? `"${escaped}"` : escaped
            }
            const csv = [headers, ...rows]
              .map((row) => row.map(escapeValue).join(","))
              .join("\n")
            const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
            const url = URL.createObjectURL(blob)
            const link = document.createElement("a")
            link.href = url
            link.download = "sales-reports-by-rep.csv"
            document.body.appendChild(link)
            link.click()
            link.remove()
            URL.revokeObjectURL(url)
          }}
        >
          Export CSV
        </Button>
      </div>
    </Container>
  )
}

export const config = defineRouteConfig({
  label: "Sales Reports",
  icon: ChartBar,
})

export default SalesReportsPage
