# MVP Launch Roadmap — Week of 2025-10-03

Target: Back-end + Storefront MVP live in production by end of week.

This roadmap is ordered by priority. Each phase should be completed (and verified) before starting the next to reduce rework.

## Priority 0 — Immediate Blockers (Today)
1. **Secrets & Environment Hygiene** ✅
   - Confirm `.env` remains git-ignored and that production/staging secrets are injected via deployment provider.
   - Rotate Medusa admin tokens, Authorize.Net keys, SendGrid, ShipStation, and S3 credentials if there is any chance of prior exposure.
   - Document rotation dates and storage locations in internal runbook.
2. **Maintenance Safeguard** ✅
   - Ensure production deploys start with `MAINTENANCE_MODE=1` and `ALLOWED_PATHS=/maintenance`.
   - Verify `/maintenance` renders the new “Contact sales” page; disable maintenance only after smoke tests pass.

## Priority 1 — Backend Readiness
1. **Mirror & Seed Reliability** (owner: backend) — see `docs/task-001-mirror-seed-reliability.md`
   - Validate `yarn mirror:dev` and `yarn mirror:inventory` on a clean dev instance (fresh DB, fresh Admin token).
   - Add dry-run flag to `mirror-inventory.ts` so we can compare prod/dev without mutating.
   - Improve error handling (non-zero exit on missing stock locations/SKUs).
2. **Checkout Pipeline QA** — see `docs/task-002-checkout-pipeline-qa.md`
   - Run end-to-end sandbox checkout: seed → mirror → cart → Authorize.Net → ShipStation label quote.
   - Log outcomes and any manual steps required.
3. **Observability & Rollback Plan** — see `docs/task-003-observability-rollback.md`
   - Define how to capture Medusa logs (Railway, CloudWatch, etc.).
   - Prepare rollback instructions for mirror/seed scripts (DB snapshot or restore procedure).

## Priority 2 — Storefront Readiness
1. **PDP/PLP Polish**
   - Implement PDP “facts” row (weight, total mg, serving details).
   - Update category PLPs to display category-specific headings and metadata.
2. **Maintenance Runbook**
   - Document enable/disable steps for `MAINTENANCE_MODE` in storefront docs.
   - Confirm that removing maintenance retains cart/session state as expected.
3. **Runtime Stability Checks**
   - Verify Next.js 15 / React 19 RC compatibility with hosting provider; pin versions if necessary.
   - Audit middleware redirects (country code + maintenance) for edge cases (direct `/shop` hits, static assets).

## Priority 3 — Cross-Cutting Quality Gates
1. **Testing & CI/CD**
   - Add automated smoke suite (Playwright or Cypress) for browse → PDP → cart → checkout (sandbox).
   - Ensure `yarn build` + tests run in CI before deploy (GitHub Actions or Railway build hooks).
2. **Analytics & Monitoring**
   - Integrate PostHog (or chosen analytics) for navigation, PDP, cart, checkout events.
   - Add CSP report endpoint and move towards enforcing CSP in production.
3. **Documentation Updates**
   - Update `docs/status.md` and storefront docs with any new scripts, env variables, or runbook steps.

## Priority 4 — Launch & Post-Launch
1. **Final Smoke Tests**
   - Perform full manual walkthrough in staging with maintenance disabled.
   - Confirm inventory levels, pricing, and shipping rates match prod references.
2. **Greenlight Deploy**
   - Toggle `MAINTENANCE_MODE=0`, monitor analytics/error logs for first 24 hours.
   - Have rollback plan ready if anomalies detected (re-enable maintenance, restore DB snapshot, etc.).
3. **Post-Launch Tasks**
   - Schedule follow-up improvements (filters/search, analytics enhancements, QA automation expansion).
   - Capture learnings and update roadmap for next iteration.

## References
- Backend review: `docs/code-review-2025-10-03.md`
- Storefront review: `../total-hemp-consumables-storefront/docs/code-review-2025-10-03.md`
- Current status/commands: `docs/status.md`
