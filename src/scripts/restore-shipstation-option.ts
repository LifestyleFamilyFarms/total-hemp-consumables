import { Client } from "pg"
import { readFileSync } from "fs"
import type { ExecArgs } from "@medusajs/framework/types"

const env: Record<string, string> = {}
readFileSync(".env", "utf8")
  .split(/\r?\n/)
  .forEach((line) => {
    if (!line || line.startsWith("#")) {
      return
    }
    const idx = line.indexOf("=")
    if (idx === -1) {
      return
    }
    env[line.substring(0, idx)] = line.substring(idx + 1)
  })

const SHIPPING_OPTION_ID = "so_01K88TN3T3SZMD6PAYMTK2PMFV"
const SERVICE_ZONE_ID = "serzo_01K8KJYK7TNY65PTBCSHDZ705E"

export default async function restoreShipstationOption(_: ExecArgs) {
  const client = new Client({ connectionString: env.DATABASE_URL })
  await client.connect()

  await client.query("BEGIN")

  await client.query(
    `UPDATE shipping_option
     SET deleted_at = NULL,
         service_zone_id = $1,
         updated_at = NOW()
     WHERE id = $2`,
    [SERVICE_ZONE_ID, SHIPPING_OPTION_ID]
  )

  await client.query("COMMIT")
  await client.end()

  console.log(`Shipping option ${SHIPPING_OPTION_ID} restored and moved to service zone ${SERVICE_ZONE_ID}`)
}
