# V1 Release Command Center

Updated: 2026-03-09

## Purpose
This file is the command-center index for release hardening.

It does not duplicate phase-by-phase status boards. Use it to find the canonical operational sources of truth and the current release priorities.

## Canonical Sources Of Truth
- Durable project memory:
  - `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables/MEMORY.md`
- Active dispatch queue:
  - `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables/docs/finalization-phases/agent-dispatch/dispatch-index.md`
- Agent ownership model:
  - `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables/docs/agent-roster.md`
- Backlog and next actions:
  - `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables/docs/to-do-prod.md`
- Evidence and gate outcomes:
  - `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables/docs/finalization-phases/evidence`

## Current State
- Wave 1 targeted gate: PASS
  - Evidence: `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables/docs/finalization-phases/evidence/phase-wave1-2026-03-03-targeted-rerun.md`
- Phase 13 transactional email foundation: COMPLETE
  - Full lifecycle QA gate remains pending.
- Backend review completed on 2026-03-09.
  - Follow-up evidence: `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables/docs/finalization-phases/evidence/backend-review-2026-03-09.md`
- Highest-priority active backend lane:
  - ShipStation webhook integration for shipping notifications.
- Highest-priority active storefront lane:
  - auth entry UX overhaul and remaining cart/checkout polish.

## Operating Rules
1. Do not treat this file as a status ledger.
2. Update `MEMORY.md` only for durable facts and locked decisions.
3. Update `to-do-prod.md` for open work and priorities.
4. Update `dispatch-index.md` for active agent execution state.
5. Update `evidence/*.md` for completed validation and gate results.

## Release Exit Criteria
- No open critical blockers.
- Current active lanes have evidence-backed outcomes.
- Paid order flow has been reverified in browser checkout.
- Transactional email lifecycle gates are complete or explicitly deferred with accepted risk.
- Legal/compliance review items are signed off or explicitly excluded from release.
