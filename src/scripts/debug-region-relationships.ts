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

export default async function debugRegionRelationships(_: ExecArgs) {
  const client = new Client({ connectionString: env.DATABASE_URL })
  await client.connect()
  const { rows } = await client.query(`
    SELECT region_id, fulfillment_provider_id
    FROM region_fulfillment_provider
  `)
  console.log("region_fulfillment_provider", JSON.stringify(rows, null, 2))

  const { rows: channelRows } = await client.query(`
    SELECT id, name
    FROM sales_channel
  `)
  console.log("sales_channel", JSON.stringify(channelRows, null, 2))

  const { rows: locationRows } = await client.query(`
    SELECT stock_location_id, fulfillment_provider_id
    FROM stock_location_fulfillment_provider
  `)
  console.log("stock_location_fulfillment_provider", JSON.stringify(locationRows, null, 2))

  await client.end()
}
