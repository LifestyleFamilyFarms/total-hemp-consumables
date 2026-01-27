import { registerOtel } from "@medusajs/medusa"
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http"

const OTEL_ENABLED = process.env.OTEL_ENABLED === "true"

function buildExporter() {
  const endpoint = process.env.OTEL_EXPORTER_OTLP_ENDPOINT
  return new OTLPTraceExporter(
    endpoint
      ? {
          url: endpoint,
          headers: process.env.OTEL_EXPORTER_OTLP_HEADERS
            ? Object.fromEntries(
                process.env.OTEL_EXPORTER_OTLP_HEADERS.split(",")
                  .map((entry) => entry.trim())
                  .filter(Boolean)
                  .map((entry) => {
                    const [key, ...rest] = entry.split("=")
                    return [key, rest.join("=")]
                  })
              )
            : undefined,
        }
      : undefined
  )
}

export function register() {
  if (!OTEL_ENABLED) {
    return
  }

  registerOtel({
    serviceName: process.env.OTEL_SERVICE_NAME || "total-hemp-consumables-backend",
    exporter: buildExporter(),
    instrument: {
      http: true,
      workflows: true,
      query: true,
    },
  })
}
