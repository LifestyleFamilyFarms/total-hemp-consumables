import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { normalizeAddress } from "../../../utils/sales-stores"

type UpsertSalesStoreStepInput = {
  name?: string
  address: string
  lat?: number
  lng?: number
  source?: string
  stage?: string
  notes?: string
  assigned_sales_person_id?: string
}

type SalesStoreRecord = {
  id: string
  name?: string | null
  address: string
  normalized_address: string
  lat?: number | null
  lng?: number | null
  source?: string | null
  stage?: string | null
  stage_updated_at?: string | Date | null
  notes?: string | null
  assigned_sales_person_id?: string | null
}

type SalesStoresService = {
  listSalesStores: (
    selector?: Record<string, unknown>,
    config?: Record<string, unknown>
  ) => Promise<SalesStoreRecord[]>
  createSalesStores: (data: Record<string, unknown>) => Promise<SalesStoreRecord>
  updateSalesStores: (
    selector: Record<string, unknown>,
    data: Record<string, unknown>
  ) => Promise<SalesStoreRecord>
  deleteSalesStores: (selector: Record<string, unknown>) => Promise<void>
}

type UpsertSalesStoreStepOutput = {
  store: SalesStoreRecord
  created: boolean
  stage: string
  stage_updated_at: Date
  notes?: string
  source: string
}

type UpsertSalesStoreCompensationInput = {
  created_store_id: string | null
  previous_store: SalesStoreRecord | null
}

export const upsertSalesStoreStep = createStep(
  "sales-stores.step.upsert-sales-store",
  async (
    input: UpsertSalesStoreStepInput,
    { container }
  ): Promise<StepResponse<UpsertSalesStoreStepOutput, UpsertSalesStoreCompensationInput>> => {
    const salesStores = container.resolve("salesStores") as SalesStoresService

    const normalized = normalizeAddress(input.address)
    const [existingStore] = await salesStores.listSalesStores(
      { normalized_address: normalized },
      { take: 1 }
    )

    const stage = input.stage || existingStore?.stage || "discovered"
    const stageUpdatedAt = new Date()
    const source = input.source || existingStore?.source || "trip_planner"

    const payload = {
      name: input.name || existingStore?.name,
      address: input.address,
      normalized_address: normalized,
      lat: typeof input.lat === "number" ? input.lat : existingStore?.lat,
      lng: typeof input.lng === "number" ? input.lng : existingStore?.lng,
      source,
      notes: input.notes || existingStore?.notes,
      assigned_sales_person_id:
        typeof input.assigned_sales_person_id === "string"
          ? input.assigned_sales_person_id
          : existingStore?.assigned_sales_person_id,
      stage,
      stage_updated_at: stageUpdatedAt,
    }

    if (existingStore) {
      const updatedStore = await salesStores.updateSalesStores(
        { id: existingStore.id },
        payload
      )

      return new StepResponse(
        ({
          store: updatedStore,
          created: false,
          stage,
          stage_updated_at: stageUpdatedAt,
          notes: input.notes,
          source,
        } as UpsertSalesStoreStepOutput),
        ({
          created_store_id: null,
          previous_store: existingStore,
        } as UpsertSalesStoreCompensationInput)
      )
    }

    const createdStore = await salesStores.createSalesStores(payload)

    return new StepResponse(
      ({
        store: createdStore,
        created: true,
        stage,
        stage_updated_at: stageUpdatedAt,
        notes: input.notes,
        source,
      } as UpsertSalesStoreStepOutput),
      ({
        created_store_id: createdStore.id,
        previous_store: null,
      } as UpsertSalesStoreCompensationInput)
    )
  },
  async (compensationInput, { container }) => {
    if (!compensationInput) {
      return
    }

    const salesStores = container.resolve("salesStores") as SalesStoresService

    if (compensationInput.created_store_id) {
      await salesStores
        .deleteSalesStores({ id: compensationInput.created_store_id })
        .catch(() => undefined)
      return
    }

    if (!compensationInput.previous_store) {
      return
    }

    const previousStore = compensationInput.previous_store

    await salesStores.updateSalesStores(
      { id: previousStore.id },
      {
        name: previousStore.name ?? null,
        address: previousStore.address,
        normalized_address: previousStore.normalized_address,
        lat: previousStore.lat ?? null,
        lng: previousStore.lng ?? null,
        source: previousStore.source ?? null,
        stage: previousStore.stage ?? null,
        stage_updated_at: previousStore.stage_updated_at
          ? new Date(previousStore.stage_updated_at)
          : null,
        notes: previousStore.notes ?? null,
        assigned_sales_person_id: previousStore.assigned_sales_person_id ?? null,
      }
    )
  }
)
