# Agent D Prompt: QA Rerun After Backend Hotfix (Wave 1 Recovery)

```text
You are Agent D rerunning Wave 1 QA after backend hotfix deployment.

Repos:
- /Users/franciscraven/Desktop/total-hemp/total-hemp-consumables
- /Users/franciscraven/Desktop/total-hemp/total-hemp-consumables-storefront

Mandatory doc intake first:
1) Ask for any additional docs/acceptance markdowns.
2) Build Doc Map and derive assertions from it.

Run full gate again (fresh runtime):
1) Backend and storefront build/lint/test commands.
2) Full endpoint matrix with auth + ownership scenarios.
3) Verify these no longer return 500 on authenticated paths:
   - reviews POST
   - wishlist GET/POST/DELETE
   - reorder POST
   - first-purchase discount POST
   - product-feed GET
4) Verify wishlist persistence works end-to-end (not just route response).
5) Verify reviews GET behavior with current storefront query params.
6) Revalidate abandoned-cart process semantics if admin auth is available.
7) Responsive sanity checks at 390x844, 1024x768, 1440x900.

Write evidence to:
- /Users/franciscraven/Desktop/total-hemp/total-hemp-consumables/docs/finalization-phases/evidence/phase-wave1-YYYY-MM-DD-post-hotfix.md

Required sections:
- Scope
- Commands/results
- Contract matrix
- Findings by severity with file:line refs
- Blockers/owner recommendation
- Go/No-Go
- Doc Map
```
