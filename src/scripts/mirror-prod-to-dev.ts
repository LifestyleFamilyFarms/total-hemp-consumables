/*
  Mirror product types, categories, and products from PROD → DEV via Admin API.

  Env required:
  - MEDUSA_PROD_BACKEND_URL, MEDUSA_PROD_ADMIN_TOKEN
  - MEDUSA_DEV_BACKEND_URL,  MEDUSA_DEV_ADMIN_TOKEN

  Run:
    yarn ts-node src/scripts/mirror-prod-to-dev.ts

  Notes:
  - Upserts by handle/value. Limited to a reasonable number for demo.
  - Mirroring prices copies currency prices verbatim; adjust per region if needed.
*/

import Medusa from "@medusajs/js-sdk"
import { loadEnv } from "@medusajs/framework/utils"

loadEnv(process.env.NODE_ENV || "development", process.cwd())

function req(name: string) {
  const v = process.env[name]
  if (!v) throw new Error(`Missing env: ${name}`)
  return v
}

const PROD_URL = req("MEDUSA_PROD_BACKEND_URL").replace(/\/+$/, "")
const PROD_TOKEN = req("MEDUSA_PROD_ADMIN_TOKEN")
const DEV_URL = req("MEDUSA_DEV_BACKEND_URL").replace(/\/+$/, "")
const DEV_TOKEN = req("MEDUSA_DEV_ADMIN_TOKEN")

const prod = new Medusa({ baseUrl: PROD_URL, apiKey: PROD_TOKEN })
const dev = new Medusa({ baseUrl: DEV_URL, apiKey: DEV_TOKEN })

// Channel controls (DEV-only):
// - CHANNEL_ALLOWLIST: comma-separated channel names to mirror; if unset, mirror all.
// - CHANNEL_CREATE_MISSING: default "1". Set to "0" to skip creating missing channels in DEV.
// - CHANNEL_ENFORCE_MIRROR: default "1". Set to "0" to avoid detaching extra DEV channel links.
const CHANNEL_ALLOWLIST = (process.env.CHANNEL_ALLOWLIST || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean)
  .map((s) => s.toLowerCase())
const CHANNEL_CREATE_MISSING = (process.env.CHANNEL_CREATE_MISSING || "1") !== "0"
const CHANNEL_ENFORCE_MIRROR = (process.env.CHANNEL_ENFORCE_MIRROR || "1") !== "0"

async function listAll<T>(path: string, key: string, limit = 100) {
  const results: T[] = []
  let offset = 0
  const maxPages = 100

  for (let page = 0; page < maxPages; page++) {
    const response = await prod.client.fetch<{ [k: string]: T[] }>(path, {
      method: "GET",
      query: { limit, offset },
    })
    const batch = (response[key] as T[]) || []
    results.push(...batch)

    if (batch.length < limit) {
      break
    }

    offset += limit
    if (page === maxPages - 1) {
      throw new Error(
        `Pagination overflow fetching ${path}. Retrieved at least ${results.length} records (limit=${limit}).`
      )
    }
  }

  return results
}

async function upsertTypeDev(value: string) {
  const list = await dev.client
    .fetch<{ product_types: { id: string; value: string }[] }>(`/admin/product-types`, {
      method: "GET",
      query: { limit: 100 },
    })
    .then((r) => r.product_types || [])
  const existing = list.find((t) => t.value?.toLowerCase() === value.toLowerCase())
  if (existing) return existing
  return dev.client
    .fetch<{ product_type: { id: string; value: string } }>(`/admin/product-types`, {
      method: "POST",
      body: { value },
    })
    .then((r) => r.product_type)
}

async function getOrCreateDevChannelByName(
  name: string,
  devChannelIdByName: Map<string, string>
) {
  const key = name.toLowerCase()
  if (devChannelIdByName.has(key)) return devChannelIdByName.get(key)!

  if (!CHANNEL_CREATE_MISSING) {
    throw new Error(
      `DEV channel "${name}" not found and CHANNEL_CREATE_MISSING=0 (cannot create).`
    )
  }

  const created = await dev.client.fetch<{ sales_channel: { id: string; name: string } }>(
    `/admin/sales-channels`,
    { method: "POST", body: { name } }
  )
  devChannelIdByName.set(key, created.sales_channel.id)
  return created.sales_channel.id
}

async function upsertCategoryDev(name: string, handle: string, parent_id?: string) {
  const list = await dev.client
    .fetch<{ product_categories: { id: string; handle: string }[] }>(`/admin/product-categories`, {
      method: "GET",
      query: { limit: 100, handle },
    })
    .then((r) => r.product_categories || [])
  if (list[0]) return list[0]
  return dev.client
    .fetch<{ product_category: { id: string } }>(`/admin/product-categories`, {
      method: "POST",
      body: { name, handle, is_active: true, parent_category_id: parent_id },
    })
    .then((r) => r.product_category)
}

async function upsertProductDev(payload: any) {
  const byHandle = await dev.client
    .fetch<{ products: { id: string; handle: string }[] }>(`/admin/products`, {
      method: "GET",
      query: { handle: payload.handle, limit: 1 },
    })
    .then((r) => r.products?.[0])

  if (byHandle) {
    return dev.client
      .fetch<{ product: any }>(`/admin/products/${byHandle.id}`, { method: "POST", body: payload })
      .then((r) => r.product)
  }
  return dev.client
    .fetch<{ product: any }>(`/admin/products`, { method: "POST", body: payload })
    .then((r) => r.product)
}

