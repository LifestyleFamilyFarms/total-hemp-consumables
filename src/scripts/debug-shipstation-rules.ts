import { Client } from "@medusajs/framework/pg"
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

export default async function debugShipstationRules(_: ExecArgs) {
  const client = new Client({ connectionString: env.DATABASE_URL })
  await client.connect()
  const { rows } = await client.query(
    `SELECT sor.id, sor.attribute, sor.operator, sor.value, sor.shipping_option_id
     FROM shipping_option_rule sor
     JOIN shipping_option so ON so.id = sor.shipping_option_id
     WHERE so.provider_id = 'shipstation_shipstation'
     ORDER BY sor.shipping_option_id`
  )
  console.log(JSON.stringify(rows, null, 2))
  await client.end()
}
