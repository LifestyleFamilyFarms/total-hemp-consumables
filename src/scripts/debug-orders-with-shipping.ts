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

export default async function debugOrdersWithShipping() {
  const client = new Client({ connectionString: env.DATABASE_URL })

  await client.connect()

  const { rows } = await client.query<{
    order_id: string
    display_id: number
    created_at: string
    status: string
    shipping_option_name: string | null
    provider_id: string | null
    amount: string | null
  }>(
    `
      SELECT
        o.id AS order_id,
        o.display_id,
        o.status,
        o.created_at,
        osm.name AS shipping_method_name,
        so.name AS shipping_option_name,
        so.provider_id,
        osm.amount::text AS amount
      FROM "order" AS o
      LEFT JOIN order_shipping AS os ON os.order_id = o.id
      LEFT JOIN order_shipping_method AS osm ON osm.id = os.shipping_method_id
      LEFT JOIN shipping_option AS so ON so.id = osm.shipping_option_id
      ORDER BY o.created_at DESC
      LIMIT 5
    `
  )

  console.log(JSON.stringify(rows, null, 2))

  await client.end()
}

debugOrdersWithShipping().catch((err) => {
  console.error(err)
  process.exit(1)
})
