# Agent D Prompt: Wave 1 Targeted Gate Rerun (Post-Remediation)

```text
You are Agent D running a targeted Wave 1 rerun after focused remediations.

Repos:
- /Users/franciscraven/Desktop/total-hemp/total-hemp-consumables
- /Users/franciscraven/Desktop/total-hemp/total-hemp-consumables-storefront

Read first:
- /Users/franciscraven/Desktop/total-hemp/total-hemp-consumables/docs/finalization-phases/evidence/phase-wave1-2026-03-02-post-hotfix.md
- /Users/franciscraven/Desktop/total-hemp/total-hemp-consumables/docs/finalization-phases/agent-prompts/agent-d-qa-hardening.md

Mandatory doc intake first:
1) Ask for any additional docs/acceptance markdowns.
2) Build Doc Map and derive assertions from it.

Targeted verification scope
1) Abandoned-cart admin process semantics:
   - POST /admin/abandoned-carts/process
     - dry_run=true, limit=10 and 500
     - dry_run=false, limit=10 and 500
   - Confirm no 500 on authenticated admin path.
   - Confirm dry_run=true => processed_count=0.
   - Confirm dry_run=false semantics are deterministic and non-crashing
     (processed_count may be 0 if provider/template unavailable).
2) Storefront reorder UX acceptance:
   - action trigger
   - result sections render for returned payload
   - no-auto-substitution message present
   - cart handoff CTA behavior
3) Storefront first-purchase discount UX acceptance:
   - guest gate behavior
   - signed-in behavior
   - disabled-feature reason visibility
4) Reviews/wishlist evidence closure:
   - pending moderation and error-state visibility for reviews
   - authenticated add/remove/refetch evidence for wishlist

Core sanity checks (still required):
- backend `yarn build`, `yarn test:unit`
- storefront `yarn lint`, `yarn build`
- confirm no regressions on Wave 1 API paths previously fixed

Evidence output:
- /Users/franciscraven/Desktop/total-hemp/total-hemp-consumables/docs/finalization-phases/evidence/phase-wave1-YYYY-MM-DD-targeted-rerun.md

Required report sections:
1) Scope
2) Commands/results
3) Targeted contract matrix
4) Findings by severity with file:line refs
5) Blockers + owner recommendation
6) Go/No-Go
7) Doc Map
```
