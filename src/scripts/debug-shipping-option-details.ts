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

export default async function debugShippingOptionDetails(_: ExecArgs) {
  const client = new Client({ connectionString: env.DATABASE_URL })
  await client.connect()

  const { rows } = await client.query(`
    SELECT so.id,
           so.name,
           so.provider_id,
           so.price_type,
           so.data,
           so.deleted_at,
           so.service_zone_id,
           so.shipping_profile_id,
           sor.attribute,
           sor.value,
           sor.operator
    FROM shipping_option so
    LEFT JOIN shipping_option_rule sor ON sor.shipping_option_id = so.id
    WHERE so.provider_id = 'shipstation_shipstation'
  `)

  console.log(JSON.stringify(rows, null, 2))

  await client.end()
}
