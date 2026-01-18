import { computeRoute } from "./google/routes"
import { PlaceCandidate, searchPlacesAlongRoute } from "./google/places"
import { addMinutes, diffMinutes, formatLocalISOString, parseLocalDateTime } from "../utils/time"
import { buildMapsSegments, MapsSegment } from "../utils/maps-url"
import { buildCsv } from "../utils/csv"

export type TripPlanRequest = {
  startAddress: string
  endAddress: string
  roundTrip: boolean
  dateISO: string
  startTime: string
  endTime: string
  mustStops: Array<{ address: string; serviceMinutes: number }>
  maxOptionalStops: number
  optionalServiceMinutes: number
  keywords: string[]
  exportWaypointLimit: number
}

export type TripPlanResponse = {
  summary: {
    totalStops: number
    mustStops: number
    optionalStops: number
    totalDriveMinutesEstimate: number
    totalServiceMinutes: number
    fitsInWindow: boolean
    notes: string[]
  }
  stops: Array<{
    order: number
    type: "START" | "MUST" | "OPTIONAL" | "END"
    name?: string
    address: string
    lat?: number
    lng?: number
    etaISO?: string
    departISO?: string
    serviceMinutes: number
  }>
  googleMapsSegments: MapsSegment[]
  csv: string
}

type PlannedStop = {
  type: "START" | "MUST" | "OPTIONAL" | "END"
  name?: string
  address: string
  lat?: number
  lng?: number
  serviceMinutes: number
}

type Coordinate = {
  lat: number
  lng: number
}

const MAX_OPTIONAL_CANDIDATES = 40

const haversineMeters = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
) => {
  const toRad = (value: number) => (value * Math.PI) / 180
  const earthRadius = 6371000
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) ** 2
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return earthRadius * c
}

const toMeters = (value: number) => value * (Math.PI / 180) * 6371000

const distancePointToSegmentMeters = (
  point: Coordinate,
  segmentStart: Coordinate,
  segmentEnd: Coordinate
) => {
  const latFactor = Math.cos(((segmentStart.lat + segmentEnd.lat) / 2) * (Math.PI / 180))
  const ax = toMeters(segmentStart.lng) * latFactor
  const ay = toMeters(segmentStart.lat)
  const bx = toMeters(segmentEnd.lng) * latFactor
  const by = toMeters(segmentEnd.lat)
  const px = toMeters(point.lng) * latFactor
  const py = toMeters(point.lat)

  const abx = bx - ax
  const aby = by - ay
  const apx = px - ax
  const apy = py - ay
  const abLenSq = abx * abx + aby * aby

  if (abLenSq === 0) {
    return Math.hypot(apx, apy)
  }

  const t = Math.max(0, Math.min(1, (apx * abx + apy * aby) / abLenSq))
  const closestX = ax + abx * t
  const closestY = ay + aby * t

  return Math.hypot(px - closestX, py - closestY)
}

const dedupeCandidates = (candidates: PlaceCandidate[]) => {
  const byId = new Map<string, PlaceCandidate>()
  const deduped: PlaceCandidate[] = []

  for (const candidate of candidates) {
    if (byId.has(candidate.id)) {
      continue
    }

    const nearMatch = deduped.find(
      (existing) =>
        haversineMeters(existing.lat, existing.lng, candidate.lat, candidate.lng) <
        30
    )

    if (nearMatch) {
      continue
    }

    byId.set(candidate.id, candidate)
    deduped.push(candidate)
  }

  return deduped
}

const normalizeAddress = (address: string) =>
  address.trim().toLowerCase().replace(/\s+/g, " ")

const buildTimeline = (
  stops: PlannedStop[],
  legDurationsMinutes: number[],
  startDateTime: Date
) => {
  const timeline: Array<{
    etaISO: string
    departISO: string
  }> = []

  let cursor = startDateTime
  stops.forEach((stop, index) => {
    if (index === 0) {
      const eta = formatLocalISOString(cursor)
      const depart = formatLocalISOString(addMinutes(cursor, stop.serviceMinutes))
      timeline.push({ etaISO: eta, departISO: depart })
      cursor = addMinutes(cursor, stop.serviceMinutes)
      return
    }

    const travelMinutes = legDurationsMinutes[index - 1] || 0
    cursor = addMinutes(cursor, travelMinutes)
    const eta = formatLocalISOString(cursor)
    cursor = addMinutes(cursor, stop.serviceMinutes)
    const depart = formatLocalISOString(cursor)
    timeline.push({ etaISO: eta, departISO: depart })
  })

  return timeline
}

