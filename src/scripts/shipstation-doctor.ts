// @ts-nocheck
import { Buffer } from "node:buffer"
import type { ExecArgs } from "@medusajs/framework/types"
import { resolveShipstationEnv } from "../utils/shipstation-env"

type AuthAttempt = {
  label: string
  headers: Record<string, string>
}

const BASE_URL = "https://api.shipstation.com/v2"

function summarizeBody(body: unknown) {
  if (!body) return ""
  const text = typeof body === "string" ? body : JSON.stringify(body)
  return text.length > 600 ? `${text.slice(0, 600)}...` : text
}

async function request(endpoint: string, auth: AuthAttempt) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...auth.headers,
    },
  })

  const contentType = res.headers.get("content-type") || ""
  const body = contentType.includes("application/json")
    ? await res.json().catch(() => null)
    : await res.text().catch(() => "")

  return {
    status: res.status,
    statusText: res.statusText,
    requestId:
      res.headers.get("x-request-id") ||
      res.headers.get("x-correlation-id") ||
      res.headers.get("cf-ray") ||
      "",
    body,
  }
}

function buildAttempts(apiKey: string, apiSecret: string) {
  const attempts: AuthAttempt[] = []
  if (apiSecret) {
    const token = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64")
    attempts.push({
      label: "basic:key+secret",
      headers: { Authorization: `Basic ${token}` },
    })
    return attempts
  }

  attempts.push({
    label: "api-key-header",
    headers: { "api-key": apiKey },
  })

  attempts.push({
    label: "basic:key+empty-secret",
    headers: { Authorization: `Basic ${Buffer.from(`${apiKey}:`).toString("base64")}` },
  })

  if (apiKey.includes(":")) {
    attempts.push({
      label: "basic:api-key-as-key-secret-string",
      headers: { Authorization: `Basic ${Buffer.from(apiKey).toString("base64")}` },
    })
  }

  return attempts
}

export default async function shipstationDoctor(_args: ExecArgs) {
  const resolved = resolveShipstationEnv(process.env.NODE_ENV)
  if (!resolved.apiKey) {
    throw new Error(
      "No ShipStation API key resolved. Set SHIPSTATION_API_KEY or SHIPSTATION_ENV with split key vars."
    )
  }

  const endpoints = ["/carriers", "/warehouses"]
  const attempts = buildAttempts(resolved.apiKey, resolved.apiSecret)

  console.log(`[shipstation-doctor] mode=${resolved.mode}`)
  console.log(
    `[shipstation-doctor] key=set(len=${resolved.apiKey.length}) secret=${resolved.apiSecret ? "set" : "missing"}`
  )
  console.log(`[shipstation-doctor] attempting ${attempts.length} auth mode(s)`)

  for (const attempt of attempts) {
    console.log(`\n[shipstation-doctor] auth=${attempt.label}`)
    for (const endpoint of endpoints) {
      try {
        const out = await request(endpoint, attempt)
        const ok = out.status >= 200 && out.status < 300
        console.log(
          `- ${endpoint} -> ${out.status} ${out.statusText}${out.requestId ? ` | request-id=${out.requestId}` : ""}`
        )
        if (!ok) {
          console.log(`  body: ${summarizeBody(out.body)}`)
        }
      } catch (e: any) {
        console.log(`- ${endpoint} -> request failed: ${e?.message || e}`)
      }
    }
  }
}
