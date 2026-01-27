# Backend Scripts (total-hemp-consumables/package.json)

This file documents the backend scripts. Run them from the backend directory:

```
cd total-hemp-consumables
```

## Core
- `build` — Compile Medusa server (used for prod builds)
- `start` — Start Medusa in prod mode
- `dev` — Start Medusa in dev (watch) mode
- `predeploy` — Run DB migrations

## Seeds & Mirror
- `seed` — Medusa starter demo seed. **Do not use** for this project; it will overwrite real configuration.
- `seed-config` — Manual-only bootstrap for new environments (sales channel, region, stock location, ShipStation options).
  - Guarded by `ALLOW_CONFIG_SEED=true medusa exec ./src/scripts/seed-config.ts`
  - Prefer the Admin UI checklist instead; only run when you intentionally want an automated reset.
- _Catalog seeding_ — Temporarily manual. Follow `docs/admin-store-setup.md` and create/update products through the Admin UI until a replacement seed is defined.
- `seed:prod` — Seed catalog to PROD via Admin API (types/categories/products/variants/prices/metadata). Idempotent upsert.
  - `ts-node ./src/scripts/seed-remote.ts`
  - Requires `MEDUSA_PROD_BACKEND_URL` and `MEDUSA_PROD_ADMIN_TOKEN`
- `seed:dev` — Same as `seed:prod` but for DEV; also sets variants non‑blocking for demos (`manage_inventory=false`, `allow_backorder=true`).
  - `NODE_ENV=development ts-node ./src/scripts/seed-remote.ts`
  - Requires `MEDUSA_DEV_BACKEND_URL` and `MEDUSA_DEV_ADMIN_TOKEN`
- `mirror:dev` — Mirror catalog from PROD → DEV via Admin API (types/categories/products/variants/prices/metadata/images).
  - `ts-node ./src/scripts/mirror-prod-to-dev.ts`
  - Requires both PROD and DEV URL/token envs
- `mirror:inventory` — Mirror inventory items + levels (and reservations) from PROD → DEV by SKU and location name.
  - Mirrors `stocked_quantity` and creates reservations so `available` matches PROD.
  - `ts-node ./src/scripts/mirror-inventory.ts`
  - Optional envs: `INVENTORY_DEFAULT_QTY=100`, `INVENTORY_LOCATION_MAP='{"Prod Loc":"Dev Loc"}', INVENTORY_MIRROR_RESERVED=0`, `INVENTORY_WIPE_RESERVATIONS=0`
- `mirror:dev:all` — Run catalog mirror then inventory mirror.
  - `yarn mirror:dev && yarn mirror:inventory`

## DB Utilities (dev only)
- `db:reset:dev` — Drops and recreates the dev database defined by `DATABASE_URL`/`POSTGRES_URL`, then runs migrations.
  - `ts-node ./src/scripts/db-reset-dev.ts && medusa db:migrate`
  - DANGER: destructive. Use only for local development.

## One‑shot Dev Rebuild
- `rebuild:dev` — Drops/recreates the DB, then reminds you to follow the manual admin checklist.
  - `yarn db:reset:dev && echo 'Run the manual admin checklist (docs/admin-store-setup.md) before seeding catalog data.'`
  - Run from backend: `cd total-hemp-consumables && yarn rebuild:dev`
- `rebuild:dev:config` — Drops/recreates the DB, then runs the guarded config bootstrap.
  - `yarn db:reset:dev && ALLOW_CONFIG_SEED=true medusa exec ./src/scripts/seed-config.ts`
  - Use when you want the baseline store config (sales channel, region, tax region, stock location, ShipStation options) seeded automatically.

## Cleanup Note
This repo now keeps only production‑relevant scripts in `src/scripts`. One‑off debug utilities were removed to reduce noise; recreate them locally as needed.

## Tests
- `test:integration:http` — HTTP integration tests
- `test:integration:modules` — Module integration tests
- `test:unit` — Unit tests

## Env required (examples)
- CORS (backend .env)
  - `ADMIN_CORS=http://localhost:5173,http://localhost:9000`
  - `AUTH_CORS=http://localhost:5173,http://localhost:9000`
  - `STORE_CORS=http://localhost:8000`
- Secrets
  - `JWT_SECRET`, `COOKIE_SECRET`
- Seeding / mirroring
  - PROD: `MEDUSA_PROD_BACKEND_URL`, `MEDUSA_PROD_ADMIN_TOKEN`
  - DEV: `MEDUSA_DEV_BACKEND_URL`, `MEDUSA_DEV_ADMIN_TOKEN`
- Database
  - `DATABASE_URL=postgres://user:pass@localhost:5432/medusa_total_hemp_dev`

## Typical dev flow
1) Reset DB: `yarn db:reset:dev`
2) Complete Admin UI checklist in `docs/admin-store-setup.md` (sales channel, region, ShipStation, Authorize.Net, stock location).
3) Manually add/verify catalog data via Medusa Admin (temporary until the new seed strategy ships).
4) Start backend: `yarn dev`
5) Generate a new Admin API token in local Admin → Settings → API Keys, set `MEDUSA_DEV_ADMIN_TOKEN` in `.env`
6) Mirror prod catalog: `yarn mirror:dev` (and inventory: `yarn mirror:inventory` or `yarn mirror:dev:all`)
7) Start storefront: `cd ../total-hemp-consumables-storefront && yarn dev`

Note: After `db:reset:dev`, previously issued Admin API tokens are invalidated. Ensure `MEDUSA_DEV_ADMIN_TOKEN` is refreshed before running any Admin API mirror/seed targeting DEV.
