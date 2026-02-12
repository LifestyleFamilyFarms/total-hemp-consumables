export type ShipstationMode = "production" | "test"

function normalizeMode(value: string | undefined, fallback: ShipstationMode): ShipstationMode {
  const v = (value || "").trim().toLowerCase()
  if (v === "production" || v === "prod") return "production"
  if (v === "test" || v === "sandbox" || v === "dev") return "test"
  return fallback
}

export function resolveShipstationEnv(nodeEnv: string | undefined) {
  const fallbackMode: ShipstationMode = nodeEnv === "production" ? "production" : "test"
  const mode = normalizeMode(process.env.SHIPSTATION_ENV, fallbackMode)

  const apiKey =
    process.env.SHIPSTATION_API_KEY ||
    (mode === "production"
      ? process.env.SHIPSTATION_API_KEY_PRODUCTION
      : process.env.SHIPSTATION_API_KEY_TEST) ||
    ""

  const apiSecret =
    process.env.SHIPSTATION_API_SECRET ||
    (mode === "production"
      ? process.env.SHIPSTATION_API_SECRET_PRODUCTION
      : process.env.SHIPSTATION_API_SECRET_TEST) ||
    ""

  return {
    mode,
    apiKey,
    apiSecret,
  }
}
