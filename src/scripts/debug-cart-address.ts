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

const CART_ID = process.env.CART_ID || "cart_01K8PD0S98JWAA9MVSTZQPQ67G"

export default async function debugCartAddress(_: ExecArgs) {
  const client = new Client({ connectionString: env.DATABASE_URL })
  await client.connect()
  const { rows } = await client.query(
    `SELECT * FROM cart_address WHERE cart_id = $1`,
    [CART_ID]
  )
  console.log(JSON.stringify(rows, null, 2))
  await client.end()
}
