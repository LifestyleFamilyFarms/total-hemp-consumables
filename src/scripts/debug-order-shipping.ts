import { Client } from "@medusajs/framework/pg"
import { readFileSync } from "fs"

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
    const key = line.substring(0, idx)
    const value = line.substring(idx + 1)
    env[key] = value
  })

const args = process.argv.slice(4)
const orderId = args[0]

if (!orderId) {
  console.error(
    "Usage: DISABLE_MEDUSA_ADMIN=true yarn medusa exec ./src/scripts/debug-order-shipping.ts <order_id>"
  )
  process.exit(1)
}

export default async function debugOrderShipping() {
  const client = new Client({ connectionString: env.DATABASE_URL })

  await client.connect()

  const { rows } = await client.query<{
    order_shipping_id: string
    shipping_method_id: string
    name: string | null
    amount: number | null
    raw_amount: number | null
    data: Record<string, unknown> | null
    metadata: Record<string, unknown> | null
    shipping_option_id: string | null
    shipping_option_name: string | null
    shipping_profile_id: string | null
    provider_id: string | null
    created_at: Date
    updated_at: Date
  }>(
    `
      SELECT
        os.id AS order_shipping_id,
        osm.id AS shipping_method_id,
        osm.name,
        osm.amount,
        osm.raw_amount,
        osm.data,
        osm.metadata,
        osm.shipping_option_id,
        so.name AS shipping_option_name,
        so.shipping_profile_id,
        so.provider_id,
        osm.created_at,
        osm.updated_at
      FROM order_shipping AS os
      INNER JOIN order_shipping_method AS osm ON osm.id = os.shipping_method_id
      LEFT JOIN shipping_option AS so ON so.id = osm.shipping_option_id
      WHERE os.order_id = $1
      ORDER BY osm.created_at DESC
    `,
    [orderId]
  )

  if (!rows.length) {
    console.log("No shipping methods for order:", orderId)
  } else {
    console.log(JSON.stringify(rows, null, 2))
  }

  await client.end()
}

debugOrderShipping().catch((err) => {
  console.error(err)
  process.exit(1)
})
