import { Client } from "pg"
import { readFileSync } from "fs"

const env: Record<string, string> = {}
readFileSync(".env", "utf8")
  .split(/\r?\n/)
  .forEach((line) => {
    if (!line || line.startsWith("#")) return
    const idx = line.indexOf("=")
    if (idx === -1) return
    env[line.substring(0, idx)] = line.substring(idx + 1)
  })

const args = process.argv.slice(4)
const table = args[0]

if (!table) {
  console.error(
    "Usage: yarn medusa exec ./src/scripts/query-table-columns.ts <table>"
  )
  process.exit(1)
}

export default async function run() {
  const client = new Client({ connectionString: env.DATABASE_URL })
  await client.connect()
  const { rows } = await client.query(
    `
      SELECT column_name
      FROM information_schema.columns
      WHERE table_schema = 'public'
        AND table_name = $1
      ORDER BY ordinal_position
    `,
    [table]
  )
  console.log(
    rows.map((row) => row.column_name).join("\n") || `No columns found for table "${table}".`
  )
  await client.end()
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
