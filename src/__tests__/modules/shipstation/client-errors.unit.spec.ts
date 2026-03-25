/**
 * Focused tests for ShipStation client error normalization.
 *
 * Verifies that sendRequest (via public methods) always throws
 * ShipStationApiError with structured fields — never returns a raw
 * string or lets a non-JSON body slip through to callers.
 */
import { ShipStationClient } from "../../../modules/shipstation/client"
import { ShipStationApiError } from "../../../modules/shipstation/types"

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const buildClient = () =>
  new ShipStationClient({ api_key: "test_key_123" })

/**
 * Installs a mock fetch on globalThis for the duration of a single test.
 * Returns a cleanup function.
 */
function mockFetch(handler: (url: string, init?: any) => Promise<Response>) {
  const original = (globalThis as any).fetch
  ;(globalThis as any).fetch = handler
  return () => {
    ;(globalThis as any).fetch = original
  }
}

/** Convenience: build a minimal Response with JSON body */
function jsonResponse(body: object, status = 200, headers?: Record<string, string>): Response {
  const h = new Headers({ "content-type": "application/json", ...headers })
  return new Response(JSON.stringify(body), { status, headers: h })
}

/** Convenience: build a non-JSON Response (HTML, plain text, etc.) */
function textResponse(body: string, status = 502, headers?: Record<string, string>): Response {
  const h = new Headers({ "content-type": "text/html", ...headers })
  return new Response(body, { status, headers: h })
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("ShipStationClient error normalization", () => {
  let cleanup: () => void

  afterEach(() => {
    cleanup?.()
  })

  // ---- Network errors (DNS, timeout, socket) ----

  it("wraps network errors into ShipStationApiError", async () => {
    cleanup = mockFetch(() => {
      throw new TypeError("fetch failed")
    })

    const client = buildClient()
    await expect(client.getCarriers()).rejects.toThrow(ShipStationApiError)
    await expect(client.getCarriers()).rejects.toThrow(/network/)
  })

  // ---- Non-JSON responses (502 HTML, gateway timeout) ----

  it("throws ShipStationApiError with status for non-JSON response", async () => {
    cleanup = mockFetch(async () =>
      textResponse("<html>Bad Gateway</html>", 502, {
        "x-shipstation-request-id": "req_abc123",
      })
    )

    const client = buildClient()
    try {
      await client.getCarriers()
      throw new Error("should have thrown")
    } catch (err) {
      expect(err).toBeInstanceOf(ShipStationApiError)
      const apiErr = err as ShipStationApiError
      expect(apiErr.status).toBe(502)
      expect(apiErr.requestId).toBe("req_abc123")
      expect(apiErr.upstream).toContain("Bad Gateway")
      expect(apiErr.message).toContain("non-JSON")
    }
  })

  it("extracts x-request-id when x-shipstation-request-id is missing", async () => {
    cleanup = mockFetch(async () =>
      textResponse("Service Unavailable", 503, {
        "x-request-id": "fallback_id_456",
      })
    )

    const client = buildClient()
    try {
      await client.getWarehouses()
      throw new Error("should have thrown")
    } catch (err) {
      expect(err).toBeInstanceOf(ShipStationApiError)
      expect((err as ShipStationApiError).requestId).toBe("fallback_id_456")
    }
  })

  // ---- HTTP error with JSON error body ----

  it("throws ShipStationApiError for 4xx JSON error responses", async () => {
    cleanup = mockFetch(async () =>
      jsonResponse(
        { errors: [{ message: "Invalid carrier ID" }] },
        400,
        { "x-shipstation-request-id": "req_err_400" }
      )
    )

    const client = buildClient()
    try {
      await client.getCarriers()
      throw new Error("should have thrown")
    } catch (err) {
      expect(err).toBeInstanceOf(ShipStationApiError)
      const apiErr = err as ShipStationApiError
      expect(apiErr.status).toBe(400)
      expect(apiErr.requestId).toBe("req_err_400")
      expect(apiErr.message).toContain("Invalid carrier ID")
    }
  })

  it("handles 401 with a message field instead of errors array", async () => {
    cleanup = mockFetch(async () =>
      jsonResponse({ message: "Unauthorized" }, 401)
    )

    const client = buildClient()
    try {
      await client.getCarriers()
      throw new Error("should have thrown")
    } catch (err) {
      expect(err).toBeInstanceOf(ShipStationApiError)
      const apiErr = err as ShipStationApiError
      expect(apiErr.status).toBe(401)
      expect(apiErr.message).toContain("Unauthorized")
    }
  })

  // ---- 2xx JSON with embedded errors array (ShipStation domain error) ----

  it("throws ShipStationApiError for 200 response with errors array", async () => {
    cleanup = mockFetch(async () =>
      jsonResponse({
        errors: [{ message: "Weight exceeds carrier limit" }],
      })
    )

    const client = buildClient()
    try {
      await client.getCarriers()
      throw new Error("should have thrown")
    } catch (err) {
      expect(err).toBeInstanceOf(ShipStationApiError)
      const apiErr = err as ShipStationApiError
      expect(apiErr.status).toBe(200)
      expect(apiErr.message).toContain("Weight exceeds carrier limit")
    }
  })

  // ---- getShippingRates rate_response.errors ----

  it("throws ShipStationApiError for nested rate_response.errors", async () => {
    cleanup = mockFetch(async () =>
      jsonResponse({
        shipment_id: "shp_1",
        rate_response: {
          errors: [{ message: "No rates available for destination" }],
          rates: [],
        },
      })
    )

    const client = buildClient()
    const rateReq = {
      shipment: {} as any,
      rate_options: {
        carrier_ids: ["se-123"],
        service_codes: ["usps_priority"],
        preferred_currency: "usd",
      },
    }

    try {
      await client.getShippingRates(rateReq)
      throw new Error("should have thrown")
    } catch (err) {
      expect(err).toBeInstanceOf(ShipStationApiError)
      expect((err as ShipStationApiError).message).toContain(
        "No rates available for destination"
      )
    }
  })

  it("throws ShipStationApiError when rate_response.rates is empty", async () => {
    cleanup = mockFetch(async () =>
      jsonResponse({
        shipment_id: "shp_1",
        rate_response: {
          rates: [],
        },
      })
    )

    const client = buildClient()
    const rateReq = {
      shipment: {} as any,
      rate_options: {
        carrier_ids: ["se-123"],
        service_codes: ["usps_priority"],
        preferred_currency: "usd",
      },
    }

    try {
      await client.getShippingRates(rateReq)
      throw new Error("should have thrown")
    } catch (err) {
      expect(err).toBeInstanceOf(ShipStationApiError)
      expect((err as ShipStationApiError).message).toContain(
        "did not return any shipping rates"
      )
    }
  })

  // ---- Happy path still works ----

  it("returns parsed JSON on a successful 200 response", async () => {
    cleanup = mockFetch(async () =>
      jsonResponse({
        carriers: [
          {
            carrier_id: "se-123",
            disabled_by_billing_plan: false,
            friendly_name: "USPS",
            services: [{ service_code: "usps_priority", name: "Priority" }],
            packages: [],
          },
        ],
      })
    )

    const client = buildClient()
    const result = await client.getCarriers()
    expect(result.carriers).toHaveLength(1)
    expect(result.carriers[0].carrier_id).toBe("se-123")
  })

  // ---- Upstream snippet truncation ----

  it("truncates non-JSON body to 512 chars in upstream field", async () => {
    const longBody = "x".repeat(1024)
    cleanup = mockFetch(async () => textResponse(longBody, 500))

    const client = buildClient()
    try {
      await client.getCarriers()
      throw new Error("should have thrown")
    } catch (err) {
      expect(err).toBeInstanceOf(ShipStationApiError)
      const upstream = (err as ShipStationApiError).upstream || ""
      expect(upstream.length).toBeLessThanOrEqual(512)
    }
  })
})
