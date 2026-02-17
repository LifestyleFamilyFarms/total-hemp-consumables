import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"

type AddSalesStoreStageHistoryStepInput = {
  store_id: string
  stage: string
  occurred_at: Date
  notes?: string
  source?: string
}

type SalesStoreStageRecord = {
  id: string
}

type SalesStoresService = {
  createSalesStoreStages: (
    data: Record<string, unknown>
  ) => Promise<SalesStoreStageRecord>
  deleteSalesStoreStages: (ids: string | string[]) => Promise<void>
}

type AddSalesStoreStageHistoryCompensationInput = {
  stage_id: string
}

export const addSalesStoreStageHistoryStep = createStep(
  "add-sales-store-stage-history",
  async (input: AddSalesStoreStageHistoryStepInput, { container }) => {
    const salesStores = container.resolve("salesStores") as SalesStoresService

    const stage = await salesStores.createSalesStoreStages({
      store_id: input.store_id,
      stage: input.stage,
      occurred_at: input.occurred_at,
      notes: input.notes,
      source: input.source,
    })

    return new StepResponse(
      stage,
      { stage_id: stage.id } satisfies AddSalesStoreStageHistoryCompensationInput
    )
  },
  async (compensationInput, { container }) => {
    if (!compensationInput?.stage_id) {
      return
    }

    const salesStores = container.resolve("salesStores") as SalesStoresService
    await salesStores
      .deleteSalesStoreStages(compensationInput.stage_id)
      .catch(() => undefined)
  }
)
