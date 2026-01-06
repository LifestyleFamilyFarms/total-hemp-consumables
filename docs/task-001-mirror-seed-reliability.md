# Task 001 — Mirror & Seed Reliability

## Objective
Harden the backend mirroring/seeding workflow so a fresh environment consistently mirrors production catalog and inventory without manual intervention or silent failures.

## Prerequisites
- Fresh local/staging environment with Postgres + Redis running.
- Valid Medusa Admin API tokens for both dev and prod (`MEDUSA_DEV_ADMIN_TOKEN`, `MEDUSA_PROD_ADMIN_TOKEN`).
- Ability to execute scripts in `total-hemp-consumables` repo and update TypeScript files.
- Awareness that `.env` files are *not* committed; any new env flags must be documented in `docs/status.md` and `.env.template`.

## Scope
1. **Validation of current workflow**
   - On a clean dev DB (`yarn db:reset:dev`), run `yarn mirror:dev` followed by `yarn mirror:inventory`.
   - Record any warnings/errors, especially around missing SKUs, locations, or reservations.
2. **Dry-run capability**
   - Extend `src/scripts/mirror-inventory.ts` to support an env-based dry-run mode (e.g., `INVENTORY_DRY_RUN=1`).
   - In dry-run mode, do not mutate DEV data; instead, output a concise diff of expected vs actual levels/reservations.
3. **Error handling improvements**
   - Ensure critical missing data (no stock locations, SKU without inventory item, pagination limits exceeded) cause non-zero exit codes with actionable messages.
   - Consider paginating inventory levels/reservations beyond current `limit=1000` to avoid truncation.
4. **Documentation updates**
   - Update `docs/scripts.md` with new flag(s) and behaviour.
   - Add troubleshooting guidance for common failures surfaced during validation.

## Deliverables
- Updated `src/scripts/mirror-inventory.ts` (and any helpers) implementing dry-run + improved error handling.
- Optional helper(s) for logging diffs (keep output readable for operators).
- Verified mirror run on a clean environment with logs attached to PR/notes.
- Documentation updates covering new env flags and usage.

## Definition of Done
- `yarn mirror:dev` and `yarn mirror:inventory` succeed on fresh dev environment without manual tweaks.
- Running `INVENTORY_DRY_RUN=1 yarn mirror:inventory` produces diff output and exits 0 without mutations.
- Missing prerequisites cause script failure with clear messaging (non-zero exit).
- Docs reflect new workflow (status + scripts).
