# SendGrid/Ops Evidence - 2026-03-03

## Scope
- Harden SendGrid abandoned-cart notification step for missing template/provider safety.
- Verify `/admin/abandoned-carts/process` dry/live contract and auth behavior.
- Provide operator runbook for template/env setup and verification.

## Files Updated
- `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables/src/workflows/abandoned-cart/steps/send-abandoned-notifications.ts`
- `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables/src/__tests__/workflows/abandoned-cart/send-abandoned-notifications.unit.spec.ts`
- `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables/docs/finalization-phases/runbooks/sendgrid-abandoned-cart-ops.md`

## Validation Commands
1. `cd /Users/franciscraven/Desktop/total-hemp/total-hemp-consumables && yarn build` -> PASS
2. `cd /Users/franciscraven/Desktop/total-hemp/total-hemp-consumables && yarn test:unit` -> PASS
3. Auth + dry/live probes against local dev server (`http://localhost:9000`) -> PASS

## Auth + API Probe Results
- Unauthenticated `POST /admin/abandoned-carts/process` -> `401`
- Authenticated `GET /admin/users/me` -> `200`
- Authenticated dry run `POST /admin/abandoned-carts/process` (`dry_run=true`) -> `200`
- Authenticated live run `POST /admin/abandoned-carts/process` (`dry_run=false`) -> `200`

## API Contract Matrix
| Endpoint | Expectation | Observed | Status |
|---|---|---|---|
| `POST /admin/abandoned-carts/process` unauth | auth guarded | `401` | PASS |
| `POST /admin/abandoned-carts/process` dry | `200`; `notification_sent_count` + `notification_sent_cart_ids` present | `200`; `notification_sent_count=0`; `notification_sent_cart_ids=[]` | PASS |
| `POST /admin/abandoned-carts/process` live | `200`; `notification_sent_count` + `notification_sent_cart_ids` present | `200`; `notification_sent_count=10`; `notification_sent_cart_ids.length=10` | PASS |

## Deterministic Safety Coverage
- Missing template ID behavior: covered by unit test (`returns deterministic empty result when template id is missing`).
- Missing provider/module behavior: covered by unit test (`returns deterministic empty result when notification provider cannot resolve`).
- Result in both cases: no throw from step, empty send metrics returned.

## Runbook
- Path: `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables/docs/finalization-phases/runbooks/sendgrid-abandoned-cart-ops.md`
- Includes:
  - Env/setup requirements (`SENDGRID_API_KEY`, `SENDGRID_FROM`, `SENDGRID_TEMPLATE_ABANDONED_CART`, `STOREFRONT_URL`)
  - Provider wiring expectations in `medusa-config.ts`
  - Dynamic template data contract
  - Recommended dynamic template HTML (Handlebars + unsubscribe links)
  - Auth + dry/live verification commands

## Findings
### High
- None.

### Medium
- None.

### Low
- Existing `.env` admin token values were stale for local auth; authenticated probes required creating a fresh local admin user/token for this run.
