# Dev ↔ Prod Parity (Operational Notes)

## Goal
Keep the dev database aligned with production without repeated full resets.

## Recommended Flow (No Reset)
1. Mirror catalog + metadata:
   - `yarn mirror:dev`
2. Mirror inventory levels + reservations:
   - `yarn mirror:inventory`

This avoids wiping store configuration (sales channels, regions, stock locations, shipping profiles) and focuses on data parity.

## When a Reset Is Unavoidable
If a reset is required, avoid the manual config slog:
1. Reset + migrate:
   - `yarn db:reset:dev`
2. Bootstrap baseline config:
   - `ALLOW_CONFIG_SEED=true medusa exec ./src/scripts/seed-config.ts`
   - or `yarn rebuild:dev:config`
3. Mirror catalog + inventory:
   - `yarn mirror:dev:all`

## Notes
- `seed-config.ts` is intentionally guarded to avoid accidental runs. It seeds baseline store settings and ShipStation options, but it does not mirror catalog or inventory.
- Mirror scripts require valid Admin API tokens for PROD + DEV.
