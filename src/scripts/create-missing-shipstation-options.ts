// @ts-nocheck
import slugify from "slugify"
import { Modules } from "@medusajs/framework/utils"
import type { ExecArgs } from "@medusajs/framework/types"

const SERVICE_ZONE_ID = "serzo_01K8KJYK7TNY65PTBCSHDZ705E"
const SHIPPING_PROFILE_ID = "sp_01K81AH8TQYCPJH84BNJZFH1K2"
const PROVIDER_ID = "shipstation_shipstation"

const makeCode = (carrierId: string = "carrier", serviceCode: string = "service") =>
  `shipstation_${slugify(carrierId)}_${slugify(serviceCode)}`

export default async function createMissingShipstationOptions({
  container,
}: ExecArgs) {
  const fulfillmentModule = container.resolve(Modules.FULFILLMENT)

  const services = await fulfillmentModule
    .retrieveFulfillmentOptions(PROVIDER_ID)
    .catch(() => [])

  if (!services?.length) {
    console.warn("[create-missing-shipstation-options] No ShipStation services returned; aborting")
    return
  }

  const existing = await fulfillmentModule
    .listShippingOptions({ provider_id: [PROVIDER_ID] }, { withDeleted: true })
    .catch(() => [])

  const existingCodes = new Set(
    (existing || [])
      .map((option: any) => option.type?.code)
      .filter(Boolean) as string[]
  )

  let created = 0
  let skipped = 0

  for (const service of services) {
    const carrierId = service?.carrier_id
    const serviceCode = service?.carrier_service_code || service?.service_code || service?.id

    if (!carrierId || !serviceCode) {
      console.warn(
        `[create-missing-shipstation-options] Skipping service without carrier/service: ${JSON.stringify(
          service
        )}`
      )
      continue
    }

    const optionCode = makeCode(carrierId, serviceCode)

    if (existingCodes.has(optionCode)) {
      skipped += 1
      continue
    }

    const label = service?.name || serviceCode
    const description = service?.description || `${label} via ShipStation`

    await fulfillmentModule.createShippingOptions({
      name: label,
      price_type: "calculated",
      provider_id: PROVIDER_ID,
      service_zone_id: SERVICE_ZONE_ID,
      shipping_profile_id: SHIPPING_PROFILE_ID,
      type: {
        label,
        description,
        code: optionCode,
      },
      data: {
        carrier_id: carrierId,
        carrier_service_code: serviceCode,
      },
    })

    created += 1
  }

  console.log(
    `[create-missing-shipstation-options] Created ${created} option(s), skipped ${skipped} existing service(s)`
  )
}
