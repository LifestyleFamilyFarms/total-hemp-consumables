# Production Readiness Updates

## Automated Testing Gate (CI)
A GitHub Actions workflow now runs unit tests on every pull request and push to `main`.

**Workflow summary**
- Installs dependencies with Yarn (Corepack).
- Runs `yarn test:unit`.

**Local parity**
- `yarn test:unit`

If you need integration tests later, add additional jobs using the existing scripts in `package.json`.

## Observability (OpenTelemetry)
Backend tracing can now be enabled with environment variables. When `OTEL_ENABLED=true`, the backend registers OpenTelemetry tracing using an OTLP HTTP exporter.

**TL;DR**
- OpenTelemetry (OTel) is a standard way to emit traces/metrics/logs from your app.
- Traces show how requests flow through services with timing + error metadata, which helps debug latency and failures.
- An OTLP exporter ships this telemetry to a collector or observability vendor (Tempo, Honeycomb, Datadog, etc.).

**Required env vars**
- `OTEL_ENABLED=true` (turns tracing on)
- `OTEL_SERVICE_NAME=total-hemp-consumables-backend` (override as needed)
- `OTEL_EXPORTER_OTLP_ENDPOINT=https://your-collector/v1/traces`
- `OTEL_EXPORTER_OTLP_HEADERS=key=value,another=token` (optional)

**Notes**
- If `OTEL_ENABLED` is not `true`, instrumentation is skipped.
- Set exporter endpoint + headers to match your collector (e.g., Honeycomb, Grafana Tempo, Datadog).

## Follow-up Recommendations
- Add integration test coverage for checkout + fulfillment once stable fixtures exist.
- Add an alerting policy in your observability stack for API errors and latency spikes.
