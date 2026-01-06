# Backend Code Review — 2025-10-03

## Project Readiness Snapshot
- **Target**: MVP live by end of week.
- **Backend stack**: Medusa v2 with custom modules (Authorize.Net, ShipStation, S3, Redis, Postgres).
- **Overall maturity**: Core catalog/fulfillment flows exist, but several production blockers remain (secrets exposure, brittle env/tooling workflows, missing tests/monitoring).

## Critical Findings (address immediately)
- **Secrets management** — `.env` files contain live credentials (Medusa admin, DB, S3, SendGrid, Authorize.Net). They are currently ignored from git; keep them out of source control, confirm they’re delivered via secure deployment vars, and rotate if any prior exposure is suspected.
- **Deployment hygiene** — Ensure replacements exist in secure delivery (e.g., Railway env vars) and document rotations once new secrets issued.
- **Maintenance window** — Maintenance mode defaults to `MAINTENANCE_MODE=0`; ensure deployment playbook includes toggling this flag and verifying `ALLOWED_PATHS` before re-opening storefront traffic.

## High-Priority Gaps
- **Inventory mirror fragility** (`total-hemp-consumables/src/scripts/mirror-inventory.ts:152`)
  - Shared Admin API token must exist before script runs; missing variant SKUs skip inventory entirely.
  - Reservations sync deletes existing dev reservations by default; confirm this behaviour is safe and won’t affect prod mirroring.
  - No pagination; stores with >1k inventory levels/reservations will truncate data.
- **Catalog mirror resilience** (`total-hemp-consumables/src/scripts/mirror-prod-to-dev.ts:205`)
  - Silent failure when channel creation errors occur; add explicit logging/error handling.
  - Relies on default limit=100; document/extend for larger catalogs.
- **Seed script coupling** (`total-hemp-consumables/src/scripts/seed-fresh.ts:138`)
  - Workflow payload updated to `{ id, add }`; ensure docs/scripts reference the new contract and verify in staging.
- **Lack of automated testing/CI**
  - No automated integration/unit tests; add at least `yarn test:integration:http` or smoke script prior to deploy.

## Medium-Priority Observations
- Mirror scripts continue after warnings; consider exiting non-zero when core resources are missing to prevent silent drifts.
- `.env` should be replaced with `.env.local` template; reinforce usage of `docs/status.md` for environment instructions.
- ShipStation module relies on accurate variant weights (`total-hemp-consumables/src/modules/shipstation/service.ts:121`); confirm catalog data integrity.

## Critical Path to MVP (Backend)
1. **Secrets hygiene & rotation** — revoke committed credentials, update secure storage, scrub repo.
2. **Environment automation** — document/automate token generation after `db:reset:dev`; smoke-test `mirror:dev` + `mirror:inventory` on clean env.
3. **Functional verification** — run seeding/mirroring in staging, validate inventory/price parity, perform Authorize.Net + ShipStation sandbox checkout.
4. **Observability & rollback** — define logging expectations, create rollback plan for mirroring/seed scripts.

## Recommended Next Actions
- [ ] Log secret exposure incident, track rotations.
- [ ] Update `docs/status.md` with critical path and owners/dates.
- [ ] Add dry-run flag to `mirror-inventory.ts` for safe comparisons.
- [ ] Introduce lint/test workflow (e.g., GitHub Actions) before deploy.
- [ ] Document maintenance mode toggle/verification steps.

## Delegation Guidance
When assigning backend tasks to execution agents, include:
- Required env vars/tokens (call out need for fresh Admin API token).
- Pre/post validation commands (e.g., `yarn build`, API spot checks).
- Rollback or manual cleanup steps if scripts fail mid-run.
