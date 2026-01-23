import { defineRouteConfig } from "@medusajs/admin-sdk"
import { UserGroup } from "@medusajs/icons"
import {
  Button,
  Container,
  Heading,
  Input,
  Select,
  Table,
  Text,
  Toaster,
  toast,
} from "@medusajs/ui"
import { useEffect, useMemo, useState } from "react"
import { getAdmin, listAdminUsers, updateAdminUser } from "../../lib/sdk"

type AdminUser = {
  id: string
  email: string
  first_name?: string | null
  last_name?: string | null
  metadata?: Record<string, unknown> | null
}

type SalesPerson = {
  id: string
  name: string
  rep_code: string
  active?: boolean
}

type UserRow = AdminUser & {
  role: string
  sales_person_id: string
}

const RepAccessPage = () => {
  const [users, setUsers] = useState<UserRow[]>([])
  const [salesPeople, setSalesPeople] = useState<SalesPerson[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const loadUsers = async () => {
    setIsLoading(true)
    try {
      const response = await listAdminUsers<{ users: AdminUser[] }>({
        limit: 200,
        fields: "id,email,first_name,last_name,metadata",
      })
      const rows = (response.users || []).map((user) => {
        const metadata = user.metadata || {}
        return {
          ...user,
          role:
            typeof metadata.sales_role === "string"
              ? metadata.sales_role
              : typeof metadata.role === "string"
              ? metadata.role
              : "",
          sales_person_id:
            typeof metadata.sales_person_id === "string"
              ? metadata.sales_person_id
              : typeof metadata.sales_rep_id === "string"
              ? metadata.sales_rep_id
              : "",
        }
      })
      setUsers(rows)
    } catch (error) {
      toast.error("Could not load admin users.")
    } finally {
      setIsLoading(false)
    }
  }

  const loadSalesPeople = async () => {
    try {
      const response = await getAdmin<{ people: SalesPerson[] }>(
        "/admin/sales-people"
      )
      setSalesPeople(response.people || [])
    } catch (error) {
      setSalesPeople([])
    }
  }

  useEffect(() => {
    void loadUsers()
    void loadSalesPeople()
  }, [])

  const filteredUsers = useMemo(() => {
    if (!searchTerm.trim()) {
      return users
    }
    const term = searchTerm.trim().toLowerCase()
    return users.filter((user) => {
      const name = `${user.first_name || ""} ${user.last_name || ""}`.trim()
      return (
        user.email.toLowerCase().includes(term) ||
        name.toLowerCase().includes(term)
      )
    })
  }, [users, searchTerm])

  const updateRow = (id: string, changes: Partial<UserRow>) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, ...changes } : user))
    )
  }

  const saveUser = async (user: UserRow) => {
    try {
      const metadata = {
        ...(user.metadata || {}),
        sales_role: user.role || null,
        sales_person_id: user.sales_person_id || null,
      }
      const response = await updateAdminUser<{ user: AdminUser }>(user.id, {
        metadata,
      })
      updateRow(user.id, { metadata: response.user.metadata || metadata })
      toast.success("Rep access updated.")
    } catch (error) {
      toast.error("Could not update rep access.")
    }
  }

  return (
    <Container className="flex flex-col gap-6">
      <Toaster />
      <div>
        <Heading level="h1">Rep Access</Heading>
        <Text size="small" className="text-ui-fg-subtle">
          Assign sales-rep roles and link admin users to sales people.
        </Text>
      </div>

      <div className="flex flex-col gap-2">
        <Text size="small" className="text-ui-fg-subtle">
          Search by name or email
        </Text>
        <Input
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search users"
        />
      </div>

      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>User</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Role</Table.HeaderCell>
            <Table.HeaderCell>Sales Person</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {filteredUsers.map((user) => (
            <Table.Row key={user.id}>
              <Table.Cell>
                {user.first_name || user.last_name
                  ? `${user.first_name || ""} ${user.last_name || ""}`.trim()
                  : "Unknown"}
              </Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>
                <Select
                  value={user.role || "admin"}
                  onValueChange={(value) => updateRow(user.id, { role: value })}
                >
                  <Select.Trigger>
                    <Select.Value placeholder="Select role" />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Item value="admin">Admin</Select.Item>
                    <Select.Item value="rep">Sales rep</Select.Item>
                  </Select.Content>
                </Select>
              </Table.Cell>
              <Table.Cell>
                <Select
                  value={user.sales_person_id || "unassigned"}
                  onValueChange={(value) =>
                    updateRow(user.id, {
                      sales_person_id: value === "unassigned" ? "" : value,
                    })
                  }
                >
                  <Select.Trigger>
                    <Select.Value placeholder="Assign rep" />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Item value="unassigned">Unassigned</Select.Item>
                    {salesPeople.map((rep) => (
                      <Select.Item key={rep.id} value={rep.id}>
                        {rep.name} ({rep.rep_code})
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select>
              </Table.Cell>
              <Table.Cell>
                <Button
                  variant="secondary"
                  isLoading={isLoading}
                  onClick={() => saveUser(user)}
                >
                  Save
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <Button variant="secondary" onClick={loadUsers} isLoading={isLoading}>
        Refresh
      </Button>
    </Container>
  )
}

export const config = defineRouteConfig({
  label: "Rep Access",
  icon: UserGroup,
})

export default RepAccessPage
