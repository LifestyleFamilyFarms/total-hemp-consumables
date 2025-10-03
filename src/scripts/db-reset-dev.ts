/*
  Danger: Drops and recreates the dev database defined in your env.
  Intended for local development only.

  Requirements:
  - total-hemp-consumables/.env must define DATABASE_URL (or POSTGRES_URL)

  Usage:
    yarn ts-node src/scripts/db-reset-dev.ts
  or via package script:
    yarn db:reset:dev
*/

import { loadEnv } from "@medusajs/framework/utils"
import { Client } from "pg"

loadEnv(process.env.NODE_ENV || "development", process.cwd())

function getDbUrl() {
  const url = process.env.POSTGRES_URL || process.env.DATABASE_URL
  if (!url) {
    throw new Error(
      "Missing DATABASE_URL or POSTGRES_URL in env (total-hemp-consumables/.env)."
    )
  }
  return url
}

function parseDb(urlStr: string) {
  const u = new URL(urlStr)
  const database = (u.pathname || "/").replace(/^\//, "")
  const host = u.hostname
  const port = Number(u.port || 5432)
  const user = decodeURIComponent(u.username || "")
  const password = decodeURIComponent(u.password || "")
  const ssl = u.searchParams.get("ssl") === "true" || undefined
  return { host, port, user, password, database, ssl }
}

async function run() {
  const url = getDbUrl()
  const cfg = parseDb(url)
  if (!cfg.database) throw new Error("Parsed database name is empty from DATABASE_URL")

  const adminClient = new Client({
    host: cfg.host,
    port: cfg.port,
    user: cfg.user,
    password: cfg.password,
    database: "postgres",
    ssl: cfg.ssl ? { rejectUnauthorized: false } : undefined,
  })

  console.log(`Connecting to Postgres at ${cfg.host}:${cfg.port} as ${cfg.user}`)
  await adminClient.connect()
  try {
    console.log(`Terminating active connections to ${cfg.database}...`)
    await adminClient.query(
      `SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = $1 AND pid <> pg_backend_pid()`,
      [cfg.database]
    )
    console.log(`Dropping database ${cfg.database}...`)
    await adminClient.query(`DROP DATABASE IF EXISTS "${cfg.database}"`)
    console.log(`Creating database ${cfg.database}...`)
    await adminClient.query(`CREATE DATABASE "${cfg.database}"`)
    console.log("Done. You can now run migrations and mirror/seed.")
  } finally {
    await adminClient.end()
  }
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})

