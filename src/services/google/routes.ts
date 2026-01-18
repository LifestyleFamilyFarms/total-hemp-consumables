type ComputeRouteInput = {
  originAddress: string
  destinationAddress: string
  intermediateAddresses?: string[]
  departureTimeISO?: string
}

type RouteResult = {
  encodedPolyline: string | null
  legDurationsMinutes: number[]
  totalDriveMinutes: number
  legLocations: Array<{
    start: { lat: number; lng: number } | null
    end: { lat: number; lng: number } | null
  }>
}

const ROUTES_URL = "https://routes.googleapis.com/directions/v2:computeRoutes"

const ROUTES_FIELD_MASK =
  "routes.duration,routes.legs.duration,routes.legs.startLocation,routes.legs.endLocation,routes.polyline.encodedPolyline"

const toMinutes = (duration: unknown) => {
  if (!duration) {
    return 0
  }

  if (typeof duration === "string") {
    const seconds = Number(duration.replace("s", ""))
    return Number.isFinite(seconds) ? Math.ceil(seconds / 60) : 0
  }

  if (
    typeof duration === "object" &&
    duration !== null &&
    "seconds" in duration
  ) {
    const seconds = Number((duration as { seconds?: string | number }).seconds)
    if (!Number.isFinite(seconds)) {
      return 0
    }
    return Math.ceil(seconds / 60)
  }

  return 0
}

export async function computeRoute(
  input: ComputeRouteInput,
  apiKey: string
): Promise<RouteResult> {
  const { originAddress, destinationAddress, intermediateAddresses, departureTimeISO } =
    input

  const body = {
    origin: { address: originAddress },
    destination: { address: destinationAddress },
    intermediates: (intermediateAddresses || []).map((address) => ({
      address,
    })),
    travelMode: "DRIVE",
    routingPreference: "TRAFFIC_AWARE",
    polylineQuality: "OVERVIEW",
    polylineEncoding: "ENCODED_POLYLINE",
    ...(departureTimeISO ? { departureTime: departureTimeISO } : {}),
  }

  const response = await fetch(ROUTES_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": ROUTES_FIELD_MASK,
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(
      `Routes API error (${response.status}): ${errorText || response.statusText}`
    )
  }

  const data = (await response.json()) as {
    routes?: Array<{
      duration?: string | { seconds?: string | number }
      legs?: Array<{
        duration?: string | { seconds?: string | number }
        startLocation?: { latLng?: { latitude?: number; longitude?: number } }
        endLocation?: { latLng?: { latitude?: number; longitude?: number } }
      }>
      polyline?: { encodedPolyline?: string }
    }>
  }

  const route = data.routes?.[0]

  if (!route) {
    throw new Error("Routes API error: no routes returned.")
  }

  const legDurationsMinutes = (route.legs || []).map((leg) =>
    toMinutes(leg.duration)
  )

  const legLocations =
    route.legs?.map((leg) => {
      const startLat = leg.startLocation?.latLng?.latitude
      const startLng = leg.startLocation?.latLng?.longitude
      const endLat = leg.endLocation?.latLng?.latitude
      const endLng = leg.endLocation?.latLng?.longitude

      return {
        start:
          typeof startLat === "number" && typeof startLng === "number"
            ? { lat: startLat, lng: startLng }
            : null,
        end:
          typeof endLat === "number" && typeof endLng === "number"
            ? { lat: endLat, lng: endLng }
            : null,
      }
    }) || []

  const totalDriveMinutes =
    legDurationsMinutes.reduce((sum, minutes) => sum + minutes, 0) ||
    toMinutes(route.duration)

  return {
    encodedPolyline: route.polyline?.encodedPolyline || null,
    legDurationsMinutes,
    totalDriveMinutes,
    legLocations,
  }
}
