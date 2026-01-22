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

export default async function listTables() {
  const client = new Client({ connectionString: env.DATABASE_URL })

  await client.connect()

  const { rows } = await client.query<{
    table_name: string
  }>(
    `
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name
    `
  )

  console.log(
    rows
      .map((row) => row.table_name)
      .join("\n")
  )

  await client.end()
}

listTables().catch((err) => {
  console.error(err)
  process.exit(1)
})
