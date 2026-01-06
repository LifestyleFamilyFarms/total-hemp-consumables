import { Modules } from "@medusajs/framework/utils"
import type { ExecArgs } from "@medusajs/framework/types"

export default async function debugRegionFulfillment({ container }: ExecArgs) {
  const regionModule = container.resolve(Modules.REGION)
  const regions = await regionModule.listRegions({}, { relations: ["fulfillment_providers"] })
  console.log(JSON.stringify(regions, null, 2))
}
