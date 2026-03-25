# Backend Review

Date: 2026-03-09
Repo: `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables`
Reviewer: Codex

## Scope
- Release-oriented backend review of current custom Medusa codepaths.
- Focus areas:
  - event subscribers
  - transactional email workflow foundation
  - ShipStation fulfillment provider/client
  - abandoned-cart admin/process routes
  - key storefront-facing store routes

## Commands Run
- `yarn build`
  - Result: PASS
- `yarn test:unit`
  - Result: PASS

## Findings

### 1. Legacy subscribers still fail open instead of using the newer safe-skip pattern
- Severity: High
- Files:
  - `src/subscribers/gamma-signup-customer-created.ts`
  - `src/subscribers/gamma-signup-customer-updated.ts`
  - `src/subscribers/order-created.ts`
  - `src/subscribers/order-placed-loyalty.ts`
  - `src/subscribers/abandoned-cart-activity.ts`
- Detail:
  - Several older subscribers still call `createNotifications(...)` or workflow `.run(...)` directly with no local `try/catch`.
  - This differs from the newer transactional-email and abandoned-cart notification paths, which log and skip safely when provider/workflow execution fails.
  - Operationally, this leaves customer/order/cart events more fragile than the release-hardening rules now expect.

### 2. ShipStation client error handling hides upstream HTTP failure context
- Severity: High
- Files:
  - `src/modules/shipstation/client.ts`
  - `src/modules/shipstation/service.ts`
- Detail:
  - The shared request helper does not check `resp.ok` and only throws when a parsed JSON body contains an `errors` array.
  - If ShipStation responds with a non-JSON 4xx/5xx payload, callers can receive a plain string and then fail later with less actionable errors.
  - This is release-relevant because ShipStation webhook/shipping notification work is the active backend lane.

### 3. ShipStation provider still carries a high `ts-ignore` / partial-typing surface
- Severity: Medium
- Files:
  - `src/modules/shipstation/service.ts`
  - `src/modules/shipstation/types.ts`
- Detail:
  - The provider still depends on multiple `// @ts-ignore` escapes around cart/order fulfillment data.
  - That makes the fulfillment integration harder to extend safely for the pending webhook/status work.
  - This is not a current build failure, but it is a maintenance and regression risk.

### 4. Abandoned-cart visibility is correctness-first but still full-scan
- Severity: Medium
- File:
  - `src/api/admin/abandoned-carts/visibility/route.ts`
- Detail:
  - The route scans all carts and post-filters candidates to keep pagination/count deterministic.
  - This is already reflected in backlog, but the review confirms it remains an accepted scale tradeoff rather than a resolved issue.

## Positive Notes
- Route mutations consistently go through workflows in the reviewed release-critical paths.
- Transactional email foundation follows the intended fail-safe pattern:
  - missing template/provider resolves to logged skip behavior instead of hard failure.
- Abandoned-cart notification send path also follows the safe-skip model.
- Current validation baseline is green:
  - `yarn build`
  - `yarn test:unit`

## Recommended Next Actions
1. Harden legacy subscribers so event-driven behavior matches the newer fail-safe standard.
2. Normalize ShipStation error handling before or alongside webhook implementation.
3. Add targeted unhappy-path unit coverage for both subscriber fail-safe behavior and ShipStation failures.
4. Keep `/admin/abandoned-carts/visibility` as a medium-priority optimization unless cart volume or operator latency makes it urgent.
