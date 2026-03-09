# Purpose
Backend execution contract for `total-hemp-consumables`.

Agents working in this repo must preserve Medusa architecture boundaries, avoid runtime regressions, and produce release-grade evidence for every substantial task.

# Canonical Docs
- Command center (cross-repo dispatch, runbooks, evidence):
  - `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables/docs/finalization-phases`
- Backend wave references:
  - `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables/docs/wave-1-docs`
- Local JS SDK references:
  - `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables/docs/js-sdk`
- Tracked production backlog:
  - `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables/docs/to-do-prod.md`
- Storefront repo (read-only unless explicitly assigned):
  - `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables-storefront`

# Skills References
- Backend architecture and implementation:
  - `/Users/franciscraven/.agents/skills/building-with-medusa/SKILL.md`
- Admin dashboard customization patterns (when touching admin UI):
  - `/Users/franciscraven/.agents/skills/building-admin-dashboard-customizations/SKILL.md`
- Migration generation workflow:
  - `/Users/franciscraven/.agents/skills/db-generate/SKILL.md`
- Migration execution workflow:
  - `/Users/franciscraven/.agents/skills/db-migrate/SKILL.md`

# Path Ownership
| Lane | Primary Paths | Notes |
|---|---|---|
| API contracts | `src/api/**` | Keep handlers thin; route validation/auth only. |
| Business logic | `src/workflows/**` | All mutation logic belongs here. |
| Domain models | `src/modules/**`, `src/links/**` | Module isolation, schema/migration discipline. |
| Event handling | `src/subscribers/**`, `src/jobs/**` | Subscriber-triggered behavior must be idempotent. |
| Ops scripts | `src/scripts/**` | Must support safe dry-run paths when possible. |
| Validation artifacts | `src/__tests__/**`, `docs/finalization-phases/evidence/**` | Evidence is required for handoff. |

# Hard Rules
- Use workflows for all mutations. Do not put business logic in route handlers.
- Keep route methods aligned to repo convention: `GET`, `POST`, `DELETE`.
- Keep auth and ownership enforcement in middleware/workflow steps, not in ad hoc route checks.
- Keep module boundaries strict; avoid cross-module coupling shortcuts.
- For SendGrid/ShipStation/notification logic:
  - Missing optional provider/template config must never cause `500`.
  - Return deterministic safe fallback/skip behavior with structured logs.
  - Enforce idempotency for replayed events and repeated status transitions.
- Use static imports; avoid dynamic imports in route execution paths.
- Keep response contracts stable for existing consumers unless change is explicitly requested.

# Validation Gates
- Required for substantial backend changes:
  - `yarn build`
  - `yarn test:unit`
- Required when touching module models/schema:
  - `npx medusa db:generate <module-name>`
  - `npx medusa db:migrate`
- Required when touching abandoned-cart notification path:
  - `yarn abandoned:process:dry`
  - `yarn abandoned:process` (only in controlled test context)
- Required when touching ShipStation integration:
  - `yarn shipstation:doctor:test` (or `:prod` for production verification windows)
- Record pass/fail for every executed command in final handoff.

# Handoff Requirements
- Mandatory dispatch lifecycle checklist for substantial tasks:
  1. Documentation intake gate: request relevant docs, wait for docs or explicit `none`.
  2. Doc Map: list doc path, relevance, decisions.
  3. Scope lock: include explicit non-goals.
  4. Run validation gates and capture evidence.
  5. Publish handoff report with evidence paths.
- Handoff payload must include:
  - Files changed
  - Behavior/API contract summary
  - Commands run + pass/fail
  - Evidence paths (logs/json/curl/test output)
  - Risks/blockers and recommended owner

# Prohibited Patterns
- Business logic inside `src/api/**` route handlers.
- Direct mutation through module services from routes (bypassing workflows).
- Returning `500` for missing optional notification template/provider configuration.
- Silent contract-shape changes without explicit callout.
- Editing storefront repo files from backend task scope unless explicitly assigned.
- Referencing deprecated top-level workspace docs as canonical.
