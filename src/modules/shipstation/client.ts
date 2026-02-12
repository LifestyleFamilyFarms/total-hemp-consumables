import { Buffer } from "node:buffer"
import type { ShipStationOptions } from "./service"
import { MedusaError } from "@medusajs/framework/utils"
import {
  CarriersResponse,
  WarehousesResponse,
  Label,
  GetShippingRatesRequest,
  GetShippingRatesResponse,
  RateResponse,
  Shipment,
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

    return fetchFn(`https://api.shipstation.com/v2${url}`, {
      ...data,
      headers: {
        ...data?.headers,
        Accept: "application/json",
        "Content-Type": "application/json",
        ...authHeaders,
      },
    }).then((resp) => {
      const contentType = resp.headers.get("content-type")
      if (!contentType?.includes("application/json")) {
        return resp.text()
      }

      return resp.json()
    })
    .then((resp) => {
      if (typeof resp !== "string" && resp.errors?.length) {
        throw new MedusaError(
          MedusaError.Types.INVALID_DATA,
          `An error occured while sending a request to ShipStation: ${
            resp.errors.map((error) => error.message)
          }`
        )
      }

      return resp
    })
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
    return await this.sendRequest("/rates", {
      method: "POST",
      body: JSON.stringify(data),
    }).then((resp) => {
      const errors = resp?.rate_response?.errors || resp?.errors
      if (Array.isArray(errors) && errors.length) {
        throw new MedusaError(
          MedusaError.Types.INVALID_DATA,
          `An error occured while retrieving rates from ShipStation: ${errors
            .map((error: any) => error?.message || error)
            .join(", ")}`
        )
      }

      const rates = resp?.rate_response?.rates
      if (!Array.isArray(rates) || rates.length === 0) {
        throw new MedusaError(
          MedusaError.Types.INVALID_DATA,
          "ShipStation did not return any shipping rates for this service."
        )
      }

      return resp
    })
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
