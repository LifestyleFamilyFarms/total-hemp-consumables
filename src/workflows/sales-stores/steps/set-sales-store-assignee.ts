import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"

type SetSalesStoreAssigneeStepInput = {
  sales_store_id: string
  sales_person_id: string | null
}

type SalesStoreRecord = {
  id: string
  assigned_sales_person_id?: string | null
}

type SalesStoresService = {
  listSalesStores: (
    selector?: Record<string, unknown>,
    config?: Record<string, unknown>
  ) => Promise<SalesStoreRecord[]>
  updateSalesStores: (
    selector: Record<string, unknown>,
    data: Record<string, unknown>
  ) => Promise<SalesStoreRecord>
}

type SetSalesStoreAssigneeCompensationInput = {
  sales_store_id: string
  previous_sales_person_id: string | null
}

export const setSalesStoreAssigneeStep = createStep(
  "sales-stores.set-sales-store-assignee",
  async (input: SetSalesStoreAssigneeStepInput, { container }) => {
    const salesStores = container.resolve("salesStores") as SalesStoresService

    const [existingStore] = await salesStores.listSalesStores(
      { id: input.sales_store_id },
      { take: 1 }
    )

    if (!existingStore) {
      throw new Error("Sales store not found.")
    }

    const store = await salesStores.updateSalesStores(
      { id: input.sales_store_id },
      { assigned_sales_person_id: input.sales_person_id ?? null }
    )

    return new StepResponse(
      store,
      {
        sales_store_id: input.sales_store_id,
        previous_sales_person_id: existingStore.assigned_sales_person_id ?? null,
      } satisfies SetSalesStoreAssigneeCompensationInput
    )
  },
  async (compensationInput, { container }) => {
    if (!compensationInput) {
      return
    }

    const salesStores = container.resolve("salesStores") as SalesStoresService

    await salesStores.updateSalesStores(
      { id: compensationInput.sales_store_id },
      { assigned_sales_person_id: compensationInput.previous_sales_person_id }
    )
  }
)
