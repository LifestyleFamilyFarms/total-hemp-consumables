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

export default async function latestOrderRow() {
  const client = new Client({ connectionString: env.DATABASE_URL })

  await client.connect()

  const { rows } = await client.query<Record<string, unknown>>(
    `
      SELECT *
      FROM "order"
      ORDER BY created_at DESC
      LIMIT 1
    `
  )

  if (!rows.length) {
    console.log("No orders found.")
  } else {
    console.log(JSON.stringify(rows[0], null, 2))
  }

  await client.end()
}

latestOrderRow().catch((err) => {
  console.error(err)
  process.exit(1)
})
