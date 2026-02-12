// @ts-nocheck
import type { ExecArgs } from "@medusajs/framework/types"
import { resolveShipstationEnv } from "../utils/shipstation-env"
import { ShipStationClient } from "../modules/shipstation/client"

export default async function inspectShipstation(_args: ExecArgs) {
  const resolved = resolveShipstationEnv(process.env.NODE_ENV)
  if (!resolved.apiKey) {
    throw new Error(
      "No ShipStation API key resolved. Set SHIPSTATION_API_KEY or SHIPSTATION_ENV with split key vars."
    )
  }

  const client = new ShipStationClient({
    api_key: resolved.apiKey,
    api_secret: resolved.apiSecret,
  })

  console.log(`[shipstation-inspect] env mode: ${resolved.mode}`)
  let carriersError = ""
  let warehousesError = ""

  const carriersResp = await client.getCarriers().catch((e) => {
    carriersError = e?.message || String(e)
    return null
  })
  const carriers = carriersResp?.carriers || []
  if (carriersError) {
    console.log(`[shipstation-inspect] carriers: ERROR (${carriersError})`)
  } else {
    console.log(`[shipstation-inspect] carriers: ${carriers.length}`)
    for (const c of carriers) {
      const services = Array.isArray(c.services) ? c.services.length : 0
      console.log(`- carrier: ${c.friendly_name || c.carrier_id} (services: ${services})`)
    }
  }

  const warehousesResp = await client.getWarehouses().catch((e) => {
    warehousesError = e?.message || String(e)
    return null
  })
  const warehouses = warehousesResp?.warehouses || []
  if (warehousesError) {
    console.log(`[shipstation-inspect] warehouses: ERROR (${warehousesError})`)
  } else {
    console.log(`[shipstation-inspect] warehouses: ${warehouses.length}`)
    for (const w of warehouses) {
      const a = w.origin_address || {}
      const city = a.city_locality || ""
      const state = a.state_province || ""
      const country = a.country_code || ""
      const line1 = a.address_line1 || ""
      console.log(
        `- warehouse: ${w.name || w.warehouse_id} | ${line1} | ${city}${state ? `, ${state}` : ""} ${
          country || ""
        }`.trim()
      )
    }
  }

  if (carriersError && warehousesError) {
    throw new Error("ShipStation account inspection failed for both carriers and warehouses.")
  }
}
