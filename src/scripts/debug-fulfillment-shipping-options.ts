// @ts-nocheck
import { Modules } from "@medusajs/framework/utils"
import type { ExecArgs } from "@medusajs/framework/types"

export default async function debugFulfillmentShippingOptions({ container }: ExecArgs) {
  const fulfillmentModule = container.resolve(Modules.FULFILLMENT)

  const options = await fulfillmentModule.listShippingOptions(
    { provider_id: ["shipstation_shipstation"] },
    { withDeleted: true }
  )
  console.log(JSON.stringify(options, null, 2))
}
