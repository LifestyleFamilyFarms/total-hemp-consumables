/*
  Idempotent remote seed for Medusa Admin API

  Env required:
  - MEDUSA_PROD_BACKEND_URL or see .env template 
  - MEDUSA_DEV_ADMIN_TOKEN or see .env templater (Admin API token from Settings → API Keys)

  Run:
    yarn ts-node src/scripts/seed-remote.ts

  Notes:
  - This script focuses on creating product types, categories, and product option schemas
    for Flower, Edibles, and Beverages. It also demonstrates creating example products
    with properly structured variants/metadata, but you can comment those out or extend
    them to your catalog.
  - It is safe to rerun; it will upsert by handle/value when possible.
*/

import Medusa from "@medusajs/js-sdk"
import { loadEnv } from "@medusajs/framework/utils"

type AdminListResponse<T> = { count: number; [k: string]: any } & Record<string, T[]>

function requiredEnv(primary: string, fallback?: string) {
  const v = process.env[primary] || (fallback ? process.env[fallback] : undefined)
  if (!v) throw new Error(`Missing env: ${primary}${fallback ? ` (or ${fallback})` : ""}`)
  return v
}

// Load .env from project root so you can set vars in total-hemp-consumables/.env
loadEnv(process.env.NODE_ENV || "development", process.cwd())

// Prefer explicitly delineated vars, fall back to legacy names
const BASE_URL = requiredEnv("MEDUSA_PROD_BACKEND_URL", "MEDUSA_BACKEND_URL").replace(/\/+$/, "")
const ADMIN_TOKEN = requiredEnv("MEDUSA_DEV_ADMIN_TOKEN", "MEDUSA_ADMIN_TOKEN")
const sdk = new Medusa({ baseUrl: BASE_URL, apiKey: ADMIN_TOKEN })

async function upsertProductType(value: string) {
  const key = "product_types"
  const list = await sdk.client
    .fetch<AdminListResponse<{ id: string; value: string }>>(`/admin/product-types`, {
      method: "GET",
      query: { limit: 100 },
    })
    .then((r) => r[key] || [])
    .catch(() => [])

  const existing = list.find((t) => t.value?.toLowerCase() === value.toLowerCase())
  if (existing) return existing

  const created = await sdk.client.fetch<{ product_type: { id: string; value: string } }>(
    `/admin/product-types`,
    { method: "POST", body: { value } }
  )
  return created.product_type
}

async function getDefaultSalesChannelId(): Promise<string | undefined> {
  // Try by name first
  const list = await sdk.client
    .fetch<AdminListResponse<{ id: string; name: string }>>(`/admin/sales-channels`, {
      method: "GET",
      query: { limit: 50 },
    })
    .then((r) => r["sales_channels"] || [])
    .catch(() => [])

  const byName = list.find((sc) => (sc.name || "").toLowerCase() === "default sales channel")
  if (byName) return byName.id

  // Fallback: pick first if any
  return list[0]?.id
}

async function upsertCategory(name: string, handle: string, parent_category_id?: string) {
  const key = "product_categories"
  const list = await sdk.client
    .fetch<AdminListResponse<{ id: string; handle: string }>>(`/admin/product-categories`, {
      method: "GET",
      query: { limit: 100, handle },
    })
    .then((r) => r[key] || [])
    .catch(() => [])

  if (list[0]) return list[0]

  const created = await sdk.client.fetch<{ product_category: { id: string } }>(
    `/admin/product-categories`,
    {
      method: "POST",
      body: { name, handle, is_active: true, parent_category_id },
    }
  )
  return created.product_category
}

async function upsertProduct(payload: any) {
  const key = "products"
  const byHandle = await sdk.client
    .fetch<AdminListResponse<{ id: string; handle: string }>>(`/admin/products`, {
      method: "GET",
      query: { handle: payload.handle, limit: 1 },
    })
    .then((r) => r[key]?.[0])
    .catch(() => undefined)

  if (byHandle) {
    const updated = await sdk.client.fetch<{ product: any }>(
      `/admin/products/${byHandle.id}`,
      { method: "POST", body: payload }
    )
    return updated.product
  }

  const created = await sdk.client.fetch<{ product: any }>(`/admin/products`, {
    method: "POST",
    body: payload,
  })
  return created.product
}

function flowerVariant(weight_g: number) {
  const labelMap: Record<number, string> = {
    350: "1/8 oz",
    700: "1/4 oz",
    1400: "1/2 oz",
    2800: "1 oz",
  }
  return {
    options: { "Weight": `${weight_g} g` },
    // set weight in grams for shipping calcs
    weight: weight_g,
    metadata: {
      weight_g,
      weight_oz: +(weight_g / 28.3495).toFixed(3),
      weight_label: labelMap[weight_g] || `${weight_g} g`,
    },
  }
}

function edibleVariant(dose_mg: number, pack_count: number) {
  return {
    options: { "Dose (mg)": `${dose_mg}`, "Pack Size": `${pack_count}` },
    metadata: {
      dose_mg,
      pack_count,
      total_mg: dose_mg * pack_count,
    },
  }
}