async function ping(client: Medusa, url: string, label: string) {
  try {
    // Hit a known Admin endpoint that exists across versions
    await client.client.fetch(`/admin/product-types`, { method: "GET", query: { limit: 1 } })
    console.log(`✔ ${label} reachable: ${url}`)
  } catch (e: any) {
    console.error(`✖ ${label} unreachable: ${url}`)
    throw e
  }
}

async function mirror() {
  console.log(`Mirroring from PROD → DEV`)
  await ping(prod, PROD_URL, "PROD")
  await ping(dev, DEV_URL, "DEV")

  const devChannelIdByName = new Map<string, string>()
  {
    const devChannels = await dev.client.fetch<{ sales_channels: { id: string; name: string }[] }>(
      `/admin/sales-channels`,
      { method: "GET", query: { limit: 100 } }
    )
    ;(devChannels.sales_channels || []).forEach((sc) =>
      devChannelIdByName.set((sc.name || "").toLowerCase(), sc.id)
    )
  }

  // 1) types (build value→id maps for both sides)
  const prodTypes = await listAll<{ id: string; value: string }>(`/admin/product-types`, "product_types")
  const prodTypeById = new Map<string, string>() // id -> value
  for (const t of prodTypes) prodTypeById.set(t.id, t.value)

  const devTypesAfter: { id: string; value: string }[] = []
  for (const t of prodTypes) {
    const created = await upsertTypeDev(t.value)
    devTypesAfter.push(created)
  }
  const devTypeIdByValue = new Map<string, string>() // value -> id
  for (const t of devTypesAfter) devTypeIdByValue.set((t.value || "").toLowerCase(), t.id)
  console.log(`Types mirrored: ${prodTypes.map((t) => t.value).join(", ")}`)

  // 2) categories (flat by handle)
  const cats = await listAll<{ id: string; name: string; handle: string; parent_category_id?: string }>(
    `/admin/product-categories`,
    "product_categories"
  )
  const catMap = new Map<string, string>()
  for (const c of cats) {
    const created = await upsertCategoryDev(c.name, c.handle, undefined)
    catMap.set(c.id, created.id)
  }
  console.log(`Categories mirrored: ${cats.length}`)

  // 3) products (basic fields + options + variants + metadata + prices)
  const products = await listAll<any>(`/admin/products`, "products")
  console.log(`Syncing ${products.length} products...`)
  for (const p of products) {
    const prodChannelNames = Array.isArray(p.sales_channels)
      ? (p.sales_channels as any[])
          .map((sc) => (sc?.name || "").toLowerCase())
          .filter((n) => n)
      : []
    const scopedChannelNames =
      CHANNEL_ALLOWLIST.length > 0
        ? prodChannelNames.filter((n) => CHANNEL_ALLOWLIST.includes(n))
        : prodChannelNames
    const devChannelIds: { id: string }[] = []
    for (const name of scopedChannelNames) {
      try {
        const devId = await getOrCreateDevChannelByName(name, devChannelIdByName)
        if (devId) devChannelIds.push({ id: devId })
      } catch (e: any) {
        console.warn(`Channel mirror skipped for ${name}:`, e?.message || e)
      }
    }

    // Resolve type id for DEV by value (avoid reusing PROD ids)
    const prodTypeValue = (p.type?.value as string) || prodTypeById.get(p.type_id) || ""
    const devTypeId = prodTypeValue ? devTypeIdByValue.get(prodTypeValue.toLowerCase()) : undefined
    const payload: any = {
      title: p.title,
      handle: p.handle,
      status: p.status,
      description: p.description,
      type_id: devTypeId,
      categories: Array.isArray(p.categories) ? p.categories.map((c: any) => ({ id: catMap.get(c.id) || undefined })).filter((x: any) => x?.id) : [],
      sales_channels: devChannelIds,
      options: (p.options || []).map((o: any) => ({ title: o.title, values: (o.values || []).map((v: any) => v.value) })),
      variants: (p.variants || []).map((v: any) => ({
        title: v.title || v.sku,
        sku: v.sku,
        options: (v.options || []).reduce((acc: any, vo: any) => { acc[vo.title || vo.option?.title || vo.option_id] = vo.value; return acc }, {}),
        prices: (v.prices || []).map((pr: any) => ({ currency_code: pr.currency_code, amount: pr.amount })),
        manage_inventory: v.manage_inventory,
        allow_backorder: v.allow_backorder,
        weight: v.weight,
        metadata: v.metadata || {},
      })),
      metadata: p.metadata || {},
      images: (p.images || []).map((im: any) => ({ url: im.url })),
      thumbnail: p.thumbnail,
    }
    const devProduct = await upsertProductDev(payload)

    // Optional channel pruning to mirror exactly (only for scoped channels)
    if (CHANNEL_ENFORCE_MIRROR && Array.isArray(devProduct?.sales_channels)) {
      const desired = new Set(devChannelIds.map((c) => c.id))
      const allowset =
        CHANNEL_ALLOWLIST.length > 0 ? new Set(CHANNEL_ALLOWLIST) : null
      for (const sc of devProduct.sales_channels as any[]) {
        const name = (sc?.name || "").toLowerCase()
        if (allowset && !allowset.has(name)) continue
        const id = sc?.id
        if (!id) continue
        if (!desired.has(id)) {
          try {
            await dev.client.fetch(`/admin/products/${devProduct.id}/sales-channels/${id}`, {
              method: "DELETE",
            })
          } catch (e: any) {
            console.warn(
              `Failed to detach channel ${name} from product ${devProduct?.handle || devProduct?.id}:`,
              e?.message || e
            )
          }
        }
      }
    }
  }
  console.log(`Done.`)
}

mirror().catch((e) => {
  console.error(e)
  process.exit(1)
})
