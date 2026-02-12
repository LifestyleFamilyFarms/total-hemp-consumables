/*
  TSV-driven catalog seed (idempotent).

  Defaults:
  - products file: docs/product-listings.tsv
  - variants file: docs/variant-listings.tsv

  Env:
  - SEED_BACKEND_URL (fallback: MEDUSA_PROD_BACKEND_URL, MEDUSA_BACKEND_URL)
  - SEED_ADMIN_TOKEN (fallback: MEDUSA_PROD_ADMIN_TOKEN, MEDUSA_ADMIN_TOKEN, MEDUSA_DEV_ADMIN_TOKEN)
  - SEED_DRY_RUN=1|0 (default: 1)
  - SEED_STRICT=1|0 (default: 1)
  - SEED_CURRENCY (default: usd)
  - SEED_PRODUCTS_FILE (optional override)
  - SEED_VARIANTS_FILE (optional override)
  - SEED_LOG_FILE (optional path for text log output)
  - SEED_REPORT_FILE (optional path for JSON report output)
  - SEED_METADATA_ADMIN_MIRROR=1|0 (default: 1) mirrors non-primitive metadata keys to
    admin-editable "<key>__json" string keys.

  Run:
    yarn seed:tsv
*/

import fs from "node:fs/promises"
import path from "node:path"
import Medusa from "@medusajs/js-sdk"
import { loadEnv } from "@medusajs/framework/utils"

type Row = Record<string, string>

type ProductRow = {
  title: string
  handle: string
  status: string
  type: string
  categories: string
  sales_channels: string
  shipping_profile: string
  subtitle: string
  description: string
  discountable: string
  collection: string
  tags: string
  thumbnail_url: string
  images: string
  metadata_json: string
}

type VariantRow = {
  product_handle: string
  variant_title: string
  sku: string
  price_usd: string
  price_usd_cents: string
  acquisition_price_usd: string
  acquisition_price_cents: string
  manage_inventory: string
  allow_backorder: string
  option_1_name: string
  option_1_value: string
  option_2_name: string
  option_2_value: string
  option_3_name: string
  option_3_value: string
  weight: string
  length: string
  width: string
  height: string
  metadata_json: string
}

type ParsedProduct = {
  row: ProductRow
  metadata: Record<string, unknown>
  categories: string[]
  salesChannels: string[]
  hasSalesChannelsColumn: boolean
  shippingProfileName: string
  hasShippingProfileColumn: boolean
  tags: string[]
  images: string[]
}

type ParsedVariant = {
  row: VariantRow
  amountUsd: number
  options: Record<string, string>
  metadata: Record<string, unknown>
}

type SeedAction = {
  entity: "product" | "option" | "variant"
  mode: "create" | "update"
  handle: string
  ref?: string
  dryRun: boolean
}

loadEnv(process.env.NODE_ENV || "development", process.cwd())

function reqEnv(primary: string, fallback: string[] = []) {
  const names = [primary, ...fallback]
  for (const name of names) {
    const value = process.env[name]
    if (value) return value
  }
  throw new Error(`Missing env: ${names.join(" or ")}`)
}

function asBool(value: string, defaultValue: boolean) {
  const v = (value || "").trim().toLowerCase()
  if (!v) return defaultValue
  if (["1", "true", "yes", "y"].includes(v)) return true
  if (["0", "false", "no", "n"].includes(v)) return false
  return defaultValue
}

function asNumber(value: string | undefined) {
  if (!value || !value.trim()) return undefined
  const n = Number(value)
  return Number.isFinite(n) ? n : undefined
}

function splitCsv(value: string) {
  return (value || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function parseJsonObject(input: string, fieldName: string, strict: boolean): Record<string, unknown> {
  const raw = (input || "").trim()
  if (!raw) return {}
  try {
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      if (strict) {
        throw new Error(`${fieldName} must be a JSON object`)
      }
      return {}
    }
    return parsed as Record<string, unknown>
  } catch (e) {
    if (strict) throw e
    console.warn(`[warn] Invalid JSON in ${fieldName}; using empty object`)
    return {}
  }
}

function parseDelimited(content: string, delimiter: string) {
  const rows: string[][] = []
  let row: string[] = []
  let field = ""
  let inQuotes = false

  for (let i = 0; i < content.length; i++) {
    const ch = content[i]
    const next = content[i + 1]

    if (inQuotes) {
      if (ch === '"') {
        if (next === '"') {
          field += '"'
          i++
        } else {
          inQuotes = false
        }
      } else {
        field += ch
      }
      continue
    }

    if (ch === '"') {
      // Only treat quotes as field wrappers when they appear at field start.
      if (field.length === 0) {
        inQuotes = true
      } else {
        field += ch
      }
      continue
    }

    if (ch === delimiter) {
      row.push(field)
      field = ""
      continue
    }

    if (ch === "\n") {
      row.push(field)
      rows.push(row)
      row = []
      field = ""
      continue
    }

    if (ch === "\r") {
      continue
    }

    field += ch
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field)
    rows.push(row)
  }

  return rows.filter((r) => r.some((v) => v.trim().length > 0))
}

