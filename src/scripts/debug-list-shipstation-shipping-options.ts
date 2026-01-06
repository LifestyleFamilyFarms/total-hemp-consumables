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
    env[line.substring(0, idx)] = line.substring(idx + 1)
  })

export default async function debugListShipstationShippingOptions() {
  const client = new Client({ connectionString: env.DATABASE_URL })
  await client.connect()

  const { rows } = await client.query<{
    id: string
    name: string
    provider_id: string
    created_at: string
  }>(
    `
      SELECT id, name, provider_id, created_at
      FROM shipping_option
      WHERE provider_id = 'shipstation_shipstation'
      ORDER BY created_at DESC
    `
  )

  console.log(JSON.stringify(rows, null, 2))

  await client.end()
}

debugListShipstationShippingOptions().catch((err) => {
  console.error(err)
  process.exit(1)
})
