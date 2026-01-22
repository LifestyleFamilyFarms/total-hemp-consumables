import { Client } from "@medusajs/framework/pg"
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

const PRICE_SET_ID = "pset_01K88TN3TCAAXVTPB8KGMMY4H0"

export default async function debugPriceSet(_: ExecArgs) {
  const client = new Client({ connectionString: env.DATABASE_URL })
  await client.connect()

  const { rows } = await client.query(
    `SELECT * FROM price_set WHERE id = $1`,
    [PRICE_SET_ID]
  )
  console.log("price_set", JSON.stringify(rows, null, 2))

  const { rows: priceRows } = await client.query(
    `SELECT * FROM price WHERE price_set_id = $1`,
    [PRICE_SET_ID]
  )
  console.log("price", JSON.stringify(priceRows, null, 2))

  await client.end()
}
