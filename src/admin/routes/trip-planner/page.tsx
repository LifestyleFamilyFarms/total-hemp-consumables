import { defineRouteConfig } from "@medusajs/admin-sdk"
import { MapPin } from "@medusajs/icons"
import {
  Button,
  Alert,
  Container,
  Heading,
  Input,
  Label,
  Select,
  Table,
  Text,
  Textarea,
  Checkbox,
  Badge,
  Toaster,
  toast,
} from "@medusajs/ui"
import { useEffect, useMemo, useRef, useState } from "react"
import { postAdmin } from "../../lib/sdk"

type TripStop = {
  order: number
  type: "START" | "MUST" | "OPTIONAL" | "END"
  name?: string
  address: string
  etaISO?: string
  departISO?: string
  serviceMinutes: number
}

type TripPlanResponse = {
  summary: {
    totalStops: number
    mustStops: number
    optionalStops: number
    totalDriveMinutesEstimate: number
    totalServiceMinutes: number
    fitsInWindow: boolean
    notes: string[]
  }
  stops: TripStop[]
  googleMapsSegments: Array<{
    label: string
    url: string
    stopCount: number
  }>
  csv: string
}

type AddressSuggestion = {
  placeId: string
  text: string
}

const buildTodayISO = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const day = String(now.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

const DEFAULT_KEYWORDS = ["THCa", "CBD store", "hemp store"].join("\n")

const fetchAddressSuggestions = async (
  query: string
): Promise<AddressSuggestion[]> => {
  const response = await fetch(
    `/admin/trip-planner/suggest?q=${encodeURIComponent(query)}`,
    {
      credentials: "include",
    }
  )

  if (!response.ok) {
    return []
  }

  const data = (await response.json()) as { suggestions?: AddressSuggestion[] }
  return data.suggestions || []
}

type AddressInputProps = {
  label: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
}

const AddressInput = ({ label, placeholder, value, onChange }: AddressInputProps) => {
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const debounceRef = useRef<number | null>(null)

  useEffect(() => {
    if (!value || value.trim().length < 3) {
      setSuggestions([])
      setIsOpen(false)
      return
    }

    if (debounceRef.current) {
      window.clearTimeout(debounceRef.current)
    }

    debounceRef.current = window.setTimeout(async () => {
      setIsLoading(true)
      const results = await fetchAddressSuggestions(value.trim())
      setSuggestions(results)
      setIsOpen(results.length > 0)
      setIsLoading(false)
    }, 300)

    return () => {
      if (debounceRef.current) {
        window.clearTimeout(debounceRef.current)
      }
    }
  }, [value])

  const handleSelect = (text: string) => {
    onChange(text)
    setIsOpen(false)
  }

  return (
    <div className="relative flex flex-col gap-2">
      <Label>{label}</Label>
      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        onFocus={() => {
          if (suggestions.length > 0) {
            setIsOpen(true)
          }
        }}
        onBlur={() => {
          window.setTimeout(() => setIsOpen(false), 150)
        }}
      />
      {isLoading && (
        <Text size="small" className="text-ui-fg-subtle">
          Searching addresses...
        </Text>
      )}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full z-10 w-full rounded-md border border-ui-border-base bg-ui-bg-base p-1 shadow-elevation-card">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion.placeId}
              type="button"
              className="w-full rounded px-2 py-1 text-left text-sm text-ui-fg-base hover:bg-ui-bg-subtle"
              onMouseDown={(event) => {
                event.preventDefault()
                handleSelect(suggestion.text)
              }}
            >
              {suggestion.text}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

const TripPlannerPage = () => {
  const [startAddress, setStartAddress] = useState("")
  const [endAddress, setEndAddress] = useState("")
  const [roundTrip, setRoundTrip] = useState(false)
  const [dateISO, setDateISO] = useState(buildTodayISO())
  const [startTime, setStartTime] = useState("08:00")
  const [endTime, setEndTime] = useState("17:00")
  const [maxOptionalStops, setMaxOptionalStops] = useState("2")
  const [optionalServiceMinutes, setOptionalServiceMinutes] = useState("15")
  const [exportWaypointLimit, setExportWaypointLimit] = useState("25")
  const [allowOptimizeMustStops, setAllowOptimizeMustStops] = useState(false)
  const [mustStops, setMustStops] = useState<
    Array<{ name: string; address: string; serviceMinutes: string }>
  >([{ name: "", address: "", serviceMinutes: "30" }])
  const [keywordsText, setKeywordsText] = useState(DEFAULT_KEYWORDS)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<TripPlanResponse | null>(null)

  const keywords = useMemo(
    () =>
      keywordsText
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
    [keywordsText]
  )

  const handleRoundTrip = (checked: boolean) => {
    setRoundTrip(checked)
    if (checked) {
      setEndAddress(startAddress)
    }
  }

  const handleStartAddressChange = (value: string) => {
    setStartAddress(value)
    if (roundTrip) {
      setEndAddress(value)
    }
  }

  const updateMustStop = (
    index: number,
    changes: Partial<{ name: string; address: string; serviceMinutes: string }>
  ) => {
    setMustStops((prev) =>
      prev.map((stop, idx) =>
        idx === index ? { ...stop, ...changes } : stop
      )
    )
  }

  const addMustStop = () => {
    setMustStops((prev) => [
      ...prev,
      { name: "", address: "", serviceMinutes: "30" },
    ])
  }

  const removeMustStop = (index: number) => {
    setMustStops((prev) => prev.filter((_, idx) => idx !== index))
  }

  const handleSubmit = async () => {
    setError(null)
    setResult(null)

    if (!startAddress.trim()) {
      setError("Please enter a start address so we can build the route.")
      return
    }

    if (!roundTrip && !endAddress.trim()) {
      setError("Please enter an end address (or enable round trip).")
      return
    }

    if (!dateISO || !startTime || !endTime) {
      setError("Please choose a trip date, start time, and end time.")
      return
    }

    setIsLoading(true)
    try {
      const response = await postAdmin<TripPlanResponse>(
        "/admin/trip-planner/plan",
        {
          startAddress: startAddress.trim(),
          endAddress: endAddress.trim() || startAddress.trim(),
          roundTrip,
          dateISO,
          startTime,
          endTime,
          mustStops: mustStops
            .map((stop) => ({
              name: stop.name.trim() || undefined,
              address: stop.address.trim(),
              serviceMinutes: Number(stop.serviceMinutes),
            }))
            .filter((stop) => stop.address.length > 0),
          maxOptionalStops: Number(maxOptionalStops),
          optionalServiceMinutes: Number(optionalServiceMinutes),
          keywords,
          exportWaypointLimit: Number(exportWaypointLimit),
          allowOptimizeMustStops,
        }
      )
      setResult(response)
    } catch (submitError) {
      const message =
        submitError instanceof Error
          ? submitError.message
          : "We couldn't plan the trip. Please try again."
      const lower = message.toLowerCase()
      if (lower.includes("missing google_maps_api_key")) {
        setError(
          "The Google Maps key is missing. Please contact an admin to configure it."
        )
      } else if (lower.includes("routes api error") || lower.includes("places api error")) {
        setError(
          "We couldn't reach Google Maps right now. Please try again in a few minutes."
        )
      } else {
        setError(message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const downloadCsv = () => {
    if (!result?.csv) {
      return
    }
    const blob = new Blob([result.csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `trip-itinerary-${dateISO}.csv`
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
  }

  const copyMapsLinks = async () => {
    if (!result?.googleMapsSegments.length) {
      return
    }

    const text = result.googleMapsSegments
      .map((segment) => `${segment.label}: ${segment.url}`)
      .join("\n")

    try {
      await navigator.clipboard.writeText(text)
      toast.success("Links copied to clipboard.")
    } catch (copyError) {
      toast.error(
        "We couldn't copy the links automatically. Use 'Show copy prompt' instead."
      )
    }
  }

  const openCopyPrompt = () => {
    if (!result?.googleMapsSegments.length) {
      return
    }

    const text = result.googleMapsSegments
      .map((segment) => `${segment.label}: ${segment.url}`)
      .join("\n")

    window.prompt("Copy the links below:", text)
  }

  return (
    <Container className="flex flex-col gap-6">
      <Toaster />
      <div>
        <Heading level="h1">Trip Planner</Heading>
        <Text size="small" className="text-ui-fg-subtle">
          Plan a sales trip with required stops and optional THCa/CBD store visits.
        </Text>
      </div>

      <Container className="flex flex-col gap-4">
        <Heading level="h2">Trip Details</Heading>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <AddressInput
            label="Start address"
            value={startAddress}
            onChange={handleStartAddressChange}
            placeholder="Enter start address"
          />
          <div className="flex flex-col gap-2">
            <Label>Round trip</Label>
            <div className="flex items-center gap-2">
              <Checkbox
                checked={roundTrip}
                onCheckedChange={(checked) =>
                  handleRoundTrip(checked === true)
                }
              />
              <Text size="small">End where you started</Text>
            </div>
          </div>
          {!roundTrip && (
            <AddressInput
              label="End address"
              value={endAddress}
              onChange={setEndAddress}
              placeholder="Enter end address"
            />
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="flex flex-col gap-2">
            <Label>Trip date</Label>
            <Input
              type="date"
              value={dateISO}
              onChange={(event) => setDateISO(event.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Start time</Label>
            <Input
              type="time"
              value={startTime}
              onChange={(event) => setStartTime(event.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>End time</Label>
            <Input
              type="time"
              value={endTime}
              onChange={(event) => setEndTime(event.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="flex flex-col gap-2">
            <Label>Max optional stops</Label>
            <Select
              value={maxOptionalStops}
              onValueChange={(value) => setMaxOptionalStops(value)}
            >
              <Select.Trigger>
                <Select.Value placeholder="Select max stops" />
              </Select.Trigger>
              <Select.Content>
                {Array.from({ length: 11 }, (_, index) => (
                  <Select.Item key={index} value={`${index}`}>
                    {index}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Optional stop service minutes</Label>
            <Select
              value={optionalServiceMinutes}
              onValueChange={(value) => setOptionalServiceMinutes(value)}
            >
              <Select.Trigger>
                <Select.Value placeholder="Select minutes" />
              </Select.Trigger>
              <Select.Content>
                {[5, 10, 15, 20].map((minutes) => (
                  <Select.Item key={minutes} value={`${minutes}`}>
                    {minutes}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Maps link waypoint limit</Label>
            <Select
              value={exportWaypointLimit}
              onValueChange={(value) => setExportWaypointLimit(value)}
            >
              <Select.Trigger>
                <Select.Value placeholder="Select limit" />
              </Select.Trigger>
              <Select.Content>
                {[3, 5, 9, 12, 15, 20, 25].map((limit) => (
                  <Select.Item key={limit} value={`${limit}`}>
                    {limit}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select>
            <Text size="small" className="text-ui-fg-subtle">
              Higher limits may split links if the URL gets too long.
            </Text>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Optimize must-stop order</Label>
            <div className="flex items-center gap-2">
              <Checkbox
                checked={allowOptimizeMustStops}
                onCheckedChange={(checked) =>
                  setAllowOptimizeMustStops(checked === true)
                }
              />
              <Text size="small">
                Let Google reorder required stops for a smoother route.
              </Text>
            </div>
          </div>
        </div>
      </Container>

      <Container className="flex flex-col gap-4">
        <Heading level="h2">Must-Visit Stores</Heading>
        <div className="flex flex-col gap-3">
          {mustStops.map((stop, index) => (
            <div
              key={`must-stop-${index}`}
              className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_1.5fr_160px_100px]"
            >
              <div className="flex flex-col gap-2">
                <Label>Stop name</Label>
                <Input
                  value={stop.name}
                  onChange={(event) =>
                    updateMustStop(index, { name: event.target.value })
                  }
                  placeholder="Account or store name"
                />
              </div>
              <AddressInput
                label="Address"
                value={stop.address}
                onChange={(value) => updateMustStop(index, { address: value })}
                placeholder="Enter must-visit address"
              />
              <div className="flex flex-col gap-2">
                <Label>Service minutes</Label>
                <Select
                  value={stop.serviceMinutes}
                  onValueChange={(value) =>
                    updateMustStop(index, { serviceMinutes: value })
                  }
                >
                  <Select.Trigger>
                    <Select.Value placeholder="Minutes" />
                  </Select.Trigger>
                  <Select.Content>
                    {[10, 15, 20, 30, 45, 60].map((minutes) => (
                      <Select.Item key={minutes} value={`${minutes}`}>
                        {minutes}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select>
              </div>
              <div className="flex items-end">
                <Button
                  variant="secondary"
                  onClick={() => removeMustStop(index)}
                  disabled={mustStops.length === 1}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div>
          <Button variant="secondary" onClick={addMustStop}>
            Add must stop
          </Button>
        </div>
      </Container>

      <Container className="flex flex-col gap-4">
        <Heading level="h2">Keywords</Heading>
        <div className="flex flex-col gap-2">
          <Label>One per line</Label>
          <Textarea
            value={keywordsText}
            onChange={(event) => setKeywordsText(event.target.value)}
            rows={4}
          />
          <Text size="small" className="text-ui-fg-subtle">
            We use these keywords to find optional THCa/CBD stores along the route.
          </Text>
        </div>
      </Container>

      <div className="flex flex-col gap-2">
        {error && (
          <Alert variant="error" dismissible>
            {error}
          </Alert>
        )}
        {error && (
          <Alert variant="info" dismissible>
            If Google Maps is unavailable or the API key is missing, contact your
            admin to update the Trip Planner settings.
          </Alert>
        )}
        <Button onClick={handleSubmit} isLoading={isLoading}>
          Plan Trip
        </Button>
      </div>

      {result && (
        <Container className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Heading level="h2">Itinerary Summary</Heading>
            <div className="flex flex-wrap items-center gap-2">
              <Text size="small">
                {result.summary.totalStops} total stops ·{" "}
                {result.summary.mustStops} must ·{" "}
                {result.summary.optionalStops} optional ·{" "}
                {result.summary.totalDriveMinutesEstimate} drive minutes ·{" "}
                {result.summary.totalServiceMinutes} service minutes
              </Text>
              {allowOptimizeMustStops &&
                result.summary.notes.some((note) =>
                  note.toLowerCase().includes("optimized")
                ) && <Badge color="green">Optimized order</Badge>}
            </div>
            <Text size="small">
              Fits in window: {result.summary.fitsInWindow ? "Yes" : "No"}
            </Text>
            {result.summary.notes.length > 0 && (
              <div className="flex flex-col gap-1">
                {result.summary.notes.map((note, index) => (
                  <Text key={`note-${index}`} size="small">
                    {note}
                  </Text>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Heading level="h2">Stops</Heading>
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Stop #</Table.HeaderCell>
                  <Table.HeaderCell>Type</Table.HeaderCell>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Address</Table.HeaderCell>
                  <Table.HeaderCell>ETA</Table.HeaderCell>
                  <Table.HeaderCell>Depart</Table.HeaderCell>
                  <Table.HeaderCell>Service</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {result.stops.map((stop) => (
                  <Table.Row key={`stop-${stop.order}`}>
                    <Table.Cell>{stop.order}</Table.Cell>
                    <Table.Cell>{stop.type}</Table.Cell>
                    <Table.Cell>{stop.name || "-"}</Table.Cell>
                    <Table.Cell>{stop.address}</Table.Cell>
                    <Table.Cell>{stop.etaISO || "-"}</Table.Cell>
                    <Table.Cell>{stop.departISO || "-"}</Table.Cell>
                    <Table.Cell>{stop.serviceMinutes} min</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>

          <div className="flex flex-col gap-2">
            <Heading level="h2">Google Maps Links</Heading>
            {result.googleMapsSegments.length > 1 && (
              <Text size="small" className="text-ui-fg-subtle">
                Multiple links were generated to stay under Google Maps URL limits.
              </Text>
            )}
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" onClick={copyMapsLinks}>
                Copy all links
              </Button>
              <Button variant="secondary" onClick={openCopyPrompt}>
                Show copy prompt
              </Button>
            </div>
            <div className="flex flex-col gap-1">
              {result.googleMapsSegments.map((segment) => (
                <a
                  key={segment.label}
                  href={segment.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-ui-fg-interactive"
                >
                  {segment.label} ({segment.stopCount} stops)
                </a>
              ))}
            </div>
          </div>

          <div>
            <Button variant="secondary" onClick={downloadCsv}>
              Download CSV
            </Button>
          </div>
        </Container>
      )}
    </Container>
  )
}

export const config = defineRouteConfig({
  label: "Trip Planner",
  icon: MapPin,
})

export default TripPlannerPage
