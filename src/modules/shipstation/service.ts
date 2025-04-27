import { AbstractFulfillmentProviderService } from "@medusajs/framework/utils"
import { ShipStationClient } from './client'
import { FulfillmentOption } from "@medusajs/framework/types"

export type ShipStationOptions = {
  api_key: string
}

class ShipStationProviderService extends AbstractFulfillmentProviderService {
  static identifier = "shipstation"
  protected options_: ShipStationOptions
  protected client: ShipStationClient

  constructor({}, options: ShipStationOptions) {
    super()

    this.options_ = options
    this.client = new ShipStationClient(options)
  }

  async getFulfillmentOptions(): Promise<FulfillmentOptions[]> {
    const { carriers } = await this.client.getCarriers()
    const fulfillmentOptions: FulfillmentOption[] = []

    carriers.filter((carrier) => !carrier.disabled_by_billing_plan)
    .forEach((carrier) => {
      carrier.services.forEach((service) => {
        fulfillmentOptions.push({
          id: `${carrier.carrier_id}__${service.service_code}`,
          name: service.name,
          carrier_id: carrier.carrier_id,
          carrier_service_code: service.service_code
        })
      })
    })

    return fulfillmentOptions
  }

  // TODO add methods
}

export default ShipStationProviderService