function beverageVariant(serving_mg: number) {
  return {
    options: { "Serving (mg)": `${serving_mg}` },
    metadata: {
      serving_mg,
      volume_oz: 12,
      servings_per_unit: 1,
    },
  }
}

function sku(prefix: string, handle: string, ...parts: (string | number)[]) {
  const clean = [prefix, handle, ...parts].join("-").toUpperCase().replace(/[^A-Z0-9-]/g, "-")
  return clean
}

async function main() {
  console.log(`Seeding to ${BASE_URL}`)

  // 1) Types
  const typeFlower = await upsertProductType("flower")
  const typeEdibles = await upsertProductType("edibles")
  const typeBeverages = await upsertProductType("beverages")
  console.log("Types:", typeFlower.value, typeEdibles.value, typeBeverages.value)

  // 2) Categories
  const catFlower = await upsertCategory("Flower", "flower")
  const catEdibles = await upsertCategory("Edibles", "edibles")
  const catBeverages = await upsertCategory("Beverages", "beverages")
  console.log("Categories:", catFlower.handle, catEdibles.handle, catBeverages.handle)

  // 3) Example products (edit freely or extend)
  // NOTE: Prices are placeholders; set correct region/currency in your admin later.

  {
    const handle = "example-flower"
    const weights = [350, 700, 1400, 2800]
    const isDevEnv = (process.env.NODE_ENV || "development").startsWith("dev")
    const salesChannelId = isDevEnv ? await getDefaultSalesChannelId() : undefined
    await upsertProduct({
      title: "Example Flower",
      handle,
      status: "published",
      type_id: typeFlower.id,
      categories: [{ id: catFlower.id }],
      ...(salesChannelId ? { sales_channels: [{ id: salesChannelId }] } : {}),
      options: [{ title: "Weight", values: weights.map((g) => `${g} g`) }],
      variants: weights
        .map((g) => {
          const v = flowerVariant(g)
          const isDev = (process.env.NODE_ENV || "development").startsWith("dev")
          return {
            ...v,
            title: v.metadata.weight_label || `${g} g`,
            sku: sku("THC-FLW", handle, g + "g"),
            prices: [{ currency_code: "usd", amount: 2000 }],
            // For dev demos: don't block on inventory
            manage_inventory: !isDev,
            allow_backorder: isDev,
          }
        }),
    })
  }

  const edibleDoses = [5, 10, 12, 25, 50]
  const ediblePacks = [10, 25, 50, 100]

  {
    const handle = "example-edible"
    const isDevEnv = (process.env.NODE_ENV || "development").startsWith("dev")
    const salesChannelId = isDevEnv ? await getDefaultSalesChannelId() : undefined
    await upsertProduct({
      title: "Example Edible",
      handle,
      status: "published",
      type_id: typeEdibles.id,
      categories: [{ id: catEdibles.id }],
      ...(salesChannelId ? { sales_channels: [{ id: salesChannelId }] } : {}),
      options: [
        { title: "Dose (mg)", values: edibleDoses.map((d) => `${d}`) },
        { title: "Pack Size", values: ediblePacks.map((p) => `${p}`) },
      ],
      variants: edibleDoses
        .flatMap((d) => ediblePacks.map((p) => edibleVariant(d, p)))
        .slice(0, 8)
        .map((v) => ({
          ...v,
          title: `${v.metadata.dose_mg} mg × ${v.metadata.pack_count}`,
          sku: sku("THC-EDB", handle, `${v.metadata.dose_mg}mg`, v.metadata.pack_count),
          prices: [{ currency_code: "usd", amount: 1500 }],
          manage_inventory: !(process.env.NODE_ENV || "development").startsWith("dev"),
          allow_backorder: (process.env.NODE_ENV || "development").startsWith("dev"),
        })),
    })
  }

  {
    const handle = "example-beverage"
    const servings = [5, 10]
    const isDevEnv = (process.env.NODE_ENV || "development").startsWith("dev")
    const salesChannelId = isDevEnv ? await getDefaultSalesChannelId() : undefined
    await upsertProduct({
      title: "Example Beverage",
      handle,
      status: "published",
      type_id: typeBeverages.id,
      categories: [{ id: catBeverages.id }],
      ...(salesChannelId ? { sales_channels: [{ id: salesChannelId }] } : {}),
      options: [{ title: "Serving (mg)", values: servings.map((s) => `${s}`) }],
      variants: servings.map((s) => {
        const v = beverageVariant(s)
        return {
          ...v,
          title: `${s} mg (12 oz)`,
          sku: sku("THC-BEV", handle, `${s}mg`, "12oz"),
          prices: [{ currency_code: "usd", amount: 799 }],
          manage_inventory: !(process.env.NODE_ENV || "development").startsWith("dev"),
          allow_backorder: (process.env.NODE_ENV || "development").startsWith("dev"),
        }
      }),
      metadata: { volume_oz: 12 },
    })
  }

  console.log("Done.")
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
