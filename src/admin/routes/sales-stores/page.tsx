import { defineRouteConfig } from "@medusajs/admin-sdk"
import { BuildingStorefront } from "@medusajs/icons"
import {
  Alert,
  Badge,
  Button,
  Checkbox,
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
import { useEffect, useMemo, useRef, useState } from "react"
import { getAdmin, postAdmin } from "../../lib/sdk"
import { normalizeAddress } from "../../../utils/sales-stores"

type SalesStore = {
  id: string
  name?: string
  address: string
  stage?: string
  stage_updated_at?: string
  source?: string
  notes?: string
}

type SalesStoreStage = {
  id: string
  stage: string
  occurred_at: string
  notes?: string
  source?: string
}

type AddressSuggestion = {
  placeId: string
  text: string
}

const STAGES = [
  "discovered",
  "visited",
  "samples_dropped",
  "follow_up",
  "ordering",
  "inactive",
]

const formatStage = (stage?: string) =>
  stage ? stage.replace(/_/g, " ") : "unknown"

const daysSince = (date?: string) => {
  if (!date) {
    return "-"
  }
  const diffMs = Date.now() - new Date(date).getTime()
  if (Number.isNaN(diffMs)) {
    return "-"
  }
  const days = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)))
  return days === 0 ? "Today" : `${days}d`
}

