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

const SHIPPING_OPTION_ID = "so_01K88TN3T3SZMD6PAYMTK2PMFV"
const PRICE_SET_ID = "pset_01K88TN3TCAAXVTPB8KGMMY4H0"

export default async function restoreShipstationPriceSet(_: ExecArgs) {
  const client = new Client({ connectionString: env.DATABASE_URL })
  await client.connect()

  await client.query("BEGIN")

  await client.query(
    `UPDATE shipping_option_price_set
     SET deleted_at = NULL,
         updated_at = NOW()
     WHERE shipping_option_id = $1`,
    [SHIPPING_OPTION_ID]
  )

  await client.query(
    `UPDATE price_set
     SET deleted_at = NULL,
         updated_at = NOW()
     WHERE id = $1`,
    [PRICE_SET_ID]
  )

  await client.query("COMMIT")
  await client.end()

  console.log(`Restored price set ${PRICE_SET_ID} for shipping option ${SHIPPING_OPTION_ID}`)
}
