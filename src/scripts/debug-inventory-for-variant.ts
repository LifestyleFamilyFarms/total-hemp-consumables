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
const variantId = args[0]

if (!variantId) {
  console.error(
    "Usage: DISABLE_MEDUSA_ADMIN=true yarn medusa exec ./src/scripts/debug-inventory-for-variant.ts <variant_id>"
  )
  process.exit(1)
}

export default async function debugInventoryForVariant() {
  const client = new Client({ connectionString: env.DATABASE_URL })
  await client.connect()

  const { rows } = await client.query<{
    inventory_item_id: string
    location_id: string
    stocked_quantity: string
    reserved_quantity: string
    incoming_quantity: string
    metadata: Record<string, unknown> | null
  }>(
    `
      SELECT
        il.inventory_item_id,
        il.location_id,
        il.stocked_quantity::text AS stocked_quantity,
        il.reserved_quantity::text AS reserved_quantity,
        il.incoming_quantity::text AS incoming_quantity,
        il.metadata
      FROM product_variant_inventory_item AS pvii
      INNER JOIN inventory_level AS il
        ON il.inventory_item_id = pvii.inventory_item_id
      WHERE pvii.variant_id = $1
    `,
    [variantId]
  )

  console.log(JSON.stringify(rows, null, 2))

  await client.end()
}

debugInventoryForVariant().catch((err) => {
  console.error(err)
  process.exit(1)
})
