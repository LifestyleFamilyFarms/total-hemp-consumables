// @ts-nocheck
import { createShippingOptionsWorkflow } from "@medusajs/medusa/core-flows"
import type { ExecArgs } from "@medusajs/framework/types"

const SERVICE_ZONE_ID = "serzo_01K81AHC7EKD6SV824R2VEQK87"
const SHIPPING_PROFILE_ID = "sp_01K81AH8TQYCPJH84BNJZFH1K2"

export default async function createShipStationOption({ container }: ExecArgs) {
  const workflow = createShippingOptionsWorkflow(container)
  const { result } = await workflow.run({
    input: [
      {
        name: "ShipStation USPS Ground Advantage",
        provider_id: "shipstation_shipstation",
        price_type: "calculated",
        service_zone_id: SERVICE_ZONE_ID,
        shipping_profile_id: SHIPPING_PROFILE_ID,
        type: {
          label: "ShipStation USPS Ground Advantage",
          description: "USPS Ground Advantage via ShipStation",
          code: "shipstation_usps_ground_advantage",
        },
        data: {
          carrier_id: "se-3516060",
          carrier_service_code: "usps_ground_advantage",
        },
        prices: [],
      },
    ],
  })

  console.log(JSON.stringify(result, null, 2))
}
