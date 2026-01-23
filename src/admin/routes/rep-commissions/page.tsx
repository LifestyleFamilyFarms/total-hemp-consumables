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
import { useMemo, useState } from "react"
import { getAdmin } from "../../lib/sdk"

type CommissionItem = {
  rep_code: string
  rep_id?: string
  orders: number
  revenue: number
  commission_rate: number
  commission: number
}

type CommissionResponse = {
  items: CommissionItem[]
  total_orders: number
  commission_rate: number
  csv: string
}

const formatMoney = (amount?: number) => {
  if (typeof amount !== "number") return "-"
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount / 100)
}

const RepCommissionsPage = () => {
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [rate, setRate] = useState("0.1")
  const [data, setData] = useState<CommissionResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const loadReport = async () => {
    setIsLoading(true)
    try {
      const response = await getAdmin<CommissionResponse>("/admin/rep-commissions", {
        from: from || undefined,
        to: to || undefined,
        rate: rate || undefined,
      })
      setData(response)
    } catch (error) {
      toast.error("Could not load commission report.")
    } finally {
      setIsLoading(false)
    }
  }

  const downloadCsv = () => {
    if (!data?.csv) {
      return
    }
    const blob = new Blob([data.csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "rep-commissions.csv"
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
  }

  const summary = useMemo(() => {
    if (!data?.items) return null
    const totalRevenue = data.items.reduce((sum, item) => sum + item.revenue, 0)
    const totalCommission = data.items.reduce(
      (sum, item) => sum + item.commission,
      0
    )
    return {
      totalRevenue,
      totalCommission,
    }
  }, [data])

  return (
    <Container className="flex flex-col gap-6">
      <Toaster />
      <div>
        <Heading level="h1">Rep Commissions</Heading>
        <Text size="small" className="text-ui-fg-subtle">
          Estimate commission payouts from rep-attributed orders.
        </Text>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="flex flex-col gap-2">
          <Text size="small" className="text-ui-fg-subtle">
            From date
          </Text>
          <Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
        </div>
        <div className="flex flex-col gap-2">
          <Text size="small" className="text-ui-fg-subtle">
            To date
          </Text>
          <Input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
        </div>
        <div className="flex flex-col gap-2">
          <Text size="small" className="text-ui-fg-subtle">
            Commission rate
          </Text>
          <Input value={rate} onChange={(e) => setRate(e.target.value)} />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" onClick={loadReport} isLoading={isLoading}>
          Load report
        </Button>
        <Button variant="secondary" onClick={downloadCsv} disabled={!data?.csv}>
          Download CSV
        </Button>
      </div>

      {data && (
        <>
          <Text size="small" className="text-ui-fg-subtle">
            {data.items.length} reps · {data.total_orders} orders ·{" "}
            {summary ? formatMoney(summary.totalRevenue) : "-"} revenue ·{" "}
            {summary ? formatMoney(summary.totalCommission) : "-"} commission
          </Text>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Rep</Table.HeaderCell>
                <Table.HeaderCell>Orders</Table.HeaderCell>
                <Table.HeaderCell>Revenue</Table.HeaderCell>
                <Table.HeaderCell>Rate</Table.HeaderCell>
                <Table.HeaderCell>Commission</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.items.map((item) => (
                <Table.Row key={item.rep_code}>
                  <Table.Cell>
                    {item.rep_code} {item.rep_id ? `(${item.rep_id})` : ""}
                  </Table.Cell>
                  <Table.Cell>{item.orders}</Table.Cell>
                  <Table.Cell>{formatMoney(item.revenue)}</Table.Cell>
                  <Table.Cell>{item.commission_rate}</Table.Cell>
                  <Table.Cell>{formatMoney(item.commission)}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </>
      )}
    </Container>
  )
}

export const config = defineRouteConfig({
  label: "Rep Commissions",
  icon: ChartBar,
})

export default RepCommissionsPage