async function readTsv(filePath: string) {
  const content = await fs.readFile(filePath, "utf8")
  const table = parseDelimited(content, "\t")
  if (table.length < 2) {
    throw new Error(`No data rows found in ${filePath}`)
  }

  const headers = table[0].map((h) => h.trim())
  return table.slice(1).map<Row>((values) => {
    const out: Row = {}
    headers.forEach((header, i) => {
      out[header] = (values[i] || "").trim()
    })
    return out
  })
}

function parseProducts(rows: Row[], strict: boolean) {
  const errors: string[] = []
  const parsed: ParsedProduct[] = []
  for (let i = 0; i < rows.length; i++) {
    const source = rows[i]
    const row = source as unknown as ProductRow
    const label = `products row ${i + 2}`
    if (!row.title) errors.push(`${label}: missing title`)
    if (!row.handle) errors.push(`${label}: missing handle`)
    if (!row.status) row.status = "published"

    const metadata = parseJsonObject(row.metadata_json, `${label} metadata_json`, strict)
    const categories = splitCsv(row.categories)
    const salesChannels = splitCsv(row.sales_channels || "")
    const tags = splitCsv(row.tags)
    const images = splitCsv(row.images)
    parsed.push({
      row,
      metadata,
      categories,
      salesChannels,
      hasSalesChannelsColumn: source.sales_channels !== undefined,
      shippingProfileName: (row.shipping_profile || "").trim(),
      hasShippingProfileColumn: source.shipping_profile !== undefined,
      tags,
      images,
    })
  }

  return { parsed, errors }
}

function parseVariants(rows: Row[], strict: boolean) {
  const errors: string[] = []
  const parsed: ParsedVariant[] = []
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i] as unknown as VariantRow
    const label = `variants row ${i + 2}`
    if (!row.product_handle) errors.push(`${label}: missing product_handle`)
    if (!row.sku) errors.push(`${label}: missing sku`)

    let amountUsd = asNumber(row.price_usd)
    if (amountUsd === undefined) {
      const cents = asNumber(row.price_usd_cents)
      if (cents !== undefined) amountUsd = cents / 100
    }
    if (amountUsd === undefined) {
      errors.push(`${label}: missing price_usd or price_usd_cents`)
      amountUsd = 0
    }

    const options: Record<string, string> = {}
    const pairs: Array<[string, string]> = [
      [row.option_1_name, row.option_1_value],
      [row.option_2_name, row.option_2_value],
      [row.option_3_name, row.option_3_value],
    ]
    for (const [name, value] of pairs) {
      if (name && value) options[name] = value
      if (!!name !== !!value) {
        errors.push(`${label}: option name/value mismatch (${name || "empty"} / ${value || "empty"})`)
      }
    }

    const metadata = parseJsonObject(row.metadata_json, `${label} metadata_json`, strict)
    const acqUsd = asNumber(row.acquisition_price_usd)
    const acqCents = asNumber(row.acquisition_price_cents)
    if (acqUsd !== undefined) metadata.acquisition_price_usd = acqUsd
    if (acqCents !== undefined) metadata.acquisition_price_cents = acqCents

    parsed.push({ row, amountUsd, options, metadata })
  }

  return { parsed, errors }
}

function optionMapForProduct(variants: ParsedVariant[]) {
  const map = new Map<string, Set<string>>()
  for (const v of variants) {
    for (const [k, val] of Object.entries(v.options)) {
      if (!map.has(k)) map.set(k, new Set<string>())
      map.get(k)!.add(val)
    }
  }
  return [...map.entries()].map(([title, values]) => ({
    title,
    values: [...values].sort(),
  }))
}

