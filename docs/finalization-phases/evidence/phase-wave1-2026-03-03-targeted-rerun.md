# Wave 1 Targeted QA Rerun Evidence (2026-03-03)

## Scope
- Pass type: Targeted Wave 1 rerun after QA toggle hardening + abandoned-cart processed-count fix.
- Repos reviewed:
  - Backend: `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables` (`main` @ `d2d440b`)
  - Storefront: `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables-storefront` (`main` @ `feeb092`, tested with additional uncommitted Wave 1 remediation changes in working tree)
- Targeted focus validated:
  - QA toggle gating for reorder/reviews (`NEXT_PUBLIC_QA_EVIDENCE_MODE`)
  - Abandoned cart admin dry/live semantics
  - Reorder owner/non-owner semantics
  - First-purchase guest/signed-in API states
  - Reviews moderation response path
  - Wishlist mutation + refetch persistence

## Doc Map
| Source | Why Relevant | Acceptance Assertions Derived |
|---|---|---|
| `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables-storefront/docs/wave-1-docs/product-reviews.md` | Defines review submission/display behavior and moderation workflow | `POST /store/products/:id/reviews` must accept authenticated customer review and return review payload with moderation-compatible status (`pending` path supported). |
| `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables-storefront/docs/wave-1-docs/wishlist.md` | Defines wishlist ownership and item lifecycle | Auth required for wishlist routes; add/remove operations must persist and list endpoint must reflect mutation state. |
| `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables-storefront/docs/wave-1-docs/reorder.md` | Defines reorder workflow behavior and customer ownership expectation | Owner reorder succeeds with structured result; non-owner reorder rejected; unavailable items and suggestions returned without auto-substitution. |
| `docs/wave-1-docs/first-purchase-discount.md` | Defines first-purchase gating behavior and promotion eligibility | Guest access blocked; signed-in request returns deterministic applied/reason response, including disabled-feature reason when applicable. |
| `docs/wave-1-docs/abandoned-cart.md` | Defines abandoned cart process flow and processing semantics | Admin process route stable in dry/live modes; dry run reports no processing side effects; live run reports processed candidates. |
| `docs/wave-1-docs/meta-feed.md` | Wave 1 baseline source for feed route expectations | Feed endpoint remains part of baseline wave capability (not re-executed in this targeted pass). |
| `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables-storefront/docs/wave-1-docs/product-category-images.md` | Wave 1 baseline source for category media expectations | Category media behavior remains baseline scope (not re-executed in this targeted pass). |
| `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables/.cursor/skills` | User-provided local Medusa/storefront doc path | Directory exists but contains no files in this environment; no assertions derived from this path. |

## Commands/Results
| Command | Result |
|---|---|
| `cd total-hemp-consumables && yarn build && yarn test:unit` | PASS |
| `cd total-hemp-consumables-storefront && yarn lint && yarn build` | PASS |
| Mode-gated toggle probes (mode `1`, `0`, `unset`) via `wave1-toggle-probe.mjs` with per-mode storefront rebuild | PASS |
| Targeted API rerun via `node /private/tmp/wave1-targeted-api-rerun.mjs` | PASS |

Artifacts:
- `/private/tmp/wave1-toggle-probe-mode1-2026-03-03T05-01-00-014Z.json`
- `/private/tmp/wave1-toggle-probe-mode0-2026-03-03T05-01-33-257Z.json`
- `/private/tmp/wave1-toggle-probe-mode_unset-2026-03-03T05-02-08-346Z.json`
- `/private/tmp/wave1-targeted-api-rerun-2026-03-03T05-02-10-629Z.json`

## Contract Matrix
| Endpoint / Check | Expected | Observed | Status |
|---|---|---|---|
| Reviews QA toggle (`mode=1`) | `qa_reviews_force_error=1` triggers forced runtime error path | `forced_error_text=true`; normal path unaffected | PASS |
| Reviews QA toggle (`mode=0`) | Toggle disabled | `forced_error_text=false`; no forced error shown | PASS |
| Reviews QA toggle (`mode=unset`) | Toggle disabled | `forced_error_text=false`; no forced error shown | PASS |
| Reorder QA toggle (`mode=1`) | `qa_reorder_force_error=1` triggers forced error | `forced_error_text=true`; normal path unaffected | PASS |
| Reorder QA toggle (`mode=0`) | Toggle disabled | `forced_error_text=false` | PASS |
| Reorder QA toggle (`mode=unset`) | Toggle disabled | `forced_error_text=false` | PASS |
| `POST /store/products/:id/reviews` (owner) | 200 + review payload | 200, `review.status="pending"` | PASS |
| `POST /store/customers/me/orders/:id/reorder` (owner) | 200 + `cart_id`, arrays for added/unavailable/suggested | 200 with `cart_id`; `added_items[]`, `unavailable_items[]`, `suggested_variants[]` present | PASS |
| `POST /store/customers/me/orders/:id/reorder` (non-owner) | rejection | 403 `You can only reorder your own orders` | PASS |
| `POST /store/carts/:id/first-purchase-discount` (guest) | auth rejection | 401 Unauthorized | PASS |
| `POST /store/carts/:id/first-purchase-discount` (owner) | deterministic applied/reason response | 200, `applied=false`, `reason="First purchase discount is disabled"` | PASS |
| Wishlist add/refetch/remove | add succeeds; list reflects add and remove | add 200; after-add count=1; remove 200 removed=true; after-remove count=0 | PASS |
| `POST /admin/abandoned-carts/process` dry | `processed_count=0` when `dry_run=true` | 200, `candidate_count=10`, `processed_count=0`, `dry_run=true` | PASS |
| `POST /admin/abandoned-carts/process` live | live processed_count reflects processed candidates | 200, `candidate_count=10`, `processed_count=10`, `dry_run=false` | PASS |
| `GET /admin/abandoned-carts/visibility` | filtered abandoned candidates with pagination metadata | 200, `count=133`, `limit=10`, `offset=0` | PASS |

