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
    env[line.substring(0, idx)] = line.substring(idx + 1)
  })

const args = process.argv.slice(4)
const orderId = args[0]

if (!orderId) {
  console.error(
    "Usage: DISABLE_MEDUSA_ADMIN=true yarn medusa exec ./src/scripts/debug-order-fulfillments.ts <order_id>"
  )
  process.exit(1)
}

export default async function debugOrderFulfillments() {
  const client = new Client({ connectionString: env.DATABASE_URL })
  await client.connect()

  const { rows } = await client.query<{
    order_fulfillment_id: string
    fulfillment_id: string
    provider_id: string | null
    metadata: Record<string, unknown> | null
    fulfillment_data: Record<string, unknown> | null
    created_at: string
  }>(
    `
      SELECT
        of.id AS order_fulfillment_id,
        f.id AS fulfillment_id,
        f.provider_id,
        f.metadata,
        f.data AS fulfillment_data,
        f.created_at
      FROM order_fulfillment AS of
      INNER JOIN fulfillment AS f ON f.id = of.fulfillment_id
      WHERE of.order_id = $1
      ORDER BY f.created_at DESC
    `,
    [orderId]
  )

  console.log(JSON.stringify(rows, null, 2))

  await client.end()
}

debugOrderFulfillments().catch((err) => {
  console.error(err)
  process.exit(1)
})
