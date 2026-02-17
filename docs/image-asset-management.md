# Image Asset Management Runbook

This is the single operating guide for product/variant media in Total Hemp.

## Environment Targeting

- Use `MEDIA_TARGET_ENV=dev|prod` (or the `:dev` / `:prod` yarn scripts) so writes go to the intended Medusa environment.
- `dev` resolves `MEDUSA_DEV_BACKEND_URL` + `MEDUSA_DEV_ADMIN_TOKEN`.
- `prod` resolves `MEDUSA_PROD_BACKEND_URL` + `MEDUSA_PROD_ADMIN_TOKEN`.
- If unset, scripts use legacy `MEDIA_BACKEND_URL`/`MEDIA_ADMIN_TOKEN` fallback behavior.

## Source Of Truth

- Media source: `docs/thc-site-pictures`
- Manifest outputs:
  - `docs/product-media.tsv`
  - `docs/variant-media.tsv`
- Production truth: Medusa product + variant media URLs

Do not hand-curate production media in Admin if the same change can be made through the manifest workflow.

## Folder Standard

Use this structure:

`<group>/products/<sku>/full/<files>`

Optional only if truly different crop:

`<group>/products/<sku>/thumbs/<files>`

Notes:

- One SKU per folder.
- No mixed SKUs in one folder.
- Prefer full-only sets. Next/Image can render smaller display thumbs.
- Duplicate shared files across SKU folders when variants share media.

## File Naming And Order

- Prefer stable, descriptive names.
- For explicit gallery order, prefix files:
  - `01_front.webp`
  - `02_back.webp`
  - `03_label.webp`

`media:prepare` now honors numeric prefixes first, then falls back to smart sorting.

## Standard Workflow

1. Add or update files in `docs/thc-site-pictures`.
2. Generate manifests:
   - `yarn media:prepare`
3. Check report:
   - `docs/media-prepare-report.json`
4. Dry-run sync:
   - DEV: `yarn media:sync:dev`
   - PROD: `yarn media:sync:prod`
5. Apply sync:
   - DEV: `yarn media:sync:dev:apply`
   - PROD: `yarn media:sync:prod:apply`
6. Spot-check Admin and storefront.

## S3 Cleanup Workflow

Run only after media sync is correct.

1. Dry-run GC:
   - DEV: `yarn media:s3:gc:dev`
   - PROD: `yarn media:s3:gc:prod`
2. Review:
   - `docs/media-s3-gc-dry-run.json`
3. Apply:
   - DEV: `yarn media:s3:gc:dev:apply`
   - PROD: `yarn media:s3:gc:prod:apply`
4. Re-run dry-run; expected:
   - `delete_candidates = 0`

## Guardrails

- Never delete S3 objects manually first.
- Always run dry-runs before apply commands.
- Keep `MEDIA_GC_PREFIX` scoped (default: `catalog/products`).
- Keep `MEDIA_GC_ALLOW_ZERO_REFERENCES=0` unless you intentionally want deletion from an empty-reference environment.
- Keep `.gitignore` excluding `docs/thc-site-pictures`.
- Treat manifest files as review artifacts before apply.

## Quality Checklist (Before Apply)

- `missing_sku_dirs = 0`
- `missing_assets = 0`
- No accidental low-res files in `full/`
- `variant-media.tsv` rows exist for all seeded SKUs
- `product-media.tsv` and `variant-media.tsv` ordering looks correct

## Troubleshooting

- Variant showing wrong media:
  - Re-run `media:prepare` and the correct apply command (`media:sync:dev:apply` or `media:sync:prod:apply`)
  - Verify against `docs/variant-media.tsv`
- Old images still in S3:
  - Run GC workflow
- Gallery order unexpected:
  - Add numeric filename prefixes and regenerate manifests
