import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"

export type CreateSalesPersonStepInput = {
  name: string
  email?: string
  phone?: string
  rep_code: string
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
  createSalesPeople: (data: Record<string, unknown>) => Promise<SalesPersonRecord>
  deleteSalesPeople: (selector: Record<string, unknown>) => Promise<void>
}

type CreateSalesPersonCompensationInput = {
  created_sales_person_id: string
}

export const createSalesPersonStep = createStep(
  "sales-people.step.create-sales-person",
  async (input: CreateSalesPersonStepInput, { container }) => {
    const salesPeople = container.resolve("salesPeople") as unknown as SalesPeopleService

    const person = await salesPeople.createSalesPeople(input)

    return new StepResponse(
      person,
      { created_sales_person_id: person.id } satisfies CreateSalesPersonCompensationInput
    )
  },
  async (compensationInput, { container }) => {
    if (!compensationInput?.created_sales_person_id) {
      return
    }

    const salesPeople = container.resolve("salesPeople") as unknown as SalesPeopleService

    await salesPeople
      .deleteSalesPeople({ id: compensationInput.created_sales_person_id })
      .catch(() => undefined)
  }
)
