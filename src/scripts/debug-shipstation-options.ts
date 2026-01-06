import { Modules } from "@medusajs/framework/utils"
import type { ExecArgs } from "@medusajs/framework/types"

export default async function debugShipStation({ container }: ExecArgs) {
  const fulfillment = container.resolve(Modules.FULFILLMENT)
  const options = await fulfillment.retrieveFulfillmentOptions("shipstation_shipstation")
  console.log(JSON.stringify(options, null, 2))
}
