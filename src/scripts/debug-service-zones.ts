import { Modules } from "@medusajs/framework/utils"
import type { ExecArgs } from "@medusajs/framework/types"

export default async function debugServiceZones({ container }: ExecArgs) {
  const fulfillmentModule = container.resolve(Modules.FULFILLMENT)
  const zones = await fulfillmentModule.listServiceZones({})
  console.log(JSON.stringify(zones, null, 2))
}
