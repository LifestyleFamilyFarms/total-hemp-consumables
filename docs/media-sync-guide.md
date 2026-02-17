# Media Sync Guide (Direct S3 + Medusa Assignment)

This workflow uploads local images straight to S3, then assigns URLs to products and variants through the Admin API.

## Why this workflow

- Avoids manual image picking in Admin.
- Keeps deterministic file naming and URL paths.
- Supports dry-run before writing anything.

## Environment targeting

Media scripts support explicit target selection:

- `MEDIA_TARGET_ENV=dev` uses `MEDUSA_DEV_BACKEND_URL` + `MEDUSA_DEV_ADMIN_TOKEN`
- `MEDIA_TARGET_ENV=prod` uses `MEDUSA_PROD_BACKEND_URL` + `MEDUSA_PROD_ADMIN_TOKEN`
- If `MEDIA_TARGET_ENV` is unset, scripts keep legacy behavior (`MEDIA_BACKEND_URL` / `MEDIA_ADMIN_TOKEN` fallbacks)

Use the dedicated `:dev` / `:prod` scripts below to avoid accidental cross-environment writes.

## Files

- Product mapping: `docs/product-media.tsv`
- Variant mapping: `docs/variant-media.tsv`
- Local image root: `MEDIA_IMAGES_ROOT` (project default in `.env` is `docs/thc-site-pictures`)

Use templates:

- `docs/product-media.template.tsv`
- `docs/variant-media.template.tsv`

## TSV schema

### `product-media.tsv`

Columns:

- `product_handle` (required)
- `thumbnail_file` (optional)
- `image_files` (optional; comma-separated)
- `replace_images` (optional; default `TRUE`)

Notes:

- `thumbnail_file` and `image_files` are paths relative to `MEDIA_IMAGES_ROOT` unless absolute.
- You can also pass full URLs and skip upload for that cell.

### `variant-media.tsv`

Columns:

- `product_handle` (required)
- `sku` (required)
- `thumbnail_file` (required)
- `image_files` (optional; comma-separated, variant-specific full/gallery assets)

## Recommended naming convention

Use filename tokens to avoid confusion across thumb/full assets:

- Product thumbnail: `{handle}__product__thumb.jpg`
- Product gallery/full: `{handle}__product__full__01.jpg`
- Variant thumbnail: `{handle}__{sku}__thumb.jpg`

For deterministic gallery order during `media:prepare`, you can prefix files with
an order token such as `01_`, `02_`, `03_`. Example: `01_front.webp`, `02_back.webp`.

## Run

From backend folder:

### 1) Prepare manifests from your media folders

```bash
yarn media:prepare
```

This generates:

- `docs/product-media.tsv`
- `docs/variant-media.tsv`
- `docs/media-prepare-report.json`

For preview-only:

```bash
yarn media:prepare:dry
```

### 2) Dry-run upload + assignment

DEV:

```bash
yarn media:sync:dev
```

PROD:

```bash
yarn media:sync:prod
```

Dry-run is default (`MEDIA_DRY_RUN=1`).

### 3) Apply changes:

DEV:

```bash
yarn media:sync:dev:apply
```

PROD:

```bash
yarn media:sync:prod:apply
```

### 4) (Optional) Clean up unreferenced S3 media

Always run dry-run first:

DEV:

```bash
yarn media:s3:gc:dev
```

PROD:

```bash
yarn media:s3:gc:prod
```

Apply deletion after reviewing the dry-run report:

DEV:

```bash
yarn media:s3:gc:dev:apply
```

PROD:

```bash
yarn media:s3:gc:prod:apply
```

This only targets keys under `MEDIA_GC_PREFIX` (default: `catalog/products`) and
keeps objects currently referenced by Medusa product/variant media fields.

Safety guard:

- Apply mode now refuses deletion when `referenced_urls=0` unless `MEDIA_GC_ALLOW_ZERO_REFERENCES=1`.
- This prevents wiping a shared bucket/prefix when a target environment has little or no media attached.

## Outputs

- Dry-run log: `docs/media-sync-dry-run.log`
- Dry-run report: `docs/media-sync-dry-run.json`
- Apply log: `docs/media-sync.log`
- Apply report: `docs/media-sync.json`
- S3 GC dry-run log: `docs/media-s3-gc-dry-run.log`
- S3 GC dry-run report: `docs/media-s3-gc-dry-run.json`
- S3 GC apply log: `docs/media-s3-gc.log`
- S3 GC apply report: `docs/media-s3-gc.json`

## Important behavior

- Product updates set `thumbnail` and `images`.
- Variant updates set `thumbnail`.
- S3 uploads use `MEDIA_S3_OBJECT_ACL=public-read` by default so media URLs can render publicly.
- If `MEDIA_WRITE_METADATA=1` (default), source filenames are mirrored into metadata keys for auditing.
- Upload keys are deterministic under `MEDIA_S3_PREFIX` (default: `catalog`).

## S3 GC env knobs

- `MEDIA_GC_DRY_RUN` (default `1`)
- `MEDIA_GC_STRICT` (default `1`)
- `MEDIA_GC_PREFIX` (default `catalog/products`)
- `MEDIA_GC_DELETE_BATCH` (default `500`, max `1000`)
- `MEDIA_GC_ALLOW_ZERO_REFERENCES` (default `0`)
- `MEDIA_GC_LOG_FILE`
- `MEDIA_GC_REPORT_FILE`
