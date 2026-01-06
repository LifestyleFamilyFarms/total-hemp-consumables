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
import colors from "yoctocolors-cjs"

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
  const results: T[] = []
  let offset = 0
  const maxPages = 100
  for (let page = 0; page < maxPages; page++) {
    const response = await client.client.fetch<{ [k: string]: T[] }>(path, {
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

async function listInventoryLevels(
  client: Medusa,
  inventoryItemId: string,
  limit = 100
): Promise<Array<{ id: string; location_id: string; stocked_quantity: number }>> {
  const levels: Array<{ id: string; location_id: string; stocked_quantity: number }> = []
  let offset = 0
  const maxPages = 100
  for (let page = 0; page < maxPages; page++) {
    const response = await client.client.fetch<{ inventory_levels: any[] }>(
      `/admin/inventory-items/${inventoryItemId}/location-levels`,
      {
        method: "GET",
        query: { limit, offset },
      }
    )
    const batch = (response.inventory_levels || []).map((lv: any) => ({
      id: lv.id,
      location_id: lv.location_id,
      stocked_quantity: Number(lv.stocked_quantity || 0),
    }))
    levels.push(...batch)
    if (batch.length < limit) {
      break
    }
    offset += limit
    if (page === maxPages - 1) {
      throw new Error(
        `Pagination overflow fetching location levels for inventory item ${inventoryItemId}. Retrieved at least ${levels.length} records (limit=${limit}).`
      )
    }
  }
  return levels
}

async function listReservationsByInventoryItem(
  client: Medusa,
  inventoryItemId: string,
  limit = 1000
): Promise<any[]> {
  const reservations: any[] = []
  let offset = 0
  const maxPages = 100
  for (let page = 0; page < maxPages; page++) {
    const response = await client.client.fetch<{ reservations: any[] }>(`/admin/reservations`, {
      method: "GET",
      query: { inventory_item_id: inventoryItemId, limit, offset },
    })
    const batch = response.reservations || []
    reservations.push(...batch)
    if (batch.length < limit) {
      break
    }
    offset += limit
    if (page === maxPages - 1) {
      throw new Error(
        `Pagination overflow fetching reservations for inventory item ${inventoryItemId}. Retrieved at least ${reservations.length} records (limit=${limit}).`
      )
    }
  }
  return reservations
}

const MIRROR_RESERVED = (process.env.INVENTORY_MIRROR_RESERVED || "1") !== "0"
const WIPE_EXISTING_RESERVATIONS = (process.env.INVENTORY_WIPE_RESERVATIONS || "1") !== "0"
const DRY_RUN = (process.env.INVENTORY_DRY_RUN || "0") === "1"

type LevelShape = { stocked_quantity: number }
type InventorySnapshot = Map<string, Map<string, LevelShape>>
type DiffEntry = {
  sku: string
  location: string
  devQty: number
  prodQty: number
}

async function mirrorInventory() {
  console.log(DRY_RUN ? `Dry-running inventory mirror PROD → DEV` : `Mirroring inventory from PROD → DEV`)

  // 1) Gather PROD locations (id → name)
  const prodLocs = await listAll<{ id: string; name: string }>(prod, `/admin/stock-locations`, "stock_locations")
  if (!prodLocs.length) {
    throw new Error("No stock locations found in PROD. Cannot mirror inventory.")
  }
  const prodLocNameById = new Map<string, string>()
  prodLocs.forEach((l) => prodLocNameById.set(l.id, l.name || ""))

  // 2) Gather DEV locations (name → id)
  const devLocs = await listAll<{ id: string; name: string }>(dev, `/admin/stock-locations`, "stock_locations")
  if (!devLocs.length) {
    throw new Error(
      "No stock locations found in DEV. Create at least one location via the Admin UI (see docs/admin-store-setup.md) before mirroring."
    )
  }
  const devLocIdByName = new Map<string, string>()
  const devLocNameById = new Map<string, string>()
  devLocs.forEach((l) => {
    const name = l.name || ""
    devLocIdByName.set(name.toLowerCase(), l.id)
    devLocNameById.set(l.id, name)
  })

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
      const levels = await listInventoryLevels(prod, it.id)
      prodLevelsByItemId.set(it.id, levels)
    } catch (e) {
      console.warn(
        `Failed to load PROD inventory levels for item ${it.id}:`,
        (e as any)?.message || e
      )
      prodLevelsByItemId.set(it.id, [])
    }
  }

  // Map PROD sku → levels ({ locationName: qty })
  const prodSkuLevels: InventorySnapshot = new Map()
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

  const missingDevSkus: string[] = []
  for (const sku of prodSkuLevels.keys()) {
    if (!devVariantIdBySku.has(sku)) {
      missingDevSkus.push(sku)
    }
  }
  if (missingDevSkus.length) {
    throw new Error(
      `Missing DEV variants for ${missingDevSkus.length} PROD SKU(s): ${missingDevSkus
        .slice(0, 10)
        .join(", ")}`
    )
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
  const diffEntries: DiffEntry[] = []
  const missingLocationMappings = new Set<string>()

  // Build DEV inventory items list for lookup
  const devItems = await listAll<any>(dev, `/admin/inventory-items`, "inventory_items")
  const devItemIdBySku = new Map<string, string>()
  devItems.forEach((it) => {
    if (it.sku) devItemIdBySku.set((it.sku as string).toLowerCase(), it.id)
  })

  for (const [sku, variantId] of devVariantIdBySku) {
    const prodLevels = prodSkuLevels.get(sku)
    const hasProd = !!prodLevels && prodLevels.size > 0

    // Ensure dev inventory item exists (or record requirement in dry-run)
    let devItemId = devItemIdBySku.get(sku)
    let devItemExists = !!devItemId
    if (!devItemId) {
      if (DRY_RUN) {
        createdItems++
      } else {
        try {
          devItemId = await dev.client
            .fetch<{ inventory_item: { id: string } }>(`/admin/inventory-items`, {
              method: "POST",
              body: { sku },
            })
            .then((r) => r.inventory_item.id)
          if (devItemId) {
            devItemIdBySku.set(sku, devItemId)
            devItemExists = true
            createdItems++
          }
        } catch (e) {
          console.warn(`Failed to create dev inventory item for sku=${sku}:`, (e as any)?.message || e)
          continue
        }
      }
    }

    if (!devItemExists && !devItemId) {
      // Dry-run: record diff using missing item, skip mutation steps
      const targetLevels = prodSkuLevels.get(sku)
      if (DRY_RUN && targetLevels?.size) {
        for (const [prodLocName, data] of targetLevels) {
          const mappedName = (LOCATION_MAP[prodLocName] || prodLocName).toLowerCase()
          const devLocId = devLocIdByName.get(mappedName)
          if (!devLocId) continue
          diffEntries.push({
            sku,
            location: devLocNameById.get(devLocId) || mappedName,
            devQty: 0,
            prodQty: data.stocked_quantity,
          })
        }
      }
      continue
    }

    if (!devItemId) {
      continue
    }

    // Link item ↔ variant (best-effort)
    if (!DRY_RUN && devItemExists && devItemId) {
      try {
        await dev.client.fetch(`/admin/variants/${variantId}/inventory-items`, {
          method: "POST",
          body: { inventory_item_id: devItemId },
        })
      } catch {}
    }

    // Determine target levels
    const targetLevels: Array<{ location_id: string; stocked_quantity: number }> = []
    if (hasProd) {
      for (const [prodLocName, data] of prodLevels!) {
        const mappedName = (LOCATION_MAP[prodLocName] || prodLocName).toLowerCase()
        const devLocId = devLocIdByName.get(mappedName)
        if (devLocId) {
          targetLevels.push({
            location_id: devLocId,
            stocked_quantity: data.stocked_quantity,
          })
        } else {
          missingLocationMappings.add(`${sku} → ${prodLocName}`)
        }
      }
    }

    // Fetch current DEV levels for this item (to prune or zero out if needed)
    let currentDevLevels: Array<{ id: string; location_id: string; stocked_quantity: number }> = []
    try {
      currentDevLevels = await listInventoryLevels(dev, devItemId)
    } catch (e) {
      console.warn(
        `Failed to load DEV inventory levels for sku=${sku}:`,
        (e as any)?.message || e
      )
    }

    const originalDevLevelsMap = new Map<string, number>()
    currentDevLevels.forEach((lv) => originalDevLevelsMap.set(lv.location_id, lv.stocked_quantity))

    if (DRY_RUN) {
      const targetByLocation = new Map<string, number>()
      for (const tl of targetLevels) {
        targetByLocation.set(tl.location_id, tl.stocked_quantity)
      }
      const combinedLocIds = new Set<string>([
        ...targetByLocation.keys(),
        ...originalDevLevelsMap.keys(),
      ])
      for (const locId of combinedLocIds) {
        const prodQty = targetByLocation.get(locId) || 0
        const devQty = originalDevLevelsMap.get(locId) || 0
        if (prodQty === devQty) continue
        diffEntries.push({
          sku,
          location: devLocNameById.get(locId) || locId,
          devQty,
          prodQty,
        })
      }
      // Skip mutation logic in dry-run mode
      continue
    }

    const currentDevLevelsMap = new Map<string, { id: string; location_id: string; stocked_quantity: number }>()
    currentDevLevels.forEach((lv) => currentDevLevelsMap.set(lv.location_id, lv))

    if (hasProd) {
      // Upsert target levels to match PROD
      for (const tl of targetLevels) {
        const existingLevel = currentDevLevelsMap.get(tl.location_id)
        if (existingLevel) {
          try {
            await dev.client.fetch(
              `/admin/inventory-items/${devItemId}/location-levels/${tl.location_id}`,
              {
                method: "POST",
                body: {
                  stocked_quantity: tl.stocked_quantity,
                },
              }
            )
            updatedLevels++
            currentDevLevelsMap.set(tl.location_id, {
              ...existingLevel,
              stocked_quantity: tl.stocked_quantity,
            })
          } catch (e) {
            console.warn(
              `Failed to update level for sku=${sku} location=${tl.location_id}:`,
              (e as any)?.message || e
            )
          }
        } else {
          try {
            await dev.client.fetch(`/admin/inventory-items/${devItemId}/location-levels`, {
              method: "POST",
              body: {
                location_id: tl.location_id,
                stocked_quantity: tl.stocked_quantity,
              },
            })
            createdLevels++
            currentDevLevelsMap.set(tl.location_id, {
              id: "",
              location_id: tl.location_id,
              stocked_quantity: tl.stocked_quantity,
            })
          } catch (e) {
            console.warn(
              `Failed to create level for sku=${sku} location=${tl.location_id}:`,
              (e as any)?.message || e
            )
          }
        }
      }

      // For any DEV level not present in PROD targets, zero it out for parity
      const targetLocSet = new Set(targetLevels.map((l) => l.location_id))
      for (const lv of currentDevLevels) {
        if (!targetLocSet.has(lv.location_id) && lv.stocked_quantity !== 0) {
          try {
            await dev.client.fetch(
              `/admin/inventory-items/${devItemId}/location-levels/${lv.location_id}`,
              {
                method: "POST",
                body: {
                  stocked_quantity: 0,
                },
              }
            )
            zeroedLevels++
            currentDevLevelsMap.set(lv.location_id, { ...lv, stocked_quantity: 0 })
          } catch (e) {
            console.warn(
              `Failed to zero inventory level for sku=${sku} location=${lv.location_id}:`,
              (e as any)?.message || e
            )
          }
        }
      }
    } else {
      // No PROD levels: reflect out-of-stock in DEV by zeroing any existing levels
      if (!DEFAULT_QTY) {
        for (const lv of currentDevLevels) {
          if (lv.stocked_quantity !== 0) {
            try {
              await dev.client.fetch(
                `/admin/inventory-items/${devItemId}/location-levels/${lv.location_id}`,
                {
                  method: "POST",
                  body: {
                    stocked_quantity: 0,
                  },
                }
              )
              zeroedLevels++
              currentDevLevelsMap.set(lv.location_id, { ...lv, stocked_quantity: 0 })
            } catch (e) {
              console.warn(
                `Failed to zero inventory level for sku=${sku} location=${lv.location_id}:`,
                (e as any)?.message || e
              )
            }
          }
        }
      } else {
        // If a fallback is explicitly provided, allow it (opt-in)
        const firstLoc = devLocs[0]?.id
        if (firstLoc) {
          const existingLevel = currentDevLevelsMap.get(firstLoc)
          if (existingLevel) {
            try {
              await dev.client.fetch(
                `/admin/inventory-items/${devItemId}/location-levels/${firstLoc}`,
                {
                  method: "POST",
                  body: { stocked_quantity: DEFAULT_QTY },
                }
              )
              updatedLevels++
              currentDevLevelsMap.set(firstLoc, {
                ...existingLevel,
                stocked_quantity: DEFAULT_QTY,
              })
            } catch (e) {
              console.warn(
                `Failed to update fallback level for sku=${sku} location=${firstLoc}:`,
                (e as any)?.message || e
              )
            }
          } else {
            try {
              await dev.client.fetch(`/admin/inventory-items/${devItemId}/location-levels`, {
                method: "POST",
                body: { location_id: firstLoc, stocked_quantity: DEFAULT_QTY },
              })
              createdLevels++
              currentDevLevelsMap.set(firstLoc, {
                id: "",
                location_id: firstLoc,
                stocked_quantity: DEFAULT_QTY,
              })
            } catch (e) {
              console.warn(
                `Failed to create fallback level for sku=${sku} location=${firstLoc}:`,
                (e as any)?.message || e
              )
            }
          }
        }
      }
    }

    if (MIRROR_RESERVED) {
      const targetReserved = prodReservedBySku.get(sku)

      let devReservations: any[] = []
      try {
        devReservations = await listReservationsByInventoryItem(dev, devItemId)
      } catch (e) {
        console.warn(
          `Failed to load DEV reservations for sku=${sku}:`,
          (e as any)?.message || e
        )
      }

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
            missingLocationMappings.add(`${sku} → ${prodLocName}`)
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

  if (missingLocationMappings.size) {
    throw new Error(
      `Missing DEV stock location mappings for ${missingLocationMappings.size} entries: ${Array.from(
        missingLocationMappings
      )
        .slice(0, 10)
        .join(", ")}`
    )
  }

  if (DRY_RUN) {
    if (diffEntries.length === 0) {
      console.log(colors.green("Dry-run: DEV inventory already matches PROD for all mirrored SKUs. No changes needed."))
    } else {
      const bySku = new Map<string, DiffEntry[]>()
      for (const entry of diffEntries) {
        if (!bySku.has(entry.sku)) {
          bySku.set(entry.sku, [])
        }
        bySku.get(entry.sku)!.push(entry)
      }
      console.log(
        colors.bold(
          colors.yellow(
            `Dry-run: found ${diffEntries.length} inventory mismatches across ${bySku.size} SKU${
              bySku.size === 1 ? "" : "s"
            }.`
          )
        )
      )
      for (const [sku, entries] of bySku) {
        console.log(`  ${colors.bold(sku)}`)
        for (const entry of entries) {
          const delta = entry.prodQty - entry.devQty
          const arrow = delta > 0 ? colors.green("→") : delta < 0 ? colors.red("←") : colors.gray("=")
          const deltaText =
            delta > 0 ? colors.green(`+${delta}`) : delta < 0 ? colors.red(`${delta}`) : colors.gray("0")
          console.log(
            `    ${entry.location}: DEV ${colors.cyan(String(entry.devQty))} ${arrow} PROD ${colors.magenta(String(entry.prodQty))} (Δ ${deltaText})`
          )
        }
      }
      console.log(colors.gray("Dry-run only: no changes were applied."))
    }
    return
  }

  console.log(
    `Inventory mirror complete. items_created=${createdItems}, levels_updated=${updatedLevels}, levels_created=${createdLevels}, levels_zeroed=${zeroedLevels}, reservations_created=${reservationsCreated}, reservations_deleted=${reservationsDeleted}`
  )
}

mirrorInventory().catch((e) => {
  console.error(e)
  process.exit(1)
})
