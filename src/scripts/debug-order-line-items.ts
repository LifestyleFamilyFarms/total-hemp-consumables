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
    const key = line.substring(0, idx)
    const value = line.substring(idx + 1)
    env[key] = value
  })

const args = process.argv.slice(4)
const orderId = args[0]

if (!orderId) {
  console.error(
    "Usage: DISABLE_MEDUSA_ADMIN=true yarn medusa exec ./src/scripts/debug-order-line-items.ts <order_id>"
  )
  process.exit(1)
}

export default async function debugOrderLineItems() {
  const client = new Client({ connectionString: env.DATABASE_URL })
  await client.connect()

  const { rows } = await client.query<{
    order_item_id: string
    line_item_id: string
    quantity: string
    title: string
    variant_id: string | null
  }>(
    `
      SELECT
        oi.id AS order_item_id,
        oi.item_id AS line_item_id,
        oi.quantity::text AS quantity,
        oli.title,
        oli.variant_id
      FROM order_item AS oi
      INNER JOIN order_line_item AS oli ON oli.id = oi.item_id
      WHERE oi.order_id = $1
    `,
    [orderId]
  )

  console.log(JSON.stringify(rows, null, 2))

  await client.end()
}

debugOrderLineItems().catch((err) => {
  console.error(err)
  process.exit(1)
})
