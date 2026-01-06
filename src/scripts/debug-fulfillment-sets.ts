import { Modules } from "@medusajs/framework/utils"
import type { ExecArgs } from "@medusajs/framework/types"

export default async function debugFulfillmentSets({ container }: ExecArgs) {
  const fulfillmentModule = container.resolve(Modules.FULFILLMENT)

  const sets = await fulfillmentModule.listFulfillmentSets({})
  console.log(JSON.stringify(sets, null, 2))
}
