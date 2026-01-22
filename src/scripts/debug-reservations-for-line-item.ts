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
const lineItemId = args[0]

if (!lineItemId) {
  console.error(
    "Usage: DISABLE_MEDUSA_ADMIN=true yarn medusa exec ./src/scripts/debug-reservations-for-line-item.ts <line_item_id>"
  )
  process.exit(1)
}

export default async function debugReservationsForLineItem() {
  const client = new Client({ connectionString: env.DATABASE_URL })
  await client.connect()

  const { rows } = await client.query<{
    reservation_id: string
    location_id: string
    quantity: string
    allow_backorder: boolean
    metadata: Record<string, unknown> | null
    created_at: string
  }>(
    `
      SELECT
        ri.id AS reservation_id,
        ri.location_id,
        ri.quantity::text AS quantity,
        ri.allow_backorder,
        ri.metadata,
        ri.created_at
      FROM reservation_item AS ri
      WHERE ri.line_item_id = $1
      ORDER BY ri.created_at DESC
    `,
    [lineItemId]
  )

  console.log(JSON.stringify(rows, null, 2))

  await client.end()
}

debugReservationsForLineItem().catch((err) => {
  console.error(err)
  process.exit(1)
})
