# MEMORY

Updated: 2026-03-09

## Purpose
This file is the durable operational memory for the Total Hemp application workspace.

Use it for current facts, locked decisions, canonical locations, and active risks. Do not use it for long historical narratives, prompts, or evidence logs.

## Canonical Sources
- Command center:
  - `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables/docs/finalization-phases`
- Backlog:
  - `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables/docs/to-do-prod.md`
- Agent ownership:
  - `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables/docs/agent-roster.md`
- Repo execution rules:
  - `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables/AGENTS.md`
  - `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables-storefront/AGENTS.md`
- Storefront execution docs:
  - `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables-storefront/docs`

## Current State
- Wave 1 targeted gate passed on 2026-03-03.
- Phase 13 transactional email foundation is implemented.
- Full transactional email QA gate is still pending.
- Next active backend lane is ShipStation webhook integration for shipping notifications.
- Auth entry UX overhaul and cart/checkout polish remain active storefront priorities.
- Docs command center is centralized in backend docs.
- `docs/rebuild-handoff-status.md` in the storefront repo is historical only and not an active source of truth.

## Locked Decisions
- Backend docs are the canonical cross-repo command center.
- Persistent domain agents replaced the old generic Agent A/B/C model.
- Documentation intake gate is mandatory before implementation/testing.
- Storefront Medusa traffic stays in `src/lib/data/*`.
- Storefront UI uses a local `shadcn/ui`-style component layer in `total-hemp-consumables-storefront/src/components/ui/**`; do not infer absence from package metadata because `shadcn/ui` is CLI-installed scaffolding, not a standalone runtime package.
- Backend mutations go through workflows; route handlers stay thin.
- QA query toggles only activate when `NEXT_PUBLIC_QA_EVIDENCE_MODE === "1"`.

## Active Risks
- Working tree state may contain validated but uncommitted changes; do not assume git history alone reflects current truth.
- Paid browser verification for the full non-zero checkout flow still needs explicit reconfirmation.
- Abandoned-cart unsubscribe/suppression policy remains unresolved.
- ShipStation webhook handling is not yet implemented.
- Some legacy event subscribers still bypass the newer fail-safe notification/workflow pattern and can bubble provider/workflow errors during event handling.
- ShipStation provider error handling still obscures non-JSON upstream failures, which increases diagnosis risk on the active shipping-notification lane.

## Update Discipline
- Update this file only when a durable fact changes.
- Put task lists in `docs/to-do-prod.md`.
- Put active execution state in `dispatch-index.md`.
- Put proof and gate results in `docs/finalization-phases/evidence/*.md`.