const SalesStoresPage = () => {
  const [stores, setStores] = useState<SalesStore[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [stageSelections, setStageSelections] = useState<Record<string, string>>(
    {}
  )
  const [noteSelections, setNoteSelections] = useState<Record<string, string>>(
    {}
  )
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null)
  const [stageHistory, setStageHistory] = useState<SalesStoreStage[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [stageFilter, setStageFilter] = useState<string>("all")
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [bulkStage, setBulkStage] = useState<string>("visited")
  const [bulkNotes, setBulkNotes] = useState<string>("")
  const [savedFilters, setSavedFilters] = useState<
    Array<{ id: string; label: string; term: string; stage: string }>
  >([])
  const [newStoreName, setNewStoreName] = useState("")
  const [newStoreAddress, setNewStoreAddress] = useState("")
  const [newStoreStage, setNewStoreStage] = useState<string>("discovered")
  const [newStoreNotes, setNewStoreNotes] = useState("")
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([])
  const [isSuggesting, setIsSuggesting] = useState(false)
  const suggestTimer = useRef<number | null>(null)
  const suggestCache = useRef<Map<string, AddressSuggestion[]>>(new Map())
  const [viewMode, setViewMode] = useState<"list" | "board">("list")
  const [totalCount, setTotalCount] = useState(0)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const pageSize = 50

  const savedFiltersKey = "sales-stores-saved-filters"

  const loadStores = async (options?: {
    q?: string
    stage?: string
    reset?: boolean
  }) => {
    if (options?.reset) {
      setIsLoading(true)
      setError(null)
    } else {
      setIsLoadingMore(true)
    }
    try {
      const response = await getAdmin<{
        stores: SalesStore[]
        total?: number
        skip?: number
        take?: number
      }>("/admin/sales-stores", {
        q: options?.q,
        stage: options?.stage,
        take: pageSize,
        skip: options?.reset ? 0 : stores.length,
      })
      setStores((prev) =>
        options?.reset
          ? response.stores || []
          : [...prev, ...(response.stores || [])]
      )
      setTotalCount(response.total || 0)
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Failed to load sales stores."
      )
    } finally {
      setIsLoading(false)
      setIsLoadingMore(false)
    }
  }

  const normalizedStoreAddresses = useMemo(() => {
    return new Set(stores.map((store) => normalizeAddress(store.address)))
  }, [stores])

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(savedFiltersKey)
      if (stored) {
        const parsed = JSON.parse(stored) as Array<{
          id: string
          label: string
          term: string
          stage: string
        }>
        if (Array.isArray(parsed)) {
          setSavedFilters(parsed)
        }
      }
    } catch (error) {
      setSavedFilters([])
    }
  }, [])

  useEffect(() => {
    if (!searchTerm || searchTerm.trim().length < 3) {
      setSuggestions([])
      setIsSuggesting(false)
      return
    }

    if (suggestTimer.current) {
      window.clearTimeout(suggestTimer.current)
    }

    suggestTimer.current = window.setTimeout(async () => {
      const cacheKey = searchTerm.trim().toLowerCase()
      if (suggestCache.current.has(cacheKey)) {
        setSuggestions(suggestCache.current.get(cacheKey) || [])
        return
      }

      setIsSuggesting(true)
      try {
        const response = await getAdmin<{ suggestions?: AddressSuggestion[] }>(
          "/admin/sales-stores/suggest",
          { q: searchTerm.trim() }
        )
        const next = (response.suggestions || []).filter(
          (suggestion) =>
            !normalizedStoreAddresses.has(normalizeAddress(suggestion.text))
        )
        suggestCache.current.set(cacheKey, next)
        setSuggestions(next)
      } catch (error) {
        setSuggestions([])
      } finally {
        setIsSuggesting(false)
      }
    }, 350)

    return () => {
      if (suggestTimer.current) {
        window.clearTimeout(suggestTimer.current)
      }
    }
  }, [searchTerm, normalizedStoreAddresses])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadStores({ q: searchTerm.trim(), stage: stageFilter, reset: true })
    }, 300)
    return () => window.clearTimeout(timer)
  }, [searchTerm, stageFilter])

  const updateStageSelection = (storeId: string, stage: string) => {
    setStageSelections((prev) => ({ ...prev, [storeId]: stage }))
  }

  const updateNoteSelection = (storeId: string, notes: string) => {
    setNoteSelections((prev) => ({ ...prev, [storeId]: notes }))
  }

  const handleAddStage = async (storeId: string) => {
    const stage = stageSelections[storeId] || "visited"
    const notes = noteSelections[storeId]

    try {
      await postAdmin(`/admin/sales-stores/${storeId}/stages`, {
        stage,
        notes,
      })
      toast.success("Stage updated.")
      setNoteSelections((prev) => ({ ...prev, [storeId]: "" }))
      await loadStores({ q: searchTerm.trim(), stage: stageFilter, reset: true })
      if (selectedStoreId === storeId) {
        await loadStages(storeId)
      }
    } catch (saveError) {
      toast.error("Could not update stage. Please try again.")
    }
  }

  const loadStages = async (storeId: string) => {
    try {
      const response = await getAdmin<{ stages: SalesStoreStage[] }>(
        `/admin/sales-stores/${storeId}/stages`
      )
      setStageHistory(response.stages || [])
      setSelectedStoreId(storeId)
    } catch (stageError) {
      toast.error("Could not load stage history.")
    }
  }

  const selectedStore = useMemo(
    () => stores.find((store) => store.id === selectedStoreId) || null,
    [stores, selectedStoreId]
  )

  const filteredStores = stores

  const stageCounts = useMemo(() => {
    const counts = STAGES.reduce<Record<string, number>>(
      (acc, stage) => ({ ...acc, [stage]: 0 }),
      {}
    )
    stores.forEach((store) => {
      if (store.stage && counts[store.stage] !== undefined) {
        counts[store.stage] += 1
      }
    })
    return counts
  }, [stores])

  const saveFilter = () => {
    const label = `${stageFilter === "all" ? "All" : formatStage(stageFilter)} · ${
      searchTerm.trim() || "Any"
    }`
    const entry = {
      id: `${Date.now()}`,
      label,
      term: searchTerm.trim(),
      stage: stageFilter,
    }
    const next = [entry, ...savedFilters].slice(0, 8)
    setSavedFilters(next)
    try {
      window.localStorage.setItem(savedFiltersKey, JSON.stringify(next))
    } catch (error) {
      // ignore storage errors
    }
    toast.success("Filter saved.")
  }

  const applySavedFilter = (filterId: string) => {
    const target = savedFilters.find((filter) => filter.id === filterId)
    if (!target) {
      return
    }
    setSearchTerm(target.term)
    setStageFilter(target.stage)
  }

  const removeSavedFilter = (filterId: string) => {
    const next = savedFilters.filter((filter) => filter.id !== filterId)
    setSavedFilters(next)
    try {
      window.localStorage.setItem(savedFiltersKey, JSON.stringify(next))
    } catch (error) {
      // ignore storage errors
    }
  }

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(filteredStores.map((store) => store.id)))
    } else {
      setSelectedIds(new Set())
    }
  }

  const toggleSelect = (storeId: string, checked: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (checked) {
        next.add(storeId)
      } else {
        next.delete(storeId)
      }
      return next
    })
  }

  const applyBulkStage = async () => {
    if (selectedIds.size === 0) {
      toast.error("Select at least one store to update.")
      return
    }

    try {
      await Promise.all(
        Array.from(selectedIds).map((storeId) =>
          postAdmin(`/admin/sales-stores/${storeId}/stages`, {
            stage: bulkStage,
            notes: bulkNotes || undefined,
          })
        )
      )
      toast.success("Updated stages for selected stores.")
      setBulkNotes("")
      await loadStores({ q: searchTerm.trim(), stage: stageFilter, reset: true })
      if (selectedStoreId) {
        await loadStages(selectedStoreId)
      }
    } catch (bulkError) {
      toast.error("Could not update some stages. Please try again.")
    }
  }

  const getNextStage = (stage?: string) => {
    if (!stage) {
      return "visited"
    }
    const index = STAGES.indexOf(stage)
    if (index === -1 || index === STAGES.length - 1) {
      return stage
    }
    return STAGES[index + 1]
  }

  const getPrevStage = (stage?: string) => {
    if (!stage) {
      return "discovered"
    }
    const index = STAGES.indexOf(stage)
    if (index <= 0) {
      return stage || "discovered"
    }
    return STAGES[index - 1]
  }

  const moveStage = async (storeId: string, stage: string) => {
    try {
      await postAdmin(`/admin/sales-stores/${storeId}/stages`, { stage })
      toast.success("Stage updated.")
      await loadStores({ q: searchTerm.trim(), stage: stageFilter, reset: true })
      if (selectedStoreId === storeId) {
        await loadStages(storeId)
      }
    } catch (error) {
      toast.error("Could not update stage.")
    }
  }

  const moveStageWithNote = async (storeId: string, stage: string) => {
    try {
      await postAdmin(`/admin/sales-stores/${storeId}/stages`, {
        stage,
      })
      toast.success("Stage updated.")
      await loadStores({ q: searchTerm.trim(), stage: stageFilter, reset: true })
      if (selectedStoreId === storeId) {
        await loadStages(storeId)
      }
    } catch (error) {
      toast.error("Could not update stage.")
    }
  }

  const moveStageWithInlineNote = async (
    storeId: string,
    stage: string,
    notes?: string
  ) => {
    try {
      await postAdmin(`/admin/sales-stores/${storeId}/stages`, {
        stage,
        notes: notes?.trim() || undefined,
      })
      toast.success("Stage updated.")
      setNoteSelections((prev) => ({ ...prev, [storeId]: "" }))
      await loadStores({ q: searchTerm.trim(), stage: stageFilter, reset: true })
      if (selectedStoreId === storeId) {
        await loadStages(storeId)
      }
    } catch (error) {
      toast.error("Could not update stage.")
    }
  }

  const exportCsv = () => {
    if (filteredStores.length === 0) {
      toast.error("No stores to export.")
      return
    }

    const headers = [
      "Name",
      "Address",
      "Stage",
      "Stage Updated",
      "Source",
      "Notes",
    ]

    const rows = filteredStores.map((store) => [
      store.name || "",
      store.address,
      store.stage || "",
      store.stage_updated_at || "",
      store.source || "",
      store.notes || "",
    ])

    const escapeValue = (value: string) => {
      const needsQuotes = /[",\n]/.test(value)
      const escaped = value.replace(/"/g, '""')
      return needsQuotes ? `"${escaped}"` : escaped
    }

    const csv = [headers, ...rows]
      .map((row) => row.map((value) => escapeValue(String(value))).join(","))
      .join("\n")

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "sales-stores.csv"
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
  }

  const addStore = async () => {
    if (!newStoreAddress.trim()) {
      toast.error("Please enter an address for the store.")
      return
    }

    try {
      await postAdmin("/admin/sales-stores/bulk", {
        stores: [
          {
            name: newStoreName.trim() || undefined,
            address: newStoreAddress.trim(),
            stage: newStoreStage,
            notes: newStoreNotes.trim() || undefined,
            source: "manual",
          },
        ],
      })
      toast.success("Store added.")
      setNewStoreName("")
      setNewStoreAddress("")
      setNewStoreNotes("")
      setNewStoreStage("discovered")
      await loadStores({ q: searchTerm.trim(), stage: stageFilter, reset: true })
    } catch (error) {
      toast.error("Could not add store. Please try again.")
    }
  }

  const addStoreFromSuggestion = async (address: string) => {
    try {
      await postAdmin("/admin/sales-stores/bulk", {
        stores: [
          {
            name: address.split(",")[0]?.trim() || undefined,
            address,
            stage: "discovered",
            source: "google_places",
          },
        ],
      })
      toast.success("Store added from Google search.")
      await loadStores({ q: searchTerm.trim(), stage: stageFilter, reset: true })
    } catch (error) {
      toast.error("Could not add store. Please try again.")
    }
  }

  return (
    <Container className="flex flex-col gap-6">
      <Toaster />
      <div className="flex items-center justify-between">
        <div>
          <Heading level="h1">Sales Stores</Heading>
          <Text size="small" className="text-ui-fg-subtle">
            Track account status and sales activity for retail partners.
          </Text>
        </div>
        <Button
          variant="secondary"
          onClick={() =>
            loadStores({ q: searchTerm.trim(), stage: stageFilter, reset: true })
          }
          isLoading={isLoading}
        >
          Refresh
        </Button>
      </div>

      {error && <Alert variant="error">{error}</Alert>}

      <Container className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {STAGES.map((stage) => (
            <button
              key={stage}
              type="button"
              className="rounded-md border border-ui-border-base p-3 text-left hover:bg-ui-bg-subtle"
              onClick={() => setStageFilter(stage)}
            >
              <Text size="xsmall" className="text-ui-fg-subtle">
                {formatStage(stage)}
              </Text>
              <Text size="small">{stageCounts[stage] || 0} stores</Text>
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_220px]">
          <div className="flex flex-col gap-2">
            <Text size="small" className="text-ui-fg-subtle">
              Search by store name or address
            </Text>
            <Input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search stores"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Text size="small" className="text-ui-fg-subtle">
              Filter by stage
            </Text>
            <Select
              value={stageFilter}
              onValueChange={(value) => setStageFilter(value)}
            >
              <Select.Trigger>
                <Select.Value placeholder="All stages" />
              </Select.Trigger>
              <Select.Content>
                <Select.Item value="all">All stages</Select.Item>
                {STAGES.map((stage) => (
                  <Select.Item key={stage} value={stage}>
                    {formatStage(stage)}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select>
          </div>
        </div>
        <Text size="small" className="text-ui-fg-subtle">
          Showing {filteredStores.length} of {totalCount || stores.length} stores
        </Text>
        {searchTerm.trim().length >= 3 && (
          <div className="rounded-md border border-ui-border-base p-3">
            <div className="flex items-center justify-between">
              <Text size="small" className="text-ui-fg-subtle">
                Google address suggestions
              </Text>
              {isSuggesting && (
                <Text size="xsmall" className="text-ui-fg-subtle">
                  Searching...
                </Text>
              )}
            </div>
            {suggestions.length === 0 && !isSuggesting ? (
              <Text size="small" className="text-ui-fg-subtle">
                No Google suggestions found. Try a different search.
              </Text>
            ) : (
              <div className="mt-2 flex flex-col gap-2">
                {suggestions.map((suggestion) => (
                  <div
                    key={suggestion.placeId}
                    className="flex items-center justify-between gap-3 rounded-md border border-ui-border-base px-2 py-2"
                  >
                    <Text size="small">{suggestion.text}</Text>
                    <Button
                      variant="secondary"
                      onClick={() => addStoreFromSuggestion(suggestion.text)}
                    >
                      Add store
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="secondary" onClick={saveFilter}>
            Save current filter
          </Button>
          <div className="flex items-center gap-2 rounded-md border border-ui-border-base p-1">
            <Button
              variant={viewMode === "list" ? "primary" : "secondary"}
              onClick={() => setViewMode("list")}
            >
              List view
            </Button>
            <Button
              variant={viewMode === "board" ? "primary" : "secondary"}
              onClick={() => setViewMode("board")}
            >
              Board view
            </Button>
          </div>
          {savedFilters.map((filter) => (
            <div
              key={filter.id}
              className="flex items-center gap-1 rounded-full border border-ui-border-base px-2 py-1 text-xs"
            >
              <button
                type="button"
                className="text-ui-fg-base"
                onClick={() => applySavedFilter(filter.id)}
              >
                {filter.label}
              </button>
              <button
                type="button"
                className="text-ui-fg-subtle"
                onClick={() => removeSavedFilter(filter.id)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </Container>

      <Container className="flex flex-col gap-4">
        <Heading level="h2">Add Sales Store</Heading>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Text size="small" className="text-ui-fg-subtle">
              Store name
            </Text>
            <Input
              value={newStoreName}
              onChange={(event) => setNewStoreName(event.target.value)}
              placeholder="Store or account name"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Text size="small" className="text-ui-fg-subtle">
              Address
            </Text>
            <Input
              value={newStoreAddress}
              onChange={(event) => setNewStoreAddress(event.target.value)}
              placeholder="Full address"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Text size="small" className="text-ui-fg-subtle">
              Stage
            </Text>
            <Select value={newStoreStage} onValueChange={setNewStoreStage}>
              <Select.Trigger>
                <Select.Value placeholder="Select stage" />
              </Select.Trigger>
              <Select.Content>
                {STAGES.map((stage) => (
                  <Select.Item key={stage} value={stage}>
                    {formatStage(stage)}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Text size="small" className="text-ui-fg-subtle">
              Notes
            </Text>
            <Textarea
              rows={2}
              value={newStoreNotes}
              onChange={(event) => setNewStoreNotes(event.target.value)}
              placeholder="Optional notes"
            />
          </div>
        </div>
        <div>
          <Button variant="secondary" onClick={addStore}>
            Add store
          </Button>
        </div>
      </Container>

      {stores.length < totalCount && (
        <div className="flex justify-center">
          <Button
            variant="secondary"
            isLoading={isLoadingMore}
            onClick={() =>
              loadStores({ q: searchTerm.trim(), stage: stageFilter })
            }
          >
            Load more
          </Button>
        </div>
      )}

      <Container className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <Text size="small" className="text-ui-fg-subtle">
            {selectedIds.size} selected
          </Text>
          <Select value={bulkStage} onValueChange={setBulkStage}>
            <Select.Trigger>
              <Select.Value placeholder="Stage" />
            </Select.Trigger>
            <Select.Content>
              {STAGES.map((stage) => (
                <Select.Item key={stage} value={stage}>
                  {formatStage(stage)}
                </Select.Item>
              ))}
            </Select.Content>
          </Select>
          <Input
            value={bulkNotes}
            onChange={(event) => setBulkNotes(event.target.value)}
            placeholder="Notes for selected stores"
          />
          <Button variant="secondary" onClick={applyBulkStage}>
            Apply stage
          </Button>
          <Button variant="secondary" onClick={exportCsv}>
            Export CSV
          </Button>
        </div>
      </Container>

      {viewMode === "list" ? (
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <Checkbox
                  checked={
                    filteredStores.length > 0 &&
                    selectedIds.size === filteredStores.length
                  }
                  onCheckedChange={(checked) =>
                    toggleSelectAll(checked === true)
                  }
                />
              </Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Address</Table.HeaderCell>
              <Table.HeaderCell>Stage</Table.HeaderCell>
              <Table.HeaderCell>Last Updated</Table.HeaderCell>
              <Table.HeaderCell>Time in Stage</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {filteredStores.map((store) => (
              <Table.Row key={store.id}>
                <Table.Cell>
                  <Checkbox
                    checked={selectedIds.has(store.id)}
                    onCheckedChange={(checked) =>
                      toggleSelect(store.id, checked === true)
                    }
                  />
                </Table.Cell>
                <Table.Cell>{store.name || "Unnamed"}</Table.Cell>
                <Table.Cell>{store.address}</Table.Cell>
                <Table.Cell>
                  <Badge color="blue">{formatStage(store.stage)}</Badge>
                </Table.Cell>
                <Table.Cell>
                  {store.stage_updated_at
                    ? new Date(store.stage_updated_at).toLocaleString()
                    : "-"}
                </Table.Cell>
                <Table.Cell>{daysSince(store.stage_updated_at)}</Table.Cell>
                <Table.Cell>
                  <div className="flex flex-col gap-2">
                    <Select
                      value={stageSelections[store.id] || store.stage || "visited"}
                      onValueChange={(value) =>
                        updateStageSelection(store.id, value)
                      }
                    >
                      <Select.Trigger>
                        <Select.Value placeholder="Select stage" />
                      </Select.Trigger>
                      <Select.Content>
                        {STAGES.map((stage) => (
                          <Select.Item key={stage} value={stage}>
                            {formatStage(stage)}
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select>
                    <Textarea
                      rows={2}
                      placeholder="Notes (optional)"
                      value={noteSelections[store.id] || ""}
                      onChange={(event) =>
                        updateNoteSelection(store.id, event.target.value)
                      }
                    />
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="secondary"
                        onClick={() => handleAddStage(store.id)}
                      >
                        Add stage
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => loadStages(store.id)}
                      >
                        View history
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => moveStage(store.id, getPrevStage(store.stage))}
                      >
                        Move back
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => moveStage(store.id, getNextStage(store.stage))}
                      >
                        Move next
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() =>
                          moveStageWithInlineNote(
                            store.id,
                            getNextStage(store.stage),
                            noteSelections[store.id]
                          )
                        }
                      >
                        Move + note
                      </Button>
                    </div>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {STAGES.map((stage) => {
            const stageStores = filteredStores.filter(
              (store) => (store.stage || "discovered") === stage
            )
            return (
              <Container key={stage} className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <Heading level="h2">{formatStage(stage)}</Heading>
                  <Badge color="blue">{stageStores.length}</Badge>
                </div>
                {stageStores.length === 0 ? (
                  <Text size="small" className="text-ui-fg-subtle">
                    No stores in this stage.
                  </Text>
                ) : (
                  <div className="flex flex-col gap-2">
                    {stageStores.map((store) => (
                      <div
                        key={store.id}
                        className="rounded-md border border-ui-border-base p-3"
                      >
                        <Text size="small">
                          {store.name || "Unnamed"}
                        </Text>
                        <Text size="xsmall" className="text-ui-fg-subtle">
                          {store.address}
                        </Text>
                        <Text size="xsmall" className="text-ui-fg-subtle">
                          In stage: {daysSince(store.stage_updated_at)}
                        </Text>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <Button
                            variant="secondary"
                            onClick={() =>
                              moveStage(store.id, getPrevStage(store.stage))
                            }
                          >
                            Back
                          </Button>
                          <Button
                            variant="secondary"
                            onClick={() =>
                              moveStage(store.id, getNextStage(store.stage))
                            }
                          >
                            Next
                          </Button>
                          <Button
                            variant="secondary"
                            onClick={() =>
                              moveStageWithInlineNote(
                                store.id,
                                getNextStage(store.stage),
                                noteSelections[store.id]
                              )
                            }
                          >
                            Next + note
                          </Button>
                          <Button
                            variant="secondary"
                            onClick={() => loadStages(store.id)}
                          >
                            History
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Container>
            )
          })}
        </div>
      )}

      {selectedStore && (
        <Container className="flex flex-col gap-3">
          <Heading level="h2">Stage history</Heading>
          <Text size="small" className="text-ui-fg-subtle">
            {selectedStore.name || "Unnamed"} · {selectedStore.address}
          </Text>
          {stageHistory.length === 0 ? (
            <Text size="small">No stage history recorded yet.</Text>
          ) : (
            <div className="flex flex-col gap-2">
              {stageHistory.map((stage) => (
                <div
                  key={stage.id}
                  className="rounded-md border border-ui-border-base p-3"
                >
                  <div className="flex items-center gap-2">
                    <Badge color="blue">{formatStage(stage.stage)}</Badge>
                    <Text size="xsmall" className="text-ui-fg-subtle">
                      {new Date(stage.occurred_at).toLocaleString()}
                    </Text>
                  </div>
                  {stage.notes && (
                    <Text size="small" className="text-ui-fg-subtle">
                      {stage.notes}
                    </Text>
                  )}
                  {stage.source && (
                    <Text size="xsmall" className="text-ui-fg-subtle">
                      Source: {stage.source}
                    </Text>
                  )}
                </div>
              ))}
            </div>
          )}
        </Container>
      )}
    </Container>
  )
}

export const config = defineRouteConfig({
  label: "Sales Stores",
  icon: BuildingStorefront,
})

export default SalesStoresPage