export const planTrip = async (
  request: TripPlanRequest
): Promise<TripPlanResponse> => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY
  if (!apiKey) {
    throw new Error("Missing GOOGLE_MAPS_API_KEY. Configure it in the environment.")
  }

  const notes: string[] = []
  const startAddress = request.startAddress.trim()
  const endAddress = request.roundTrip
    ? startAddress
    : request.endAddress.trim()

  const mustStops = request.mustStops
    .map((stop) => ({
      address: stop.address.trim(),
      serviceMinutes: stop.serviceMinutes,
    }))
    .filter((stop) => stop.address.length > 0)

  const departureTimeISO = formatLocalISOString(
    parseLocalDateTime(request.dateISO, request.startTime)
  )

  const baseRoute = await computeRoute(
    {
      originAddress: startAddress,
      destinationAddress: endAddress,
      intermediateAddresses: mustStops.map((stop) => stop.address),
      departureTimeISO,
    },
    apiKey
  )

  let optionalCandidates: PlaceCandidate[] = []

  if (request.maxOptionalStops > 0 && baseRoute.encodedPolyline) {
    try {
      const keywordResults = await Promise.all(
        request.keywords.map((keyword) =>
          searchPlacesAlongRoute({
            query: keyword,
            encodedPolyline: baseRoute.encodedPolyline!,
            apiKey,
            maxResults: 20,
          })
        )
      )

      optionalCandidates = dedupeCandidates(keywordResults.flat())
    } catch (error) {
      notes.push(
        "Optional stop discovery failed. Planned route will include must-stop locations only."
      )
    }
  }

  if (optionalCandidates.length > MAX_OPTIONAL_CANDIDATES) {
    optionalCandidates = optionalCandidates.slice(0, MAX_OPTIONAL_CANDIDATES)
  }

  const normalizedMustAddresses = mustStops.map((stop) =>
    normalizeAddress(stop.address)
  )

  optionalCandidates = optionalCandidates.filter((candidate) => {
    const normalized = normalizeAddress(candidate.address)
    return !normalizedMustAddresses.some((mustAddress) =>
      normalized.includes(mustAddress)
    )
  })

  const selectedOptional = optionalCandidates
    .slice(0, request.maxOptionalStops)
    .map((candidate) => ({
      type: "OPTIONAL" as const,
      name: candidate.name,
      address: candidate.address,
      lat: candidate.lat,
      lng: candidate.lng,
      serviceMinutes: request.optionalServiceMinutes,
    }))

  const baseStops: PlannedStop[] = [
    {
      type: "START",
      address: startAddress,
      serviceMinutes: 0,
    },
    ...mustStops.map((stop) => ({
      type: "MUST" as const,
      address: stop.address,
      serviceMinutes: stop.serviceMinutes,
    })),
    {
      type: "END",
      address: endAddress,
      serviceMinutes: 0,
    },
  ]

  const baseCoordinates: Coordinate[] = []
  if (baseRoute.legLocations.length === baseStops.length - 1) {
    for (let i = 0; i < baseRoute.legLocations.length; i += 1) {
      const leg = baseRoute.legLocations[i]
      if (!leg.start || !leg.end) {
        baseCoordinates.length = 0
        break
      }
      if (i === 0) {
        baseCoordinates.push(leg.start)
      }
      baseCoordinates.push(leg.end)
    }
  }

  const buildFinalStops = (optionalCount: number) => {
    const optionalSlice = selectedOptional.slice(0, optionalCount)
    let orderedStops: PlannedStop[] = [
      baseStops[0],
      ...optionalSlice,
      ...baseStops.slice(1),
    ]

    if (baseCoordinates.length === baseStops.length) {
      const segmentBuckets: Array<
        Array<{ stop: PlannedStop; position: number }>
      > = Array.from({ length: baseStops.length - 1 }, () => [])

      optionalSlice.forEach((stop) => {
        if (typeof stop.lat !== "number" || typeof stop.lng !== "number") {
          return
        }

        let bestIndex = 0
        let bestDistance = Number.POSITIVE_INFINITY
        let bestPosition = 0

        baseCoordinates.forEach((coord, index) => {
          if (index === baseCoordinates.length - 1) {
            return
          }
          const next = baseCoordinates[index + 1]
          const distance = distancePointToSegmentMeters(
            { lat: stop.lat!, lng: stop.lng! },
            coord,
            next
          )

          if (distance < bestDistance) {
            bestDistance = distance
            bestIndex = index
            const segmentLength = haversineMeters(
              coord.lat,
              coord.lng,
              next.lat,
              next.lng
            )
            const fromStart = haversineMeters(
              coord.lat,
              coord.lng,
              stop.lat!,
              stop.lng!
            )
            bestPosition = segmentLength > 0 ? fromStart / segmentLength : 0
          }
        })

        segmentBuckets[bestIndex].push({ stop, position: bestPosition })
      })

      orderedStops = [baseStops[0]]
      segmentBuckets.forEach((bucket, index) => {
        const sortedOptional = bucket
          .sort((a, b) => a.position - b.position)
          .map((entry) => entry.stop)
        orderedStops.push(...sortedOptional, baseStops[index + 1])
      })
    }

    return orderedStops
  }

  let finalStops = buildFinalStops(selectedOptional.length)

  let legDurationsMinutes: number[] = []
  let totalDriveMinutes = 0

  let optionalToTry = selectedOptional.length

  while (true) {
    try {
      const intermediates = finalStops.slice(1, -1).map((stop) => stop.address)
      const route = await computeRoute(
        {
          originAddress: startAddress,
          destinationAddress: endAddress,
          intermediateAddresses: intermediates,
          departureTimeISO,
        },
        apiKey
      )
      legDurationsMinutes = route.legDurationsMinutes
      totalDriveMinutes = route.totalDriveMinutes
      break
    } catch (error) {
      if (optionalToTry > 0) {
        optionalToTry -= 1
        notes.push(
          "Dropped an optional stop to satisfy routing limits. Reduce optional stops if you want to keep all candidates."
        )
        finalStops = buildFinalStops(optionalToTry)
        continue
      }
      throw error
    }
  }

  const startDateTime = parseLocalDateTime(request.dateISO, request.startTime)
  const endDateTime = parseLocalDateTime(request.dateISO, request.endTime)
  const windowMinutes = diffMinutes(startDateTime, endDateTime)

  const totalServiceMinutes = finalStops.reduce(
    (sum, stop) => sum + stop.serviceMinutes,
    0
  )

  const totalTripMinutes = totalDriveMinutes + totalServiceMinutes
  const fitsInWindow = totalTripMinutes <= windowMinutes

  const timeline = buildTimeline(finalStops, legDurationsMinutes, startDateTime)

  const stopsWithTiming = finalStops.map((stop, index) => ({
    order: index + 1,
    type: stop.type,
    name: stop.name,
    address: stop.address,
    lat: stop.lat,
    lng: stop.lng,
    etaISO: timeline[index]?.etaISO,
    departISO: timeline[index]?.departISO,
    serviceMinutes: stop.serviceMinutes,
  }))

  const googleMapsSegments = buildMapsSegments(
    finalStops.map((stop) => ({ address: stop.address })),
    request.exportWaypointLimit || 25
  )

  const csv = buildCsv(
    ["Stop #", "Type", "Name", "Address", "ETA", "Depart", "Service Minutes"],
    stopsWithTiming.map((stop) => [
      stop.order,
      stop.type,
      stop.name || "",
      stop.address,
      stop.etaISO || "",
      stop.departISO || "",
      stop.serviceMinutes,
    ])
  )

  return {
    summary: {
      totalStops: finalStops.length,
      mustStops: mustStops.length,
      optionalStops: finalStops.filter((stop) => stop.type === "OPTIONAL").length,
      totalDriveMinutesEstimate: totalDriveMinutes,
      totalServiceMinutes,
      fitsInWindow,
      notes,
    },
    stops: stopsWithTiming,
    googleMapsSegments,
    csv,
  }
}
