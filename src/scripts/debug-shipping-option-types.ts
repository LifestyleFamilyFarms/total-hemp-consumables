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

export default async function debugShippingOptionTypes(_: ExecArgs) {
  const client = new Client({ connectionString: env.DATABASE_URL })
  await client.connect()
  const { rows } = await client.query(`
    SELECT id, code, label, description, provider_id, deleted_at
    FROM shipping_option_type
    WHERE provider_id = 'shipstation_shipstation'
  `)
  console.log(JSON.stringify(rows, null, 2))
  await client.end()
}
