# Dev ↔ Prod Parity (Operational Notes)

## Goal
Keep the dev database aligned with production without repeated full resets.

## Recommended Flow (No Reset)
1. Run master mirror flow:
   - `yarn mirror:master`
3. Complete post-mirror manual checks:
   - `docs/post-mirror-operational-checklist.md`

This avoids wiping store configuration (sales channels, regions, stock locations, shipping profiles) and focuses on data parity.

## Inventory note
- If your storefront is running distributor-managed "infinite" stock, skip inventory mirroring.
- If local inventory parity is required, run:
  - `yarn mirror:master:all`

## When a Reset Is Unavoidable
If a reset is required, avoid the manual config slog:
1. Reset + migrate:
   - `yarn db:reset:dev`
2. Bootstrap baseline config:
   - `ALLOW_CONFIG_SEED=true medusa exec ./src/scripts/seed-config.ts`
   - or `yarn rebuild:dev:config`
3. Mirror catalog + inventory:
   - `yarn mirror:master`
   - Optional inventory parity: `yarn mirror:inventory`

## Notes
- `seed-config.ts` is intentionally guarded to avoid accidental runs. It seeds baseline store settings and ShipStation options, but it does not mirror catalog or inventory.
- Mirror scripts require valid Admin API tokens for PROD + DEV.
