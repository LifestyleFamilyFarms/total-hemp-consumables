import { Client } from "pg"
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
    env[line.substring(0, idx)] = line.substring(idx + 1)
  })

export default async function debugShipstationShippingMethods() {
  const client = new Client({ connectionString: env.DATABASE_URL })
  await client.connect()

  const { rows } = await client.query<{
    shipping_method_id: string
    order_id: string
    display_id: number
    created_at: string
    amount: string | null
    shipping_option_name: string | null
  }>(
    `
      SELECT
        osm.id AS shipping_method_id,
        o.id AS order_id,
        o.display_id,
        o.created_at,
        osm.amount::text AS amount,
        so.name AS shipping_option_name
      FROM order_shipping_method AS osm
      INNER JOIN order_shipping AS os ON os.shipping_method_id = osm.id
      INNER JOIN "order" AS o ON o.id = os.order_id
      LEFT JOIN shipping_option AS so ON so.id = osm.shipping_option_id
      WHERE so.provider_id = 'shipstation_shipstation'
      ORDER BY o.created_at DESC
    `
  )

  console.log(JSON.stringify(rows, null, 2))

  await client.end()
}

debugShipstationShippingMethods().catch((err) => {
  console.error(err)
  process.exit(1)
})
