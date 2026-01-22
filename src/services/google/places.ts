type SearchPlacesInput = {
  query: string
  encodedPolyline: string
  apiKey: string
  maxResults?: number
}

export type PlaceCandidate = {
  id: string
  name: string
  address: string
  lat: number
  lng: number
}

const PLACES_URL = "https://places.googleapis.com/v1/places:searchText"
const PLACES_AUTOCOMPLETE_URL =
  "https://places.googleapis.com/v1/places:autocomplete"

const PLACES_FIELD_MASK =
  "places.id,places.displayName,places.formattedAddress,places.location"
const PLACES_AUTOCOMPLETE_FIELD_MASK =
  "suggestions.placePrediction.placeId,suggestions.placePrediction.text"

export async function searchPlacesAlongRoute({
  query,
  encodedPolyline,
  apiKey,
  maxResults = 20,
}: SearchPlacesInput): Promise<PlaceCandidate[]> {
  const body = {
    textQuery: query,
    maxResultCount: maxResults,
    searchAlongRouteParameters: {
      polyline: {
        encodedPolyline,
      },
    },
  }

  const response = await fetch(PLACES_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": PLACES_FIELD_MASK,
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(
      `Places API error (${response.status}): ${errorText || response.statusText}`
    )
  }

  const data = (await response.json()) as {
    places?: Array<{
      id?: string
      displayName?: { text?: string }
      formattedAddress?: string
      location?: { latitude?: number; longitude?: number }
    }>
  }

  const places = data.places || []

  return places
    .map((place) => {
      const id = place.id || ""
      const name = place.displayName?.text || ""
      const address = place.formattedAddress || ""
      const lat = place.location?.latitude
      const lng = place.location?.longitude

      if (!id || !address || typeof lat !== "number" || typeof lng !== "number") {
        return null
      }

      return {
        id,
        name,
        address,
        lat,
        lng,
      }
    })
    .filter((place): place is PlaceCandidate => Boolean(place))
}

export type PlaceSuggestion = {
  placeId: string
  text: string
}

export async function autocompletePlaces(
  input: string,
  apiKey: string
): Promise<PlaceSuggestion[]> {
  const body = {
    input,
  }

  const response = await fetch(PLACES_AUTOCOMPLETE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": PLACES_AUTOCOMPLETE_FIELD_MASK,
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(
      `Places API error (${response.status}): ${errorText || response.statusText}`
    )
  }

  const data = (await response.json()) as {
    suggestions?: Array<{
      placePrediction?: {
        placeId?: string
        text?: { text?: string }
      }
    }>
  }

  return (data.suggestions || [])
    .map((suggestion) => {
      const placeId = suggestion.placePrediction?.placeId || ""
      const text = suggestion.placePrediction?.text?.text || ""
      if (!placeId || !text) {
        return null
      }
      return { placeId, text }
    })
    .filter((suggestion): suggestion is PlaceSuggestion => Boolean(suggestion))
}
