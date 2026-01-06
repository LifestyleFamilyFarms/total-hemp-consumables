import { Modules } from "@medusajs/framework/utils"
import type { ExecArgs } from "@medusajs/framework/types"

export default async function debugShippingProfiles({ container }: ExecArgs) {
  const fulfillmentModule = container.resolve(Modules.FULFILLMENT)
  const profiles = await fulfillmentModule.listShippingProfiles({})
  console.log(JSON.stringify(profiles, null, 2))
}