function withAdminEditableMetadata(
  metadata: Record<string, unknown>,
  enabled: boolean
): Record<string, unknown> {
  if (!enabled) return metadata

  const out: Record<string, unknown> = { ...metadata }
  const mirroredKeys: string[] = []
  for (const [key, value] of Object.entries(metadata)) {
    if (value === null) continue
    if (Array.isArray(value) || typeof value === "object") {
      const mirrorKey = `${key}__json`
      if (!(mirrorKey in out)) {
        out[mirrorKey] = JSON.stringify(value)
      }
      mirroredKeys.push(key)
    }
  }

  if (mirroredKeys.length && !("__admin_json_keys" in out)) {
    out.__admin_json_keys = mirroredKeys.join(",")
  }
  return out
}

function buildVariantPayload(
  variant: ParsedVariant,
  currencyCode: string,
  mirrorComplexMetadata: boolean
) {
  const v = variant.row
  const payload: Record<string, unknown> = {
    title: v.variant_title || v.sku,
    sku: v.sku,
    prices: [{ currency_code: currencyCode, amount: variant.amountUsd }],
    options: variant.options,
    manage_inventory: asBool(v.manage_inventory, false),
    allow_backorder: asBool(v.allow_backorder, true),
    weight: asNumber(v.weight),
    length: asNumber(v.length),
    width: asNumber(v.width),
    height: asNumber(v.height),
    metadata: withAdminEditableMetadata(variant.metadata, mirrorComplexMetadata),
  }

  Object.keys(payload).forEach((k) => {
    if (payload[k] === undefined) delete payload[k]
  })

  return payload
}

