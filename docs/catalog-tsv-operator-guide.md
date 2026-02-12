# Catalog TSV Operator Guide

This guide defines how to edit catalog TSV files safely.

## Source Files

- `docs/product-listings.tsv`
- `docs/variant-listings.tsv`

Template references:

- `docs/product-listings.template.tsv`
- `docs/variant-listings.template.tsv`

## Product TSV Rules

Required columns:

- `title`
- `handle` (unique, stable)
- `status` (`published` or `draft`)
- `type`
- `categories` (comma-separated)
- `sales_channels` (comma-separated, example: `DTCWebStore`)
- `shipping_profile` (name, example: `Default Shipping Profile`)

Common columns:

- `tags` (comma-separated)
- `thumbnail_url` (single URL)
- `images` (comma-separated URLs)
- `metadata_json` (must be valid JSON object)

## Variant TSV Rules

Required columns:

- `product_handle` (must match product `handle`)
- `sku` (unique, stable)
- `price_usd` (number in USD, ex: `22.00`)
- `manage_inventory` (`TRUE` or `FALSE`)
- `allow_backorder` (`TRUE` or `FALSE`)

Options:

- Keep option name/value pairs aligned:
  - `option_1_name` with `option_1_value`
  - `option_2_name` with `option_2_value`
  - `option_3_name` with `option_3_value`
- If an option is unused, leave both name and value blank.

Metadata:

- `metadata_json` must be a valid JSON object.
- Arrays/objects are allowed (for API usage).
- The seed process mirrors complex metadata to `<key>__json` for admin editability.

## Pricing Convention

- Canonical input is `price_usd` in dollars (`22.00`).
- `price_usd_cents` is optional helper (`2200`) and only used as fallback.

## Seeding Commands

- Dry run: `yarn seed:tsv`
- Apply: `yarn seed:tsv:apply`

Dry-run outputs:

- `docs/seed-tsv-dry-run.log`
- `docs/seed-tsv-dry-run.json`
