type MapStop = {
  address: string
}

export type MapsSegment = {
  label: string
  url: string
  stopCount: number
}

const MAX_URL_LENGTH = 2000

const buildUrl = (origin: string, destination: string, waypoints: string[]) => {
  const params = new URLSearchParams({
    api: "1",
    origin,
    destination,
    travelmode: "driving",
  })

  if (waypoints.length) {
    params.set("waypoints", waypoints.join("|"))
  }

  return `https://www.google.com/maps/dir/?${params.toString()}`
}

export const buildMapsSegments = (
  stops: MapStop[],
  waypointLimit: number
): MapsSegment[] => {
  if (stops.length < 2) {
    return []
  }

  const segments: MapsSegment[] = []
  let segmentIndex = 0
  let cursor = 0

  while (cursor < stops.length - 1) {
    let endIndex = Math.min(cursor + waypointLimit + 1, stops.length - 1)
    let url = ""

    while (endIndex > cursor) {
      const waypoints = stops
        .slice(cursor + 1, endIndex)
        .map((stop) => stop.address)

      url = buildUrl(
        stops[cursor].address,
        stops[endIndex].address,
        waypoints
      )

      if (url.length <= MAX_URL_LENGTH) {
        break
      }

      endIndex -= 1
    }

    segments.push({
      label: `Segment ${segmentIndex + 1}`,
      url,
      stopCount: endIndex - cursor + 1,
    })

    segmentIndex += 1
    cursor = endIndex
  }

  return segments
}
