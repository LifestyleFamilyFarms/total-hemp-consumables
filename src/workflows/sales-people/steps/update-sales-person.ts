import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"

export type UpdateSalesPersonStepInput = {
  id: string
  name?: string
  email?: string
  phone?: string
  rep_code?: string
  active?: boolean
  notes?: string
}

type SalesPersonRecord = {
  id: string
  name: string
  email?: string | null
  phone?: string | null
  rep_code: string
  active?: boolean
  notes?: string | null
}

type SalesPeopleService = {
  listSalesPeople: (
    selector?: Record<string, unknown>,
    config?: Record<string, unknown>
  ) => Promise<SalesPersonRecord[]>
  updateSalesPeople: (
    selector: Record<string, unknown>,
    data: Record<string, unknown>
  ) => Promise<SalesPersonRecord>
}

type UpdateSalesPersonCompensationInput = {
  previous_sales_person: SalesPersonRecord
}

export const updateSalesPersonStep = createStep(
  "sales-people.step.update-sales-person",
  async (input: UpdateSalesPersonStepInput, { container }) => {
    const salesPeople = container.resolve("salesPeople") as unknown as SalesPeopleService

    const [existingPerson] = await salesPeople.listSalesPeople({ id: input.id }, { take: 1 })

    if (!existingPerson) {
      throw new Error("Sales person not found.")
    }

    const person = await salesPeople.updateSalesPeople(
      { id: input.id },
      {
        name: input.name,
        email: input.email,
        phone: input.phone,
        rep_code: input.rep_code,
        active: input.active,
        notes: input.notes,
      }
    )

    return new StepResponse(
      person,
      { previous_sales_person: existingPerson } satisfies UpdateSalesPersonCompensationInput
    )
  },
  async (compensationInput, { container }) => {
    if (!compensationInput?.previous_sales_person) {
      return
    }

    const salesPeople = container.resolve("salesPeople") as unknown as SalesPeopleService
    const previous = compensationInput.previous_sales_person

    await salesPeople.updateSalesPeople(
      { id: previous.id },
      {
        name: previous.name,
        email: previous.email ?? null,
        phone: previous.phone ?? null,
        rep_code: previous.rep_code,
        active: previous.active,
        notes: previous.notes ?? null,
      }
    )
  }
)
