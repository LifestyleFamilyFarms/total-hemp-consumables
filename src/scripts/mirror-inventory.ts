/*
  Mirror inventory items + levels from PROD → DEV via Admin API.

  Env required:
  - MEDUSA_PROD_BACKEND_URL, MEDUSA_PROD_ADMIN_TOKEN
  - MEDUSA_DEV_BACKEND_URL,  MEDUSA_DEV_ADMIN_TOKEN

  Optional:
  - INVENTORY_DEFAULT_QTY (number, fallback when prod has no levels)
  - INVENTORY_LOCATION_MAP (JSON mapping of prod location name → dev location name)
  - INVENTORY_MIRROR_RESERVED (set to 0 to skip mirroring reservations)
  - INVENTORY_WIPE_RESERVATIONS (set to 0 to keep non-mirror reservations in DEV)

  Run:
    yarn ts-node src/scripts/mirror-inventory.ts
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
const DEFAULT_QTY = Number(process.env.INVENTORY_DEFAULT_QTY || 0)
const LOCATION_MAP: Record<string, string> = (() => {
  try {
    return JSON.parse(process.env.INVENTORY_LOCATION_MAP || "{}")
  } catch {
    return {}
  }
})()

const prod = new Medusa({ baseUrl: PROD_URL, apiKey: PROD_TOKEN })
const dev = new Medusa({ baseUrl: DEV_URL, apiKey: DEV_TOKEN })

async function listAll<T>(client: Medusa, path: string, key: string, limit = 1000) {
  return client.client
    .fetch<{ [k: string]: T[] }>(path, { method: "GET", query: { limit } })
    .then((r) => (r[key] as T[]) || [])
}

const MIRROR_RESERVED = (process.env.INVENTORY_MIRROR_RESERVED || "1") !== "0"
const WIPE_EXISTING_RESERVATIONS = (process.env.INVENTORY_WIPE_RESERVATIONS || "1") !== "0"

async function mirrorInventory() {
  console.log(`Mirroring inventory from PROD → DEV`)

  // 1) Gather PROD locations (id → name)
  const prodLocs = await listAll<{ id: string; name: string }>(prod, `/admin/stock-locations`, "stock_locations")
  const prodLocNameById = new Map<string, string>()
  prodLocs.forEach((l) => prodLocNameById.set(l.id, l.name || ""))

  // 2) Gather DEV locations (name → id)
  const devLocs = await listAll<{ id: string; name: string }>(dev, `/admin/stock-locations`, "stock_locations")
  const devLocIdByName = new Map<string, string>()
  devLocs.forEach((l) => devLocIdByName.set((l.name || "").toLowerCase(), l.id))

  // 3) Build DEV variant map by SKU (for linking)
  const devProducts = await listAll<any>(dev, `/admin/products`, "products")
  const devVariantIdBySku = new Map<string, string>()
  for (const p of devProducts) {
    for (const v of p.variants || []) {
      if (v.sku) devVariantIdBySku.set((v.sku as string).toLowerCase(), v.id)
    }
  }

  // 4) Build PROD inventory map by SKU → item + levels
  const prodItems = await listAll<any>(prod, `/admin/inventory-items`, "inventory_items")
  const prodSkuByItemId = new Map<string, string>()
  const prodLevelsByItemId = new Map<string, any[]>()
  // fetch levels per item (batching could be added later)
  for (const it of prodItems) {
    if (it.sku) {
      prodSkuByItemId.set(it.id, (it.sku as string).toLowerCase())
    }
    try {
      const levels = await prod.client
        .fetch<{ inventory_levels: any[] }>(`/admin/inventory-items/${it.id}/levels`, {
          method: "GET",
          query: { limit: 100 },
        })
        .then((r) => r.inventory_levels || [])
      prodLevelsByItemId.set(it.id, levels)
    } catch {
      prodLevelsByItemId.set(it.id, [])
    }
  }

  // Map PROD sku → levels ({ locationName: qty })
  type LevelShape = { stocked_quantity: number }
  const prodSkuLevels = new Map<string, Map<string, LevelShape>>()
  for (const it of prodItems) {
    const sku: string = prodSkuByItemId.get(it.id) || (it.sku ? (it.sku as string).toLowerCase() : "")
    if (!sku) continue
    const levels = prodLevelsByItemId.get(it.id) || []
    const map = new Map<string, LevelShape>()
    for (const lv of levels) {
      const locName = prodLocNameById.get(lv.location_id) || ""
      if (!locName) continue
      map.set(locName.toLowerCase(), {
        stocked_quantity: Number(lv.stocked_quantity || 0),
      })
    }
    prodSkuLevels.set(sku, map)
  }

  const prodReservations = await listAll<any>(prod, `/admin/reservations`, "reservations")
  const prodReservedBySku = new Map<string, Map<string, number>>()
  for (const res of prodReservations) {
    const sku = prodSkuByItemId.get(res.inventory_item_id) || ""
    if (!sku) continue
    const locName = prodLocNameById.get(res.location_id) || ""
    if (!locName) continue
    const qty = Number(res.quantity || 0)
    if (!qty) continue
    if (!prodReservedBySku.has(sku)) {
      prodReservedBySku.set(sku, new Map())
    }
    const locKey = locName.toLowerCase()
    const locMap = prodReservedBySku.get(sku)!
    locMap.set(locKey, (locMap.get(locKey) || 0) + qty)
  }

  // 5) Upsert DEV inventory items + levels
  let createdItems = 0,
    updatedLevels = 0,
    createdLevels = 0,
    zeroedLevels = 0,
    reservationsDeleted = 0,
    reservationsCreated = 0

  // Build DEV inventory items list for lookup
  const devItems = await listAll<any>(dev, `/admin/inventory-items`, "inventory_items")
  const devItemIdBySku = new Map<string, string>()
  devItems.forEach((it) => {
    if (it.sku) devItemIdBySku.set((it.sku as string).toLowerCase(), it.id)
  })

  for (const [sku, variantId] of devVariantIdBySku) {
    const prodLevels = prodSkuLevels.get(sku)
    const hasProd = !!prodLevels && prodLevels.size > 0

    // Ensure dev inventory item exists
    let devItemId = devItemIdBySku.get(sku)
    if (!devItemId) {
      try {
        devItemId = await dev.client
          .fetch<{ inventory_item: { id: string } }>(`/admin/inventory-items`, {
            method: "POST",
            body: { sku },
          })
          .then((r) => r.inventory_item.id)
        devItemIdBySku.set(sku, devItemId)
        createdItems++
      } catch (e) {
        console.warn(`Failed to create dev inventory item for sku=${sku}:`, (e as any)?.message || e)
        continue
      }
    }

    // Link item ↔ variant (best-effort)
    try {
      await dev.client.fetch(`/admin/variants/${variantId}/inventory-items`, {
        method: "POST",
        body: { inventory_item_id: devItemId },
      })
    } catch {}

    // Determine target levels
    const targetLevels: Array<{ location_id: string; stocked_quantity: number }> = []
    if (hasProd) {
      for (const [prodLocName, data] of prodLevels!) {
        const mappedName = (LOCATION_MAP[prodLocName] || prodLocName).toLowerCase()
        const devLocId = devLocIdByName.get(mappedName)
        if (devLocId)
          targetLevels.push({
            location_id: devLocId,
            stocked_quantity: data.stocked_quantity,
          })
      }
    }

    // Fetch current DEV levels for this item (to prune or zero out if needed)
    let currentDevLevels: Array<{ id: string; location_id: string; stocked_quantity: number }> = []
    try {
      currentDevLevels = await dev.client
        .fetch<{ inventory_levels: any[] }>(`/admin/inventory-items/${devItemId}/location-levels`, {
          method: "GET",
          query: { limit: 100 },
        })
        .then((r) => (r.inventory_levels || []).map((lv: any) => ({
          id: lv.id,
          location_id: lv.location_id,
          stocked_quantity: Number(lv.stocked_quantity || 0),
        })))
    } catch {}

    if (hasProd) {
      // Upsert target levels to match PROD
      for (const tl of targetLevels) {
        try {
          await dev.client.fetch(`/admin/inventory-items/${devItemId}/location-levels`, {
            method: "POST",
            body: {
              location_id: tl.location_id,
              stocked_quantity: tl.stocked_quantity,
            },
          })
          updatedLevels++
        } catch (e) {
          try {
            await dev.client.fetch(`/admin/inventory-items/${devItemId}/location-levels`, {
              method: "POST",
              body: {
                location_id: tl.location_id,
                stocked_quantity: tl.stocked_quantity,
              },
            })
            createdLevels++
          } catch (e2) {
            console.warn(`Failed to upsert level for sku=${sku}:`, (e2 as any)?.message || e2)
          }
        }
      }

      // For any DEV level not present in PROD targets, zero it out for parity
      const targetLocSet = new Set(targetLevels.map((l) => l.location_id))
      for (const lv of currentDevLevels) {
        if (!targetLocSet.has(lv.location_id) && lv.stocked_quantity !== 0) {
          try {
            await dev.client.fetch(`/admin/inventory-items/${devItemId}/location-levels`, {
              method: "POST",
              body: {
                location_id: lv.location_id,
                stocked_quantity: 0,
              },
            })
            zeroedLevels++
          } catch {}
        }
      }
    } else {
      // No PROD levels: reflect out-of-stock in DEV by zeroing any existing levels
      if (!DEFAULT_QTY) {
        for (const lv of currentDevLevels) {
          if (lv.stocked_quantity !== 0) {
            try {
            await dev.client.fetch(`/admin/inventory-items/${devItemId}/location-levels`, {
              method: "POST",
              body: {
                location_id: lv.location_id,
                stocked_quantity: 0,
              },
              })
              zeroedLevels++
            } catch {}
          }
        }
      } else {
        // If a fallback is explicitly provided, allow it (opt-in)
        const firstLoc = devLocs[0]?.id
        if (firstLoc) {
          try {
            await dev.client.fetch(`/admin/inventory-items/${devItemId}/location-levels`, {
              method: "POST",
              body: { location_id: firstLoc, stocked_quantity: DEFAULT_QTY },
            })
            createdLevels++
          } catch {}
        }
      }
    }

    if (MIRROR_RESERVED) {
      const targetReserved = prodReservedBySku.get(sku)

      let devReservations: any[] = []
      try {
        devReservations = await dev.client
          .fetch<{ reservations: any[] }>(`/admin/reservations`, {
            method: "GET",
            query: { inventory_item_id: devItemId, limit: 1000 },
          })
          .then((r) => r.reservations || [])
      } catch {}

      let skippedReservationDeletes = false
      for (const res of devReservations) {
        if (!WIPE_EXISTING_RESERVATIONS && res?.metadata?.source !== "mirror-prod") {
          skippedReservationDeletes = true
          continue
        }
        try {
          await dev.client.fetch(`/admin/reservations/${res.id}`, { method: "DELETE" })
          reservationsDeleted++
        } catch {}
      }
      if (!WIPE_EXISTING_RESERVATIONS && skippedReservationDeletes) {
        console.warn(
          `Skipped deleting some DEV reservations for sku=${sku} (set INVENTORY_WIPE_RESERVATIONS=1 for strict parity)`
        )
      }

      if (targetReserved && targetReserved.size) {
        for (const [prodLocName, qty] of targetReserved) {
          if (!qty) continue
          const mappedName = (LOCATION_MAP[prodLocName] || prodLocName).toLowerCase()
          const devLocId = devLocIdByName.get(mappedName)
          if (!devLocId) {
            console.warn(`No DEV stock location match for reservation sku=${sku} location=${prodLocName}`)
            continue
          }
          try {
            await dev.client.fetch(`/admin/reservations`, {
              method: "POST",
              body: {
                inventory_item_id: devItemId,
                location_id: devLocId,
                quantity: qty,
                description: "Mirrored from PROD",
                metadata: { source: "mirror-prod", prod_location: prodLocName },
              },
            })
            reservationsCreated++
          } catch (e) {
            console.warn(
              `Failed to create reservation for sku=${sku} location=${prodLocName}:`,
              (e as any)?.message || e
            )
          }
        }
      }
    }
  }

  console.log(
    `Inventory mirror complete. items_created=${createdItems}, levels_updated=${updatedLevels}, levels_created=${createdLevels}, levels_zeroed=${zeroedLevels}, reservations_created=${reservationsCreated}, reservations_deleted=${reservationsDeleted}`
  )
}

mirrorInventory().catch((e) => {
  console.error(e)
  process.exit(1)
})
