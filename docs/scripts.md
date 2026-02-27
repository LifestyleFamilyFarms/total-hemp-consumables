# Backend Scripts (total-hemp-consumables/package.json)

This file documents the backend scripts. Run them from the backend directory:

```
cd total-hemp-consumables
```

For end-to-end media operating rules, see `docs/image-asset-management.md`.

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
- `media:prepare` — Build `product-media.tsv` and `variant-media.tsv` from the local media tree (`docs/thc-site-pictures` by default) and normalize known SKU folder mismatches.
  - `ts-node ./src/scripts/prepare-media-manifests.ts`
  - Writes `docs/media-prepare-report.json` with missing assets/anomalies.
- `media:prepare:dry` — Dry-run media manifest prep (no file changes).
  - `MEDIA_PREP_DRY_RUN=1 ts-node ./src/scripts/prepare-media-manifests.ts`
- `media:sync` — Upload local files directly to S3 and assign product/variant media URLs through Admin API. Dry-run by default.
  - `ts-node ./src/scripts/sync-media-to-s3.ts`
  - Requires S3 env vars (`S3_BUCKET`, `S3_REGION`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`) and media mapping TSVs.
- `media:sync:dev` / `media:sync:dev:apply` — Same sync targeting DEV explicitly (`MEDIA_TARGET_ENV=dev`).
- `media:sync:prod` / `media:sync:prod:apply` — Same sync targeting PROD explicitly (`MEDIA_TARGET_ENV=prod`).
- `media:sync:apply` — Apply mode for media sync.
  - `MEDIA_DRY_RUN=0 ts-node ./src/scripts/sync-media-to-s3.ts`
  - See `docs/media-sync-guide.md` for setup and TSV templates.
- `media:s3:gc` — Dry-run garbage collection for S3 media keys under `catalog/products` (or `MEDIA_GC_PREFIX`), keeping only URLs currently referenced by Medusa products/variants.
  - `ts-node ./src/scripts/gc-media-s3.ts`
  - Writes `docs/media-s3-gc-dry-run.json` and `docs/media-s3-gc-dry-run.log`.
- `media:s3:gc:dev` / `media:s3:gc:dev:apply` — Same GC targeting DEV explicitly (`MEDIA_TARGET_ENV=dev`).
- `media:s3:gc:prod` / `media:s3:gc:prod:apply` — Same GC targeting PROD explicitly (`MEDIA_TARGET_ENV=prod`).
- `media:s3:gc:apply` — Apply mode for S3 media garbage collection.
  - `MEDIA_GC_DRY_RUN=0 ts-node ./src/scripts/gc-media-s3.ts`
  - Safety guard: apply aborts when `referenced_urls=0` unless `MEDIA_GC_ALLOW_ZERO_REFERENCES=1`.
  - Writes `docs/media-s3-gc.json` and `docs/media-s3-gc.log`.
- `mirror:dev` — Mirror catalog from PROD → DEV via Admin API (types/categories/products/variants/prices/metadata/images).
  - `ts-node ./src/scripts/mirror-prod-to-dev.ts`
  - Requires both PROD and DEV URL/token envs
- `mirror:audit` — Audit PROD vs DEV parity for mirrored catalog/config entities and report mismatches.
  - `ts-node ./src/scripts/audit-mirror-parity.ts`
  - Optional envs: `AUDIT_VERBOSE=1`, `AUDIT_MAX_FINDINGS=200`, `AUDIT_FAIL_ON_DIFF=1`
- `mirror:master` — Master command for current distributor-managed flow (no inventory mirror): mirror catalog, then audit.
  - `yarn mirror:dev && yarn mirror:audit`
- `mirror:inventory` — Mirror inventory items + levels (and reservations) from PROD → DEV by SKU and location name.
  - Mirrors `stocked_quantity` and creates reservations so `available` matches PROD.
  - `ts-node ./src/scripts/mirror-inventory.ts`
  - Optional envs: `INVENTORY_DEFAULT_QTY=100`, `INVENTORY_LOCATION_MAP='{"Prod Loc":"Dev Loc"}', INVENTORY_MIRROR_RESERVED=0`, `INVENTORY_WIPE_RESERVATIONS=0`
- `mirror:dev:all` — Run catalog mirror then inventory mirror.
  - `yarn mirror:dev && yarn mirror:inventory`
- `mirror:master:all` — Full mirror sequence (catalog + inventory + audit).
  - `yarn mirror:dev && yarn mirror:inventory && yarn mirror:audit`

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
6) Run master mirror flow (no inventory): `yarn mirror:master`
8) Complete manual follow-up items in `docs/post-mirror-operational-checklist.md`
9) Start storefront: `cd ../total-hemp-consumables-storefront && yarn dev`

Note: After `db:reset:dev`, previously issued Admin API tokens are invalidated. Ensure `MEDUSA_DEV_ADMIN_TOKEN` is refreshed before running any Admin API mirror/seed targeting DEV.
