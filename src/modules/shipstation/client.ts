import { Buffer } from "node:buffer"
import type { ShipStationOptions } from "./service"
import {
  CarriersResponse,
  WarehousesResponse,
  Label,
  GetShippingRatesRequest,
  GetShippingRatesResponse,
  RateResponse,
  Shipment,
  ShipStationApiError,
  VoidLabelResponse
} from "./types"

export class ShipStationClient {
  options: ShipStationOptions

  constructor(options: ShipStationOptions) {
    this.options = options
  }

  private buildAuthHeaders(): Record<string, string> {
    const { api_key, api_secret } = this.options

    if (!api_key) {
      throw new Error("ShipStation API key is required")
    }

    if (api_secret) {
      const token = Buffer.from(`${api_key}:${api_secret}`).toString("base64")
      return {
        Authorization: `Basic ${token}`,
      }
    }

    if (api_key.includes(":")) {
      const token = Buffer.from(api_key).toString("base64")
      return {
        Authorization: `Basic ${token}`,
      }
    }

    return {
      "api-key": api_key,
    }
  }

  /** Max bytes of non-JSON upstream body to include in error diagnostics */
  private static readonly UPSTREAM_SNIPPET_LIMIT = 512

  private async sendRequest(
    url: string,
    data?: {
      method?: string
      headers?: Record<string, string>
      body?: string
    }
  ): Promise<any> {
    const authHeaders = this.buildAuthHeaders()
    const fetchFn = (globalThis as typeof globalThis & { fetch: (...args: any[]) => Promise<any> }).fetch

    let resp: Response
    try {
      resp = await fetchFn(`https://api.shipstation.com/v2${url}`, {
        ...data,
        headers: {
          ...data?.headers,
          Accept: "application/json",
          "Content-Type": "application/json",
          ...authHeaders,
        },
      })
    } catch (networkErr: any) {
      // Network-level failure (DNS, timeout, socket reset)
      throw new ShipStationApiError({
        message: `ShipStation request failed (network): ${networkErr?.message || "unknown error"}`,
        upstream: String(networkErr?.cause || "").slice(0, ShipStationClient.UPSTREAM_SNIPPET_LIMIT) || undefined,
      })
    }

    const status = resp.status
    const requestId =
      resp.headers.get("x-shipstation-request-id") ||
      resp.headers.get("x-request-id") ||
      undefined

    const contentType = resp.headers.get("content-type")

    // --- Non-JSON response (HTML error page, 502 gateway, etc.) ---
    if (!contentType?.includes("application/json")) {
      const bodyText = (await resp.text()).slice(0, ShipStationClient.UPSTREAM_SNIPPET_LIMIT)
      throw new ShipStationApiError({
        message: `ShipStation returned non-JSON response (HTTP ${status})`,
        status,
        requestId,
        upstream: bodyText || undefined,
      })
    }

    const body = await resp.json()

    // --- HTTP error with JSON body ---
    if (!resp.ok) {
      const msgs = Array.isArray(body?.errors)
        ? body.errors.map((e: any) => e?.message || String(e)).join("; ")
        : body?.message || JSON.stringify(body).slice(0, ShipStationClient.UPSTREAM_SNIPPET_LIMIT)

      throw new ShipStationApiError({
        message: `ShipStation error (HTTP ${status}): ${msgs}`,
        status,
        requestId,
        upstream: msgs,
      })
    }

    // --- 2xx JSON but contains an errors array (ShipStation domain error) ---
    if (Array.isArray(body?.errors) && body.errors.length) {
      const msgs = body.errors.map((e: any) => e?.message || String(e)).join("; ")
      throw new ShipStationApiError({
        message: `ShipStation returned errors: ${msgs}`,
        status,
        requestId,
      })
    }

    return body
  }

  async getCarriers(): Promise<CarriersResponse> {
    return await this.sendRequest("/carriers")
  }

  async getWarehouses(): Promise<WarehousesResponse> {
    return await this.sendRequest("/warehouses")
  }

  async getShippingRates(
    data: GetShippingRatesRequest
  ): Promise<GetShippingRatesResponse> {
    const resp = await this.sendRequest("/rates", {
      method: "POST",
      body: JSON.stringify(data),
    })

    // rate_response may carry its own nested errors even on a 200
    const rateErrors = resp?.rate_response?.errors
    if (Array.isArray(rateErrors) && rateErrors.length) {
      const msgs = rateErrors.map((e: any) => e?.message || String(e)).join("; ")
      throw new ShipStationApiError({
        message: `ShipStation rate errors: ${msgs}`,
        status: 200,
        upstream: msgs,
      })
    }

    const rates = resp?.rate_response?.rates
    if (!Array.isArray(rates) || rates.length === 0) {
      throw new ShipStationApiError({
        message: "ShipStation did not return any shipping rates for this service.",
        status: 200,
      })
    }

    return resp
  }

  async getShipmentRates(id: string): Promise<RateResponse[]> {
    return await this.sendRequest(`/shipments/${id}/rates`)
  }

  //getShipment
  async getShipment(id: string): Promise<Shipment> {
    return await this.sendRequest(`/labels/shipment/${id}`)
  }

  //purchaseLabelForShipment
  async purchaseLabelForShipment(id: string): Promise<Label> {
    return await this.sendRequest(`/labels/shipment/${id}`, {
      method: "POST",
      body: JSON.stringify({}),
    })
  }

  //voidLabel

  async voidLabel(id: string): Promise<VoidLabelResponse> {
    return await this.sendRequest(`/labels/${id}/void`, {
      method: "PUT",
    })
  }

  //cancelShipment
  async cancelShipment(id: string): Promise<void> {
    return await this.sendRequest(`/shipments/${id}/cancel`, {
      method: "PUT",
    })
  }

  //MORE METHODS
  
}
