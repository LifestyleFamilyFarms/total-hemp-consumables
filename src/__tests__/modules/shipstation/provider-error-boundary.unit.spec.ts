/**
 * Tests that the ShipStation provider service converts ShipStationApiError
 * into MedusaError so Medusa returns structured HTTP responses
 * instead of raw 500s with string bodies.
 */
import { MedusaError } from "@medusajs/framework/utils"
import { ShipStationApiError } from "../../../modules/shipstation/types"

// We import the default export (the class) so we can instantiate it
// with a mock client to isolate the error-boundary behavior.
import ShipStationProviderService from "../../../modules/shipstation/service"

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function buildProvider(clientOverrides: Record<string, jest.Mock> = {}) {
  const provider = new (ShipStationProviderService as any)(
    {},
    { api_key: "test_key_123" }
  )

  // Patch client methods with mocks
  Object.assign(provider.client, clientOverrides)

  return provider as InstanceType<typeof ShipStationProviderService>
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("ShipStationProviderService error boundary", () => {
  it("converts ShipStationApiError into MedusaError in getFulfillmentOptions", async () => {
    const provider = buildProvider({
      getCarriers: jest.fn().mockRejectedValue(
        new ShipStationApiError({
          message: "ShipStation returned non-JSON response (HTTP 502)",
          status: 502,
          requestId: "req_abc",
          upstream: "<html>Bad Gateway</html>",
        })
      ),
    })

    try {
      await provider.getFulfillmentOptions()
      throw new Error("should have thrown")
    } catch (err) {
      expect(err).toBeInstanceOf(MedusaError)
      const medusaErr = err as MedusaError
      expect(medusaErr.message).toContain("HTTP 502")
      expect(medusaErr.message).toContain("req_abc")
      expect(medusaErr.message).toContain("Bad Gateway")
    }
  })

  it("preserves MedusaError thrown from within createShipment", async () => {
    const provider = buildProvider()

    // calculatePrice calls createShipment which validates from_address
    // and throws MedusaError directly — that should pass through unchanged.
    try {
      await provider.calculatePrice(
        { carrier_id: "se-1", carrier_service_code: "usps_priority" },
        {},
        {
          // Missing from_location.address should trigger MedusaError
          from_location: { name: "Warehouse" },
          shipping_address: {
            first_name: "Test",
            last_name: "User",
            address_1: "123 Main",
            city: "NY",
            province: "NY",
            postal_code: "10001",
            country_code: "US",
          },
          items: [],
          currency_code: "usd",
        }
      )
      throw new Error("should have thrown")
    } catch (err) {
      expect(err).toBeInstanceOf(MedusaError)
      expect((err as MedusaError).message).toContain("from_location.address is required")
    }
  })

  it("converts ShipStationApiError into MedusaError in cancelFulfillment", async () => {
    const provider = buildProvider({
      voidLabel: jest.fn().mockRejectedValue(
        new ShipStationApiError({
          message: "ShipStation error (HTTP 404): Label not found",
          status: 404,
          requestId: "req_void_404",
        })
      ),
    })

    try {
      await provider.cancelFulfillment({
        label_id: "lbl_1",
        shipment_id: "shp_1",
      })
      throw new Error("should have thrown")
    } catch (err) {
      expect(err).toBeInstanceOf(MedusaError)
      expect((err as MedusaError).message).toContain("Label not found")
      expect((err as MedusaError).message).toContain("req_void_404")
    }
  })

  it("wraps unexpected non-ShipStation errors as UNEXPECTED_STATE", async () => {
    const provider = buildProvider({
      getCarriers: jest.fn().mockRejectedValue(
        new TypeError("Cannot read properties of undefined")
      ),
    })

    try {
      await provider.getFulfillmentOptions()
      throw new Error("should have thrown")
    } catch (err) {
      expect(err).toBeInstanceOf(MedusaError)
      expect((err as MedusaError).message).toContain("Unexpected ShipStation error")
      expect((err as MedusaError).message).toContain("Cannot read properties")
    }
  })
})
