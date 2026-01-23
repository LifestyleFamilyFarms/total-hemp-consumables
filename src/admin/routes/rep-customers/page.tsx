import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Users } from "@medusajs/icons"
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

type RepCustomer = {
  id: string
  email?: string
  first_name?: string | null
  last_name?: string | null
  phone?: string | null
  created_at?: string
  metadata?: Record<string, unknown> | null
}

type CustomersResponse = {
  customers: RepCustomer[]
  total: number
  take: number
  skip: number
}

const formatDate = (value?: string) => {
  if (!value) return "-"
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleString()
}

const RepCustomersPage = () => {
  const [customers, setCustomers] = useState<RepCustomer[]>([])
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

  const loadCustomers = async (options?: { reset?: boolean }) => {
    setIsLoading(true)
    try {
      const response = await getAdmin<CustomersResponse>("/admin/rep-customers", {
        q: searchTerm.trim() || undefined,
        take,
        skip: options?.reset ? 0 : skip,
        sales_person_id: repSalesPersonId || undefined,
      })
      setCustomers((prev) =>
        options?.reset
          ? response.customers || []
          : [...prev, ...(response.customers || [])]
      )
      setTotal(response.total || 0)
      setSkip(
        options?.reset ? response.customers.length : skip + response.customers.length
      )
    } catch (error) {
      toast.error("Could not load rep customers.")
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
      void loadCustomers({ reset: true })
    }, 300)
    return () => window.clearTimeout(timer)
  }, [searchTerm, repSalesPersonId])

  const openCustomer = (customerId: string) => {
    window.open(`/app/customers/${customerId}`, "_blank")
  }

  const createDraftOrder = (customerId: string) => {
    const params = new URLSearchParams({ customer_id: customerId })
    window.open(`/app/draft-orders/create?${params.toString()}`, "_blank")
  }

  return (
    <Container className="flex flex-col gap-6">
      <Toaster />
      <div>
        <Heading level="h1">Rep Customers</Heading>
        <Text size="small" className="text-ui-fg-subtle">
          Customers assigned to your sales rep code.
        </Text>
      </div>
      <div>
        <Button
          variant="secondary"
          onClick={() => window.open("/app/customers/create", "_blank")}
        >
          Create customer
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        <Text size="small" className="text-ui-fg-subtle">
          Search by name or email
        </Text>
        <Input
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search customers"
        />
      </div>

      <Text size="small" className="text-ui-fg-subtle">
        Showing {customers.length} of {total} customers
      </Text>

      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Phone</Table.HeaderCell>
            <Table.HeaderCell>Created</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {customers.map((customer) => (
            <Table.Row key={customer.id}>
              <Table.Cell>
                {`${customer.first_name || ""} ${customer.last_name || ""}`.trim() ||
                  "Unknown"}
              </Table.Cell>
              <Table.Cell>{customer.email || "-"}</Table.Cell>
              <Table.Cell>{customer.phone || "-"}</Table.Cell>
              <Table.Cell>{formatDate(customer.created_at)}</Table.Cell>
              <Table.Cell>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="secondary"
                    onClick={() => openCustomer(customer.id)}
                  >
                    Open
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => createDraftOrder(customer.id)}
                  >
                    Create draft order
                  </Button>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      {customers.length < total && (
        <div className="flex justify-center">
          <Button variant="secondary" isLoading={isLoading} onClick={() => loadCustomers()}>
            Load more
          </Button>
        </div>
      )}
    </Container>
  )
}

export const config = defineRouteConfig({
  label: "Rep Customers",
  icon: Users,
})

export default RepCustomersPage
