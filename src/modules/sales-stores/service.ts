import { MedusaService } from "@medusajs/framework/utils"
import SalesStore from "./models/sales-store"
import SalesStoreStage from "./models/sales-store-stage"
import { normalizeAddress } from "../../utils/sales-stores"

export type SalesStoreInput = {
  name?: string
  address: string
  lat?: number
  lng?: number
  source?: string
  stage?: string
  notes?: string
  assigned_sales_person_id?: string | null
}

class SalesStoresModuleService extends MedusaService({
  SalesStore,
  SalesStoreStage,
}) {
  async upsertStores(inputs: SalesStoreInput[]) {
    const results: Array<{ store: any; created: boolean }> = []

    for (const input of inputs) {
      const normalized = normalizeAddress(input.address)
      const existing = (
        await this.listSalesStores({ normalized_address: normalized }, { take: 1 })
      )[0]

      const payload = {
        name: input.name || existing?.name,
        address: input.address,
        normalized_address: normalized,
        lat: typeof input.lat === "number" ? input.lat : existing?.lat,
        lng: typeof input.lng === "number" ? input.lng : existing?.lng,
        source: input.source || existing?.source || "trip_planner",
        notes: input.notes || existing?.notes,
        assigned_sales_person_id:
          typeof input.assigned_sales_person_id === "string"
            ? input.assigned_sales_person_id
            : existing?.assigned_sales_person_id,
      }

      const stage = input.stage || existing?.stage || "discovered"
      const stageUpdatedAt = new Date()

      let storeRecord: any
      let created = false

      if (existing) {
        storeRecord = await this.updateSalesStores(
          { id: existing.id },
          {
            ...payload,
            stage,
            stage_updated_at: stageUpdatedAt,
          }
        )
      } else {
        created = true
        storeRecord = await this.createSalesStores({
          ...payload,
          stage,
          stage_updated_at: stageUpdatedAt,
        })
      }

      if (stage) {
        await this.createSalesStoreStages({
          store_id: storeRecord.id,
          stage,
          occurred_at: stageUpdatedAt,
          notes: input.notes,
          source: input.source || "trip_planner",
        })
      }

      results.push({ store: storeRecord, created })
    }

    return results
  }

  async addStage(storeId: string, stage: string, notes?: string) {
    const stageUpdatedAt = new Date()

    const storeRecord = await this.updateSalesStores(
      { id: storeId },
      {
        stage,
        stage_updated_at: stageUpdatedAt,
      }
    )

    await this.createSalesStoreStages({
      store_id: storeId,
      stage,
      occurred_at: stageUpdatedAt,
      notes,
    })

    return storeRecord
  }

  async assignSalesPerson(storeId: string, salesPersonId?: string) {
    const [storeRecord] = await this.listSalesStores(
      { id: storeId },
      { take: 1 }
    )

    if (!storeRecord) {
      return null
    }

    return this.updateSalesStores(
      { id: storeId },
      { assigned_sales_person_id: salesPersonId || null }
    )
  }
}

export default SalesStoresModuleService