async function main() {
  const backendUrl = reqEnv("SEED_BACKEND_URL", ["MEDUSA_PROD_BACKEND_URL", "MEDUSA_BACKEND_URL"]).replace(
    /\/+$/,
    ""
  )
  const adminToken = reqEnv("SEED_ADMIN_TOKEN", [
    "MEDUSA_PROD_ADMIN_TOKEN",
    "MEDUSA_ADMIN_TOKEN",
    "MEDUSA_DEV_ADMIN_TOKEN",
  ])
  const strict = asBool(process.env.SEED_STRICT || "", true)
  const dryRun = asBool(process.env.SEED_DRY_RUN || "", true)
  const mirrorComplexMetadata = asBool(process.env.SEED_METADATA_ADMIN_MIRROR || "", true)
  const currencyCode = (process.env.SEED_CURRENCY || "usd").toLowerCase()
  const defaultLogPath = dryRun ? path.join(process.cwd(), "docs", "seed-tsv-dry-run.log") : ""
  const defaultReportPath = dryRun ? path.join(process.cwd(), "docs", "seed-tsv-dry-run.json") : ""
  const logFile = process.env.SEED_LOG_FILE || defaultLogPath
  const reportFile = process.env.SEED_REPORT_FILE || defaultReportPath

  const productsFile = process.env.SEED_PRODUCTS_FILE || path.join(process.cwd(), "docs", "product-listings.tsv")
  const variantsFile =
    process.env.SEED_VARIANTS_FILE || path.join(process.cwd(), "docs", "variant-listings.tsv")

  const logs: string[] = []
  const actions: SeedAction[] = []

  const info = (message: string) => {
    logs.push(message)
    console.log(message)
  }
  const warn = (message: string) => {
    logs.push(message)
    console.warn(message)
  }
  const error = (message: string) => {
    logs.push(message)
    console.error(message)
  }
  const recordAction = (action: SeedAction) => {
    actions.push(action)
    const line = `[${action.dryRun ? "dry-run" : "apply"}] ${action.mode} ${action.entity}: ${action.handle}${
      action.ref ? ` -> ${action.ref}` : ""
    }`
    info(line)
  }

  const sdk = new Medusa({ baseUrl: backendUrl, apiKey: adminToken })
  const typeIdByValue = new Map<string, string>()
  const categoryIdByHandle = new Map<string, string>()
  const collectionIdByHandle = new Map<string, string>()
  const tagIdByValue = new Map<string, string>()
  const salesChannelIdByName = new Map<string, string>()
  const shippingProfileIdByName = new Map<string, string>()

  let createdProducts = 0
  let updatedProducts = 0
  let createdVariants = 0
  let updatedVariants = 0
  let runErrorMessage = ""

  try {
    const [productRows, variantRows] = await Promise.all([readTsv(productsFile), readTsv(variantsFile)])
    const { parsed: products, errors: productErrors } = parseProducts(productRows, strict)
    const { parsed: variants, errors: variantErrors } = parseVariants(variantRows, strict)

    const variantByProduct = new Map<string, ParsedVariant[]>()
    for (const variant of variants) {
      const handle = variant.row.product_handle
      if (!variantByProduct.has(handle)) variantByProduct.set(handle, [])
      variantByProduct.get(handle)!.push(variant)
    }

    const validationErrors = [...productErrors, ...variantErrors]
    for (const product of products) {
      if (!variantByProduct.has(product.row.handle)) {
        validationErrors.push(`No variants found for product handle "${product.row.handle}"`)
      }
    }
    for (const handle of variantByProduct.keys()) {
      if (!products.find((p) => p.row.handle === handle)) {
        validationErrors.push(`Variant references unknown product handle "${handle}"`)
      }
    }

    if (validationErrors.length) {
      for (const err of validationErrors) error(`- ${err}`)
      throw new Error(`Validation failed with ${validationErrors.length} error(s)`)
    }

    info(`[seed-from-tsv] backend: ${backendUrl}`)
    info(`[seed-from-tsv] products: ${products.length}, variants: ${variants.length}`)
    info(`[seed-from-tsv] dry-run: ${dryRun ? "yes" : "no"}`)

  async function upsertType(value: string) {
    const key = value.toLowerCase()
    if (typeIdByValue.has(key)) return typeIdByValue.get(key)!
    const list = await sdk.client.fetch<{ product_types: { id: string; value: string }[] }>(
      "/admin/product-types",
      { method: "GET", query: { limit: 100 } }
    )
    const existing = (list.product_types || []).find((x) => (x.value || "").toLowerCase() === key)
    if (existing) {
      typeIdByValue.set(key, existing.id)
      return existing.id
    }
    if (dryRun) {
      const dryId = `dry-type-${slugify(value)}`
      typeIdByValue.set(key, dryId)
      return dryId
    }
    const created = await sdk.client.fetch<{ product_type: { id: string } }>("/admin/product-types", {
      method: "POST",
      body: { value },
    })
    typeIdByValue.set(key, created.product_type.id)
    return created.product_type.id
  }

  async function upsertCategory(name: string) {
    const handle = slugify(name)
    if (categoryIdByHandle.has(handle)) return categoryIdByHandle.get(handle)!
    const list = await sdk.client.fetch<{ product_categories: { id: string; handle: string }[] }>(
      "/admin/product-categories",
      { method: "GET", query: { limit: 100, handle } }
    )
    const existing = (list.product_categories || [])[0]
    if (existing) {
      categoryIdByHandle.set(handle, existing.id)
      return existing.id
    }
    if (dryRun) {
      const dryId = `dry-category-${handle}`
      categoryIdByHandle.set(handle, dryId)
      return dryId
    }
    const created = await sdk.client.fetch<{ product_category: { id: string } }>("/admin/product-categories", {
      method: "POST",
      body: { name, handle, is_active: true },
    })
    categoryIdByHandle.set(handle, created.product_category.id)
    return created.product_category.id
  }

  async function upsertCollection(title: string) {
    const handle = slugify(title)
    if (collectionIdByHandle.has(handle)) return collectionIdByHandle.get(handle)!
    const list = await sdk.client.fetch<{ collections: { id: string; handle: string }[] }>("/admin/collections", {
      method: "GET",
      query: { limit: 100, handle },
    })
    const existing = (list.collections || [])[0]
    if (existing) {
      collectionIdByHandle.set(handle, existing.id)
      return existing.id
    }
    if (dryRun) {
      const dryId = `dry-collection-${handle}`
      collectionIdByHandle.set(handle, dryId)
      return dryId
    }
    const created = await sdk.client.fetch<{ collection: { id: string } }>("/admin/collections", {
      method: "POST",
      body: { title, handle },
    })
    collectionIdByHandle.set(handle, created.collection.id)
    return created.collection.id
  }

  async function upsertTag(value: string) {
    const key = value.toLowerCase()
    if (tagIdByValue.has(key)) return tagIdByValue.get(key)!
    const list = await sdk.client.fetch<{ product_tags: { id: string; value: string }[] }>("/admin/product-tags", {
      method: "GET",
      query: { limit: 100, value },
    })
    const existing = (list.product_tags || []).find((x) => (x.value || "").toLowerCase() === key)
    if (existing) {
      tagIdByValue.set(key, existing.id)
      return existing.id
    }
    if (dryRun) {
      const dryId = `dry-tag-${slugify(value)}`
      tagIdByValue.set(key, dryId)
      return dryId
    }
    const created = await sdk.client.fetch<{ product_tag: { id: string } }>("/admin/product-tags", {
      method: "POST",
      body: { value },
    })
    tagIdByValue.set(key, created.product_tag.id)
    return created.product_tag.id
  }

  async function upsertSalesChannel(name: string) {
    const key = name.toLowerCase()
    if (salesChannelIdByName.has(key)) return salesChannelIdByName.get(key)!
    const list = await sdk.client.fetch<{ sales_channels: { id: string; name: string }[] }>("/admin/sales-channels", {
      method: "GET",
      query: { limit: 100, name },
    })
    const existing = (list.sales_channels || []).find((x) => (x.name || "").toLowerCase() === key)
    if (existing) {
      salesChannelIdByName.set(key, existing.id)
      return existing.id
    }
    if (dryRun) {
      const dryId = `dry-sales-channel-${slugify(name)}`
      salesChannelIdByName.set(key, dryId)
      return dryId
    }
    const created = await sdk.client.fetch<{ sales_channel: { id: string } }>("/admin/sales-channels", {
      method: "POST",
      body: { name },
    })
    salesChannelIdByName.set(key, created.sales_channel.id)
    return created.sales_channel.id
  }

  async function resolveShippingProfileId(name: string) {
    const key = name.toLowerCase()
    if (shippingProfileIdByName.has(key)) return shippingProfileIdByName.get(key)!
    const list = await sdk.client.fetch<{ shipping_profiles: { id: string; name: string }[] }>("/admin/shipping-profiles", {
      method: "GET",
      query: { limit: 100, name },
    })
    const existing = (list.shipping_profiles || []).find((x) => (x.name || "").toLowerCase() === key)
    if (!existing) {
      throw new Error(`Shipping profile "${name}" was not found`)
    }
    shippingProfileIdByName.set(key, existing.id)
    return existing.id
  }

    for (const product of products) {
    const p = product.row
    const pVariants = variantByProduct.get(p.handle) || []

    const typeId = p.type ? await upsertType(p.type) : undefined
    const categoryIds = await Promise.all(product.categories.map((name) => upsertCategory(name)))
    const collectionId = p.collection ? await upsertCollection(p.collection) : undefined
    const tagIds = await Promise.all(product.tags.map((value) => upsertTag(value)))
    const salesChannelIds = await Promise.all(product.salesChannels.map((value) => upsertSalesChannel(value)))
    const shippingProfileId =
      product.hasShippingProfileColumn && product.shippingProfileName
        ? await resolveShippingProfileId(product.shippingProfileName)
        : undefined

    const basePayload: Record<string, unknown> = {
      title: p.title,
      handle: p.handle,
      status: p.status || "published",
      subtitle: p.subtitle || undefined,
      description: p.description || undefined,
      discountable: asBool(p.discountable, true),
      type_id: typeId,
      collection_id: collectionId,
      categories: categoryIds.map((id) => ({ id })),
      tags: tagIds.map((id) => ({ id })),
      thumbnail: p.thumbnail_url || undefined,
      images: product.images.map((url) => ({ url })),
      metadata: withAdminEditableMetadata(product.metadata, mirrorComplexMetadata),
    }
    if (product.hasSalesChannelsColumn) {
      basePayload.sales_channels = salesChannelIds.map((id) => ({ id }))
    }
    if (product.hasShippingProfileColumn && shippingProfileId) {
      basePayload.shipping_profile_id = shippingProfileId
    }

    const optionsNeeded = optionMapForProduct(pVariants)
    const createVariantsPayload = pVariants.map((variant) =>
      buildVariantPayload(variant, currencyCode, mirrorComplexMetadata)
    )

    const existing = await sdk.client
      .fetch<{ products: Array<{ id: string; handle: string }> }>("/admin/products", {
        method: "GET",
        query: { handle: p.handle, limit: 1 },
      })
      .then((r) => r.products?.[0])

    let productId = existing?.id

    if (dryRun) {
      recordAction({
        entity: "product",
        mode: existing ? "update" : "create",
        handle: p.handle,
        dryRun: true,
      })
      if (existing) updatedProducts++
      else createdProducts++
      productId = productId || `dry-product-${p.handle}`
    } else if (existing) {
      await sdk.client.fetch(`/admin/products/${existing.id}`, {
        method: "POST",
        body: basePayload,
      })
      updatedProducts++
    } else {
      const created = await sdk.client.fetch<{ product: { id: string } }>("/admin/products", {
        method: "POST",
        body: {
          ...basePayload,
          options: optionsNeeded,
          variants: createVariantsPayload,
        },
      })
      productId = created.product.id
      createdProducts++
      createdVariants += createVariantsPayload.length
    }

    if (!productId) continue
    if (!dryRun && !existing) continue

    if (optionsNeeded.length) {
      const existingOptions = dryRun
        ? []
        : await sdk.client
            .fetch<{ product_options: Array<{ id: string; title: string; values?: Array<{ value: string }> }> }>(
              `/admin/products/${productId}/options`,
              { method: "GET", query: { limit: 100 } }
            )
            .then((r) => r.product_options || [])

      const optionByTitle = new Map(existingOptions.map((o) => [o.title.toLowerCase(), o]))
      for (const option of optionsNeeded) {
        const existingOption = optionByTitle.get(option.title.toLowerCase())
        if (dryRun) {
          recordAction({
            entity: "option",
            mode: existingOption ? "update" : "create",
            handle: p.handle,
            ref: option.title,
            dryRun: true,
          })
          continue
        }

        if (!existingOption) {
          await sdk.client.fetch(`/admin/products/${productId}/options`, {
            method: "POST",
            body: option,
          })
          continue
        }

        const existingValues = new Set((existingOption.values || []).map((v) => v.value))
        const mergedValues = [...new Set([...existingValues, ...option.values])]
        await sdk.client.fetch(`/admin/products/${productId}/options/${existingOption.id}`, {
          method: "POST",
          body: { title: option.title, values: mergedValues },
        })
      }
    }

    const existingVariants = dryRun
      ? []
      : await sdk.client
          .fetch<{ variants: Array<{ id: string; sku: string }> }>(`/admin/products/${productId}/variants`, {
            method: "GET",
            query: { limit: 300 },
          })
          .then((r) => r.variants || [])

    const variantIdBySku = new Map(
      existingVariants
        .filter((v) => !!v.sku)
        .map((v) => [v.sku.toLowerCase(), v.id] as const)
    )

    for (const variant of pVariants) {
      const v = variant.row
      const existingVariantId = variantIdBySku.get(v.sku.toLowerCase())
      const variantPayload = buildVariantPayload(variant, currencyCode, mirrorComplexMetadata)

      if (dryRun) {
        recordAction({
          entity: "variant",
          mode: existingVariantId ? "update" : "create",
          handle: p.handle,
          ref: v.sku,
          dryRun: true,
        })
        if (existingVariantId) updatedVariants++
        else createdVariants++
        continue
      }

      if (existingVariantId) {
        await sdk.client.fetch(`/admin/products/${productId}/variants/${existingVariantId}`, {
          method: "POST",
          body: variantPayload,
        })
        updatedVariants++
      } else {
        await sdk.client.fetch(`/admin/products/${productId}/variants`, {
          method: "POST",
          body: variantPayload,
        })
        createdVariants++
      }
    }
  }

    info(
      `[seed-from-tsv] complete. products: +${createdProducts}/~${updatedProducts}, variants: +${createdVariants}/~${updatedVariants}`
    )
  } catch (err: any) {
    runErrorMessage = err?.message || String(err)
    throw err
  } finally {
    const reportPayload = {
      generated_at: new Date().toISOString(),
      backend_url: backendUrl,
      dry_run: dryRun,
      strict,
      currency_code: currencyCode,
      products_file: productsFile,
      variants_file: variantsFile,
      summary: {
        products_created: createdProducts,
        products_updated: updatedProducts,
        variants_created: createdVariants,
        variants_updated: updatedVariants,
      },
      error: runErrorMessage || null,
      actions,
    }

    if (logFile) {
      await fs.mkdir(path.dirname(logFile), { recursive: true })
      await fs.writeFile(logFile, `${logs.join("\n")}\n`, "utf8")
      info(`[seed-from-tsv] log written: ${logFile}`)
    }

    if (reportFile) {
      await fs.mkdir(path.dirname(reportFile), { recursive: true })
      await fs.writeFile(reportFile, `${JSON.stringify(reportPayload, null, 2)}\n`, "utf8")
      info(`[seed-from-tsv] report written: ${reportFile}`)
    }
  }
}

main().catch((err) => {
  console.error("[seed-from-tsv] failed")
  console.error(err)
  process.exit(1)
})
