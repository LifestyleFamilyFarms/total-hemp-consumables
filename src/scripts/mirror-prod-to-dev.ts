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

async function listAll<T>(path: string, key: string, limit = 100) {
  return prod.client
    .fetch<{ [k: string]: T[] }>(path, { method: "GET", query: { limit } })
    .then((r) => (r[key] as T[]) || [])
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

  // Mirror store currencies + default sales channel (parity)
  try {
    const prodStore = await prod.client.fetch<{ store: { supported_currencies?: any[]; default_sales_channel_id?: string } }>(
      `/admin/store`,
      { method: "GET" }
    )
    const supported_currencies = prodStore.store.supported_currencies || []
    if (Array.isArray(supported_currencies) && supported_currencies.length) {
      await dev.client.fetch(`/admin/store`, {
        method: "POST",
        body: { supported_currencies },
      })
      console.log(`Store currencies mirrored to DEV`)
    }
  } catch (e) {
    console.warn(`Store currency mirror skipped:`, (e as any)?.message || e)
  }

  // Regions: mirror basic shape (name, currency_code, countries)
  try {
    const prodRegions = await prod.client
      .fetch<{ regions: { id: string; name: string; currency_code: string; countries: { iso_2: string }[] }[] }>(
        `/admin/regions`,
        { method: "GET", query: { limit: 100 } }
      )
      .then((r) => r.regions || [])

    const devRegions = await dev.client
      .fetch<{ regions: { id: string; name: string }[] }>(`/admin/regions`, { method: "GET", query: { limit: 100 } })
      .then((r) => r.regions || [])

    for (const r of prodRegions) {
      const exists = devRegions.find((dr) => (dr.name || "").toLowerCase() === (r.name || "").toLowerCase())
      if (exists) continue
      try {
        await dev.client.fetch(`/admin/regions`, {
          method: "POST",
          body: {
            name: r.name,
            currency_code: r.currency_code,
            countries: (r.countries || []).map((c) => c.iso_2).filter(Boolean),
          },
        })
        console.log(`Region created in DEV: ${r.name}`)
      } catch (e) {
        console.warn(`Region mirror skipped for ${r.name}:`, (e as any)?.message || e)
      }
    }
  } catch (e) {
    console.warn(`Region mirror skipped:`, (e as any)?.message || e)
  }

  // Stock locations: mirror by name + basic address
  const devLocationIdByName = new Map<string, string>()
  try {
    const prodLocs = await prod.client
      .fetch<{ stock_locations: { id: string; name: string; address?: any }[] }>(
        `/admin/stock-locations`,
        { method: "GET", query: { limit: 100 } }
      )
      .then((r) => r.stock_locations || [])

    const devLocs = await dev.client
      .fetch<{ stock_locations: { id: string; name: string }[] }>(`/admin/stock-locations`, {
        method: "GET",
        query: { limit: 100 },
      })
      .then((r) => r.stock_locations || [])

    for (const l of prodLocs) {
      const name = l.name || ""
      if (!name) continue
      let devId = devLocs.find((dl) => (dl.name || "").toLowerCase() === name.toLowerCase())?.id
      if (!devId) {
        try {
          const created = await dev.client.fetch<{ stock_location: { id: string } }>(
            `/admin/stock-locations`,
            {
              method: "POST",
              body: {
                name: l.name,
                address: l.address || {},
              },
            }
          )
          devId = created.stock_location.id
          console.log(`Stock location created in DEV: ${l.name}`)
        } catch (e) {
          console.warn(`Stock location mirror skipped for ${l.name}:`, (e as any)?.message || e)
        }
      }
      if (devId) devLocationIdByName.set(name.toLowerCase(), devId)
    }
  } catch (e) {
    console.warn(`Stock location mirror skipped:`, (e as any)?.message || e)
  }
  // 0) sales channels: mirror by name and set default store channel
  const prodChannels: { id: string; name: string }[] = await prod.client
    .fetch<{ sales_channels: { id: string; name: string }[] }>(`/admin/sales-channels`, {
      method: "GET",
      query: { limit: 100 },
    })
    .then((r) => r.sales_channels ?? [])
    .catch(() => [] as { id: string; name: string }[])

  // Upsert DEV channels and build name→id map
  const devChannelIdByName = new Map<string, string>()
  const devExisting: { id: string; name: string }[] = await dev.client
    .fetch<{ sales_channels: { id: string; name: string }[] }>(`/admin/sales-channels`, {
      method: "GET",
      query: { limit: 100 },
    })
    .then((r) => r.sales_channels ?? [])
    .catch(() => [] as { id: string; name: string }[])

  for (const sc of prodChannels) {
    const name = sc.name || ""
    if (!name) continue
    let devId = devExisting.find((d) => (d.name || "").toLowerCase() === name.toLowerCase())?.id
    if (!devId) {
      devId = await dev.client
        .fetch<{ sales_channel: { id: string } }>(`/admin/sales-channels`, {
          method: "POST",
          body: { name },
        })
        .then((r) => r.sales_channel.id)
        .catch(() => undefined as unknown as string)
    }
    if (devId) devChannelIdByName.set(name.toLowerCase(), devId)
  }

  // Mirror default sales channel on the Store
  try {
    const prodStore = await prod.client.fetch<{ store: { default_sales_channel_id?: string } }>(
      `/admin/store`,
      { method: "GET" }
    )
    const defaultProdChannelId = prodStore.store.default_sales_channel_id
    if (defaultProdChannelId) {
      const defaultName = prodChannels.find((c) => c.id === defaultProdChannelId)?.name
      const devDefaultId = defaultName ? devChannelIdByName.get(defaultName.toLowerCase()) : undefined
      if (devDefaultId) {
        await dev.client.fetch(`/admin/store`, {
          method: "POST",
          body: { default_sales_channel_id: devDefaultId },
        })
        console.log(`Default sales channel set to '${defaultName}' in DEV`)
      }
    }
  } catch {}

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
      sales_channels: Array.isArray(p.sales_channels)
        ? p.sales_channels
            .map((sc: any) => {
              const name = (sc.name || "").toLowerCase()
              const id = devChannelIdByName.get(name)
              return id ? { id } : null
            })
            .filter(Boolean)
        : [],
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
    await upsertProductDev(payload)
  }
  console.log(`Done.`)
}

mirror().catch((e) => {
  console.error(e)
  process.exit(1)
})
