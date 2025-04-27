import { AbstractFulfillmentProviderService } from "@medusajs/framework/utils"
import { ShipStationClient } from './client'

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

  // TODO add methods
}

export default ShipStationProviderService