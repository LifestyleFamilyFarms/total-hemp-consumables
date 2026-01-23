import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Users } from "@medusajs/icons"
import {
  Alert,
  Badge,
  Button,
  Container,
  Heading,
  Input,
  Select,
  Table,
  Text,
  Textarea,
  Toaster,
  toast,
} from "@medusajs/ui"
import { useEffect, useMemo, useState } from "react"
import { getAdmin, postAdmin } from "../../lib/sdk"

type SalesPerson = {
  id: string
  name: string
  email?: string
  phone?: string
  rep_code: string
  active?: boolean
  notes?: string
}

const SalesPeoplePage = () => {
  const [people, setPeople] = useState<SalesPerson[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [newPerson, setNewPerson] = useState({
    name: "",
    email: "",
    phone: "",
    rep_code: "",
    active: true,
    notes: "",
  })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editDrafts, setEditDrafts] = useState<Record<string, Partial<SalesPerson>>>({})

  const loadPeople = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await getAdmin<{ people: SalesPerson[] }>(
        "/admin/sales-people"
      )
      setPeople(response.people || [])
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Failed to load sales people."
      )
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void loadPeople()
  }, [])

  const filteredPeople = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()
    if (!term) {
      return people
    }
    return people.filter((person) =>
      `${person.name} ${person.email || ""} ${person.rep_code}`
        .toLowerCase()
        .includes(term)
    )
  }, [people, searchTerm])

  const handleCreate = async () => {
    if (!newPerson.name.trim() || !newPerson.rep_code.trim()) {
      toast.error("Name and rep code are required.")
      return
    }

    try {
      await postAdmin("/admin/sales-people", {
        ...newPerson,
        name: newPerson.name.trim(),
        rep_code: newPerson.rep_code.trim(),
        email: newPerson.email.trim() || undefined,
        phone: newPerson.phone.trim() || undefined,
        notes: newPerson.notes.trim() || undefined,
      })
      toast.success("Sales person created.")
      setNewPerson({
        name: "",
        email: "",
        phone: "",
        rep_code: "",
        active: true,
        notes: "",
      })
      await loadPeople()
    } catch (createError) {
      toast.error("Could not create sales person.")
    }
  }

  const startEdit = (person: SalesPerson) => {
    setEditingId(person.id)
    setEditDrafts((prev) => ({
      ...prev,
      [person.id]: {
        name: person.name,
        email: person.email,
        phone: person.phone,
        rep_code: person.rep_code,
        active: person.active,
        notes: person.notes,
      },
    }))
  }

  const updateDraft = (id: string, patch: Partial<SalesPerson>) => {
    setEditDrafts((prev) => ({
      ...prev,
      [id]: { ...prev[id], ...patch },
    }))
  }

  const saveEdit = async (id: string) => {
    const draft = editDrafts[id]
    if (!draft?.name?.trim() || !draft?.rep_code?.trim()) {
      toast.error("Name and rep code are required.")
      return
    }
    try {
      await postAdmin(`/admin/sales-people/${id}`, {
        ...draft,
        name: draft.name.trim(),
        rep_code: draft.rep_code.trim(),
        email: draft.email?.trim() || undefined,
        phone: draft.phone?.trim() || undefined,
        notes: draft.notes?.trim() || undefined,
      })
      toast.success("Sales person updated.")
      setEditingId(null)
      await loadPeople()
    } catch (updateError) {
      toast.error("Could not update sales person.")
    }
  }

  const copyRepLink = (repCode: string) => {
    const link = `${window.location.origin}/?rep=${encodeURIComponent(repCode)}`
    navigator.clipboard
      .writeText(link)
      .then(() => toast.success("Rep link copied."))
      .catch(() => toast.error("Could not copy rep link."))
  }

  return (
    <Container className="flex flex-col gap-6">
      <Toaster />
      <div className="flex items-center justify-between">
        <div>
          <Heading level="h1">Sales People</Heading>
          <Text size="small" className="text-ui-fg-subtle">
            Manage reps and attribution codes.
          </Text>
        </div>
        <Button variant="secondary" onClick={loadPeople} isLoading={isLoading}>
          Refresh
        </Button>
      </div>

      {error && <Alert variant="error">{error}</Alert>}

      <Container className="flex flex-col gap-4">
        <Heading level="h2">Add Sales Person</Heading>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            placeholder="Full name"
            value={newPerson.name}
            onChange={(event) =>
              setNewPerson((prev) => ({ ...prev, name: event.target.value }))
            }
          />
          <Input
            placeholder="Rep code (e.g. JANE23)"
            value={newPerson.rep_code}
            onChange={(event) =>
              setNewPerson((prev) => ({ ...prev, rep_code: event.target.value }))
            }
          />
          <Input
            placeholder="Email"
            value={newPerson.email}
            onChange={(event) =>
              setNewPerson((prev) => ({ ...prev, email: event.target.value }))
            }
          />
          <Input
            placeholder="Phone"
            value={newPerson.phone}
            onChange={(event) =>
              setNewPerson((prev) => ({ ...prev, phone: event.target.value }))
            }
          />
          <Select
            value={newPerson.active ? "active" : "inactive"}
            onValueChange={(value) =>
              setNewPerson((prev) => ({ ...prev, active: value === "active" }))
            }
          >
            <Select.Trigger>
              <Select.Value placeholder="Status" />
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="active">Active</Select.Item>
              <Select.Item value="inactive">Inactive</Select.Item>
            </Select.Content>
          </Select>
          <Textarea
            rows={2}
            placeholder="Notes (optional)"
            value={newPerson.notes}
            onChange={(event) =>
              setNewPerson((prev) => ({ ...prev, notes: event.target.value }))
            }
          />
        </div>
        <div>
          <Button variant="secondary" onClick={handleCreate}>
            Add sales person
          </Button>
        </div>
      </Container>

      <Container className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Heading level="h2">Sales People</Heading>
          <Input
            placeholder="Search by name, email, or rep code"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Rep Code</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Contact</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {filteredPeople.map((person) => {
              const isEditing = editingId === person.id
              const draft = editDrafts[person.id] || {}
              return (
                <Table.Row key={person.id}>
                  <Table.Cell>
                    {isEditing ? (
                      <Input
                        value={draft.name || ""}
                        onChange={(event) =>
                          updateDraft(person.id, { name: event.target.value })
                        }
                      />
                    ) : (
                      person.name
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {isEditing ? (
                      <Input
                        value={draft.rep_code || ""}
                        onChange={(event) =>
                          updateDraft(person.id, {
                            rep_code: event.target.value,
                          })
                        }
                      />
                    ) : (
                      person.rep_code
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {isEditing ? (
                      <Select
                        value={draft.active === false ? "inactive" : "active"}
                        onValueChange={(value) =>
                          updateDraft(person.id, {
                            active: value === "active",
                          })
                        }
                      >
                        <Select.Trigger>
                          <Select.Value placeholder="Status" />
                        </Select.Trigger>
                        <Select.Content>
                          <Select.Item value="active">Active</Select.Item>
                          <Select.Item value="inactive">Inactive</Select.Item>
                        </Select.Content>
                      </Select>
                    ) : (
                      <Badge color={person.active === false ? "grey" : "green"}>
                        {person.active === false ? "Inactive" : "Active"}
                      </Badge>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {isEditing ? (
                      <div className="flex flex-col gap-2">
                        <Input
                          value={draft.email || ""}
                          placeholder="Email"
                          onChange={(event) =>
                            updateDraft(person.id, {
                              email: event.target.value,
                            })
                          }
                        />
                        <Input
                          value={draft.phone || ""}
                          placeholder="Phone"
                          onChange={(event) =>
                            updateDraft(person.id, {
                              phone: event.target.value,
                            })
                          }
                        />
                        <Textarea
                          rows={2}
                          value={draft.notes || ""}
                          placeholder="Notes"
                          onChange={(event) =>
                            updateDraft(person.id, {
                              notes: event.target.value,
                            })
                          }
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col gap-1">
                        <Text size="small">{person.email || "-"}</Text>
                        <Text size="small">{person.phone || "-"}</Text>
                        {person.notes && (
                          <Text size="xsmall" className="text-ui-fg-subtle">
                            {person.notes}
                          </Text>
                        )}
                      </div>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex flex-wrap gap-2">
                      {isEditing ? (
                        <>
                          <Button
                            variant="secondary"
                            onClick={() => saveEdit(person.id)}
                          >
                            Save
                          </Button>
                          <Button
                            variant="secondary"
                            onClick={() => setEditingId(null)}
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="secondary"
                            onClick={() => startEdit(person)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="secondary"
                            onClick={() => copyRepLink(person.rep_code)}
                          >
                            Copy rep link
                          </Button>
                        </>
                      )}
                    </div>
                  </Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table>
      </Container>
    </Container>
  )
}

export const config = defineRouteConfig({
  label: "Sales People",
  icon: Users,
})

export default SalesPeoplePage