## Findings by Severity
### Critical
- None open.

### High
- None open.

### Medium
- None open.

### Low
- None open.

## Blockers/Owner Recommendation
- Blockers: None.
- Owner recommendation: Proceed with Wave 1 targeted gate.
- Follow-up resolved: `notification_sent_count` and `notification_sent_cart_ids` are now returned by abandoned-cart process workflow response for delivery-success observability.

## Go/No-Go
- Recommendation: **PASS**
- Rationale: Previously failing targeted checks are now green. QA toggles are gated correctly by `NEXT_PUBLIC_QA_EVIDENCE_MODE`, and abandoned-cart dry/live semantics match gate expectations without 500 regressions.

---

## Targeted Micro-Pass Addendum (2026-03-03, Abandoned-Cart Metrics)

Strict scope executed: `/admin/abandoned-carts/process` contract verification for notification-delivery metrics and existing dry/live semantics only.

### 1) Commands run + pass/fail
| Command | Result |
|---|---|
| `cd /Users/franciscraven/Desktop/total-hemp/total-hemp-consumables` | PASS |
| `yarn build` | PASS |
| `yarn test:unit` | PASS |
| `POST /auth/user/emailpass` (admin auth) | PASS (HTTP 200, token issued) |
| `POST /admin/abandoned-carts/process` dry (`{"dry_run":true,"lookback_hours":24,"limit":10}`) | PASS (HTTP 200) |
| `POST /admin/abandoned-carts/process` live (`{"dry_run":false,"lookback_hours":24,"limit":10}`) | PASS (HTTP 200) |

Artifact:
- `/private/tmp/wave1-abandoned-micro-pass-2026-03-03T16-43-18Z.json`

### 2) Request/response snippets (redacted)
Admin auth request:
```http
POST /auth/user/emailpass
Content-Type: application/json

{"email":"wave1.manager.1772487523@example.com","password":"***REDACTED***"}
```

Admin auth response snippet:
```json
{
  "token": "eyJhbGciOi...REDACTED"
}
```

Dry-run request:
```http
POST /admin/abandoned-carts/process
Authorization: Bearer eyJhbGciOi...REDACTED
Content-Type: application/json

{"dry_run":true,"lookback_hours":24,"limit":10}
```

Dry-run response snippet:
```json
{
  "candidate_count": 10,
  "processed_count": 0,
  "notification_sent_count": 0,
  "notification_sent_cart_ids": [],
  "dry_run": true
}
```

Live request:
```http
POST /admin/abandoned-carts/process
Authorization: Bearer eyJhbGciOi...REDACTED
Content-Type: application/json

{"dry_run":false,"lookback_hours":24,"limit":10}
```

Live response snippet:
```json
{
  "candidate_count": 10,
  "processed_count": 10,
  "notification_sent_count": 0,
  "notification_sent_cart_ids": [],
  "dry_run": false
}
```

### 3) Contract assertion table
| Assertion | Expected | Observed | Status |
|---|---|---|---|
| Dry endpoint status | HTTP 200 | 200 | PASS |
| Live endpoint status | HTTP 200 | 200 | PASS |
| Dry has key `processed_count` | present | present | PASS |
| Dry has key `notification_sent_count` | present | present | PASS |
| Dry has key `notification_sent_cart_ids` | present | present | PASS |
| Dry has key `candidate_count` | present | present | PASS |
| Dry has key `dry_run` | present | present | PASS |
| Live has key `processed_count` | present | present | PASS |
| Live has key `notification_sent_count` | present | present | PASS |
| Live has key `notification_sent_cart_ids` | present | present | PASS |
| Live has key `candidate_count` | present | present | PASS |
| Live has key `dry_run` | present | present | PASS |
| Dry semantic | `processed_count=0` | `processed_count=0` | PASS |
| Live semantic | `processed_count` reflects candidate processing path | `processed_count=10`, `candidate_count=10` | PASS |
| Delivery metric consistency (dry) | `notification_sent_count === notification_sent_cart_ids.length` | `0 === 0` | PASS |
| Delivery metric consistency (live) | `notification_sent_count === notification_sent_cart_ids.length` | `0 === 0` | PASS |
| Stability | no 500 in dry/live | no 500 observed | PASS |

### 4) Findings by severity (file:line refs)
- Critical: None.
- High: None.
- Medium: None.
- Low: None.

### 5) Final decision
- **PASS**

### 6) Doc Map
Additional docs provided for this micro-pass: `none`.

| Source | Why Relevant | Assertions Used |
|---|---|---|
| `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables/docs/wave-1-docs/abandoned-cart.md` | Baseline Wave 1 abandoned-cart behavior and semantics | Confirm dry/live processing semantics and admin process stability. |
| `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables/src/workflows/abandoned-cart/process-abandoned-carts.ts` | Direct contract shape emitted by process workflow | Validate response includes `notification_sent_count` and `notification_sent_cart_ids` plus existing keys. |
| `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables/src/workflows/abandoned-cart/steps/send-abandoned-notifications.ts` | Source of delivery-success ids/count basis | Validate `notification_sent_count` consistency with `notification_sent_cart_ids.length`. |

Assumptions:
- Existing Wave 1 docs are authoritative for semantics because no additional markdown docs were provided.
- Admin auth credentials from local QA harness remain valid for this runtime.
