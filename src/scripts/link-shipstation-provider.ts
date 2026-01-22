import { Client } from "@medusajs/framework/pg"
import { readFileSync } from "fs"

const env: Record<string, string> = {}
readFileSync(".env", "utf8")
  .split(/\r?\n/)
  .forEach((line) => {
    if (!line || line.startsWith("#")) return
    const idx = line.indexOf("=")
    if (idx === -1) return
    env[line.substring(0, idx)] = line.substring(idx + 1)
  })

const STOCK_LOCATION_ID = "sloc_01K81AHC747F1WNBRAYS6TEA2W"
const PROVIDER_ID = "shipstation_shipstation"

async function run() {
  const client = new Client({ connectionString: env.DATABASE_URL })
  await client.connect()
  const exists = await client.query(
    'SELECT id FROM "location_fulfillment_provider" WHERE stock_location_id = $1 AND fulfillment_provider_id = $2',
    [STOCK_LOCATION_ID, PROVIDER_ID]
  )
  if (exists.rows.length) {
    console.log("Link already exists", exists.rows[0].id)
    await client.end()
    return
  }
  const result = await client.query(
    'INSERT INTO "location_fulfillment_provider" (id, stock_location_id, fulfillment_provider_id, created_at, updated_at) VALUES ($1, $2, $3, now(), now()) RETURNING id',
    [`locfp_${Math.random().toString(36).slice(2, 12)}`, STOCK_LOCATION_ID, PROVIDER_ID]
  )
  console.log("Created link", result.rows[0].id)
  await client.end()
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
