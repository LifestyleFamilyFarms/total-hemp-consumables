# Phase 02 Finalization: Foundation Hardening

Status: Pending

## Goal
Confirm shell/data/country-region foundations are consistent and resilient.

## Pass Checklist
- [ ] Shell contracts are stable (`Topbar`, `MobileNav`, `CartDrawer`, `AppShell`).
- [ ] Region/country routing behavior is consistent.
- [ ] `check:commerce-rules` passes.
- [ ] No raw Medusa `fetch` calls outside approved SDK patterns.
- [ ] Pickup-only mode flag behavior matches intended defaults.

## Evidence Required
- Lint/build/status summary.
- Rule-check output summary.
- File list of any exceptions requiring follow-up.

## Deep-Dive Agent Prompt
```text
Run a Phase 02 finalization pass for storefront foundation hardening.

Use skills:
- building-storefronts
- storefront-best-practices

Goal:
Validate shell contracts, integration boundaries, and policy guardrails.

Deliverable:
- Pass/fail checklist with code references
- Any boundary violations and minimal fix plan
```
