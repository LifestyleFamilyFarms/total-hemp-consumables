import { defineRouteConfig } from "@medusajs/admin-sdk"
import { MapPin } from "@medusajs/icons"
import {
  Button,
  Container,
  Heading,
  Input,
  Label,
  Select,
  Table,
  Text,
  Textarea,
  Checkbox,
} from "@medusajs/ui"
import { useMemo, useState } from "react"
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

const buildTodayISO = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const day = String(now.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

const DEFAULT_KEYWORDS = ["THCa", "CBD store", "hemp store"].join("\n")

const TripPlannerPage = () => {
  const [startAddress, setStartAddress] = useState("")
  const [endAddress, setEndAddress] = useState("")
  const [roundTrip, setRoundTrip] = useState(false)
  const [dateISO, setDateISO] = useState(buildTodayISO())
  const [startTime, setStartTime] = useState("08:00")
  const [endTime, setEndTime] = useState("17:00")
  const [maxOptionalStops, setMaxOptionalStops] = useState("2")
  const [optionalServiceMinutes, setOptionalServiceMinutes] = useState("15")
  const [mustStops, setMustStops] = useState<
    Array<{ address: string; serviceMinutes: string }>
  >([{ address: "", serviceMinutes: "30" }])
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
    changes: Partial<{ address: string; serviceMinutes: string }>
  ) => {
    setMustStops((prev) =>
      prev.map((stop, idx) =>
        idx === index ? { ...stop, ...changes } : stop
      )
    )
  }

  const addMustStop = () => {
    setMustStops((prev) => [...prev, { address: "", serviceMinutes: "30" }])
  }

  const removeMustStop = (index: number) => {
    setMustStops((prev) => prev.filter((_, idx) => idx !== index))
  }

  const handleSubmit = async () => {
    setError(null)
    setResult(null)

    if (!startAddress.trim()) {
      setError("Start address is required.")
      return
    }

    if (!roundTrip && !endAddress.trim()) {
      setError("End address is required.")
      return
    }

    if (!dateISO || !startTime || !endTime) {
      setError("Trip date, start time, and end time are required.")
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
              address: stop.address.trim(),
              serviceMinutes: Number(stop.serviceMinutes),
            }))
            .filter((stop) => stop.address.length > 0),
          maxOptionalStops: Number(maxOptionalStops),
          optionalServiceMinutes: Number(optionalServiceMinutes),
          keywords,
          exportWaypointLimit: 25,
        }
      )
      setResult(response)
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Failed to plan trip."
      )
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

  return (
    <Container className="flex flex-col gap-6">
      <div>
        <Heading level="h1">Trip Planner</Heading>
        <Text size="small" className="text-ui-fg-subtle">
          Plan a sales trip with required stops and optional THCa/CBD store visits.
        </Text>
      </div>

      <Container className="flex flex-col gap-4">
        <Heading level="h2">Trip Details</Heading>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label>Start address</Label>
            <Input
              value={startAddress}
              onChange={(event) => handleStartAddressChange(event.target.value)}
              placeholder="Enter start address"
            />
          </div>
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
            <div className="flex flex-col gap-2">
              <Label>End address</Label>
              <Input
                value={endAddress}
                onChange={(event) => setEndAddress(event.target.value)}
                placeholder="Enter end address"
              />
            </div>
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

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
        </div>
      </Container>

      <Container className="flex flex-col gap-4">
        <Heading level="h2">Must-Visit Stores</Heading>
        <div className="flex flex-col gap-3">
          {mustStops.map((stop, index) => (
            <div
              key={`must-stop-${index}`}
              className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_160px_100px]"
            >
              <div className="flex flex-col gap-2">
                <Label>Address</Label>
                <Input
                  value={stop.address}
                  onChange={(event) =>
                    updateMustStop(index, { address: event.target.value })
                  }
                  placeholder="Enter must-visit address"
                />
              </div>
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
        {error && <Text className="text-ui-fg-error">{error}</Text>}
        <Button onClick={handleSubmit} isLoading={isLoading}>
          Plan Trip
        </Button>
      </div>

      {result && (
        <Container className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Heading level="h2">Itinerary Summary</Heading>
            <Text size="small">
              {result.summary.totalStops} total stops ·{" "}
              {result.summary.mustStops} must ·{" "}
              {result.summary.optionalStops} optional ·{" "}
              {result.summary.totalDriveMinutesEstimate} drive minutes ·{" "}
              {result.summary.totalServiceMinutes} service minutes
            </Text>
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
