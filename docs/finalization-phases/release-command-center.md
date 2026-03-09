# V1 Release Command Center

Updated: March 2, 2026

## Purpose
This document is the centralized command layer for release hardening.
Use it to coordinate phase owners, track blockers, and enforce evidence-based pass/fail gates.

## Operating Mode (Manager-Only)
- This track is manager-orchestrated.
- Implementation is executed by assigned agents.
- Manager responsibilities:
  - dispatch prompts
  - enforce ownership boundaries
  - enforce documentation intake gate
  - review outputs and decide merge readiness

## Operating Rules
1. No phase is marked complete without evidence links.
2. Any `Critical` blocker pauses downstream dependent phases.
3. All unresolved items are logged in `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables/docs/to-do-prod.md`.
4. Every agent run must update this board (status, findings, blockers).
5. No due dates are required in this push. Track readiness by status + evidence only.
6. Wave 1 implementation must follow the documented lane ownership and merge order.

## Wave 1 Scope (Locked)
- Product Reviews
- Wishlist
- Re-Order (partial exact add + unavailable summary + suggested variants)
- First-Purchase Discounts (feature flag + config; default disabled)
- Add Product Category Images
- Abandoned Cart (provider-agnostic flow)
- Meta Product Feed

## Deferred (Locked)
- Gift Message
- External-provider tutorials:
  - Segment
  - Payload
  - Contentful
  - Mailchimp
  - Phone Authentication
- Customer Tiers
- Generate Invoices
- Other heavy/niche tutorials from the Medusa tutorial list
- Agentic Commerce (Wave 2)
- Medusa v2.13.3 upgrade (post-hardening dedicated pass)

## Documentation Intake Gate (Mandatory)
Each implementation/testing agent must do this before coding/testing:
1. Ask the user for relevant Medusa markdown docs/tutorial links for assigned scope.
2. Wait for docs/links (or explicit `none`).
3. Build a short `Doc Map`:
  - doc path/link
  - why relevant
  - implementation/test decisions derived from it
4. Cite the Doc Map in deliverables.

If docs are not provided, fallback sources must be listed:
- local `docs/js-sdk/*`
- local skill references
- official Medusa docs used for exact APIs
- assumptions made

## Severity Model
- `Critical`: blocks go-live; must be fixed before release.
- `High`: can block phase completion; requires explicit acceptance if deferred.
- `Medium`: safe to defer if documented and owner assigned.
- `Low`: polish/backlog.

## Daily Cadence (Optional)
1. `09:00` Command sync:
   - Review open blockers, assign owners, confirm priorities.
2. `13:00` Midday checkpoint:
   - Validate completed fixes and unblock next phase owners.
3. `17:00` Closeout:
   - Update board status, add evidence links, refresh next-day plan.

## Critical Path (Current)
1. Phase 06 Cart UX and resilience
2. Phase 07 Checkout end-to-end
3. Phase 01 Commerce-critical backend unblockers
4. Phase 12 SEO/mobile/performance release QA
5. Final legal/compliance signoff (Phase 10)

## Dispatch Board

| Phase | Owner | Status | Gate Verdict | Evidence | Blockers |
|---|---|---|---|---|---|
| 00 Preflight and alignment | OWNER_TBD | Pending | Not started | `TBD` | `None` |
| 01 Commerce-critical backend unblockers | OWNER_TBD | In progress | Not started | `TBD` | Paid flow verification |
| 02 Foundation hardening | OWNER_TBD | In progress | Not started | `TBD` | `None` |
| 03 Home and navigation polish | OWNER_TBD | In progress | Not started | `TBD` | Theme/nav polish defects |
| 04 Catalog browsing (PLP) | OWNER_TBD | In progress | Not started | `TBD` | Final visual QA |
| 05 Product detail (PDP) | OWNER_TBD | In progress | Not started | `TBD` | Final visual QA |
| 06 Cart UX and resilience | OWNER_TBD | Pending | Not started | `TBD` | Major UI overhaul pending |
| 07 Checkout end-to-end | OWNER_TBD | Pending | Not started | `TBD` | UI legibility + paid flow |
| 08 Order confirmation/post-purchase | OWNER_TBD | In progress | Not started | `TBD` | Final smoke + copy check |
| 09 Account area completion | OWNER_TBD | In progress | Not started | `TBD` | Final auth UX polish |
| 10 Static/compliance pages | OWNER_TBD | In progress | Not started | `TBD` | Legal review signoff |
| 11 Promotions and wishlist | OWNER_TBD | Pending | Not started | `TBD` | Wishlist scope decision |
| 12 SEO/mobile/perf/release QA | OWNER_TBD | Pending | Not started | `TBD` | Lighthouse/CWV + responsive signoff |

## Wave 1 Lane Ownership and Merge Order
- Agent A: backend contracts (first merge)
- Agent B: storefront conversion integration (after A)
- Agent C: storefront catalog/presentation integration (after A, parallel with B)
- Agent D: QA/hardening evidence pass (after B/C merge)
- Manager review: pass / pass-with-risks / fail decision

## Evidence Protocol
- Save each phase report as:
  - `docs/finalization-phases/evidence/phase-XX-YYYY-MM-DD.md`
- Minimum evidence per phase:
  - Commands run and result summary
  - Route/test matrix for phase scope
  - Files changed (if any)
  - Open blockers with severity and owner

## Agent Dispatch Workflow
1. Pick the phase doc from `docs/finalization-phases/phase-XX-*.md`.
2. Use the centralized dispatch hub:
   - `docs/finalization-phases/agent-dispatch/dispatch-index.md`
   - `docs/finalization-phases/agent-dispatch/active/*.md`
3. Legacy prompts remain in `docs/finalization-phases/agent-prompts/*` for historical reference.
3. Enforce Documentation Intake Gate before coding/testing.
4. Run agent.
5. Review findings.
6. Update this command-center board and `/to-do-prod.md`.

## Standard Command Set

Storefront:
```bash
yarn lint
yarn build
yarn check:commerce-rules
```

Backend:
```bash
yarn build
yarn test:integration:http
```

Loyalty live smoke:
```bash
LOYALTY_TEST_EMAIL=... LOYALTY_TEST_PASSWORD=... yarn qa:loyalty-live
```

## Release Exit Criteria (Go/No-Go)
- All `Critical` blockers closed.
- Phase 06 and 07 have `Pass` verdicts.
- Paid order path verified in browser payment flow.
- Phase 12 report completed with acceptable risk profile.
- Legal signoff complete for compliance/policy pages.

## Decision Log
- 2026-03-02: Centralized command-center model adopted.
- 2026-03-02: Release hardening to run phase-by-phase with evidence files.
- 2026-03-02: No-due-date mode adopted; readiness tracked by status + evidence only.
- 2026-03-02: Mandatory Documentation Intake Gate adopted for all agents.
