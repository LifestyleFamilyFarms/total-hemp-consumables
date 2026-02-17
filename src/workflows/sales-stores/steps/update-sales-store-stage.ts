import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"

type UpdateSalesStoreStageStepInput = {
  sales_store_id: string
  stage: string
}

type SalesStoreRecord = {
  id: string
  stage?: string | null
  stage_updated_at?: string | Date | null
}

type SalesStoresService = {
  listSalesStores: (
    selector?: Record<string, unknown>,
    config?: Record<string, unknown>
  ) => Promise<SalesStoreRecord[]>
  updateSalesStores: (data: Record<string, unknown>) => Promise<SalesStoreRecord>
}

type UpdateSalesStoreStageStepOutput = {
  store: SalesStoreRecord
  stage_updated_at: Date
}

type UpdateSalesStoreStageCompensationInput = {
  sales_store_id: string
  previous_stage: string | null
  previous_stage_updated_at: string | Date | null
}

export const updateSalesStoreStageStep = createStep(
  "update-sales-store-stage",
  async (input: UpdateSalesStoreStageStepInput, { container }) => {
    const salesStores = container.resolve("salesStores") as SalesStoresService
    const [existingStore] = await salesStores.listSalesStores(
      { id: input.sales_store_id },
      { take: 1 }
    )

    if (!existingStore) {
      throw new Error("Sales store not found.")
    }

    const stageUpdatedAt = new Date()
    const store = await salesStores.updateSalesStores({
      id: input.sales_store_id,
      stage: input.stage,
      stage_updated_at: stageUpdatedAt,
    })

    return new StepResponse(
      {
        store,
        stage_updated_at: stageUpdatedAt,
      } satisfies UpdateSalesStoreStageStepOutput,
      {
        sales_store_id: input.sales_store_id,
        previous_stage: existingStore.stage ?? null,
        previous_stage_updated_at: existingStore.stage_updated_at ?? null,
      } satisfies UpdateSalesStoreStageCompensationInput
    )
  },
  async (compensationInput, { container }) => {
    if (!compensationInput) {
      return
    }

    const salesStores = container.resolve("salesStores") as SalesStoresService
    await salesStores.updateSalesStores({
      id: compensationInput.sales_store_id,
      stage: compensationInput.previous_stage,
      stage_updated_at: compensationInput.previous_stage_updated_at
        ? new Date(compensationInput.previous_stage_updated_at)
        : null,
    })
  }
)
