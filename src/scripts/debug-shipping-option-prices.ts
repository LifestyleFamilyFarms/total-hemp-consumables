import { Client } from "pg"
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

export default async function debugShippingOptionPrices(_: ExecArgs) {
  const client = new Client({ connectionString: env.DATABASE_URL })
  await client.connect()

  const { rows } = await client.query(`
    SELECT sop.shipping_option_id,
           sop.currency_code,
           sop.amount,
           sop.is_tax_inclusive,
           sop.deleted_at
    FROM shipping_option_price sop
    WHERE sop.shipping_option_id = 'so_01K88TN3T3SZMD6PAYMTK2PMFV'
  `)

  console.log(JSON.stringify(rows, null, 2))

  await client.end()
}
