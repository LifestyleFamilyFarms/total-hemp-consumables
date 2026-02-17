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
  updateSalesPeople: (data: Record<string, unknown>) => Promise<SalesPersonRecord>
}

type UpdateSalesPersonCompensationInput = {
  previous_sales_person: SalesPersonRecord
}

export const updateSalesPersonStep = createStep(
  "update-sales-person",
  async (input: UpdateSalesPersonStepInput, { container }) => {
    const salesPeople = container.resolve("salesPeople") as unknown as SalesPeopleService

    const [existingPerson] = await salesPeople.listSalesPeople({ id: input.id }, { take: 1 })

    if (!existingPerson) {
      throw new Error("Sales person not found.")
    }

    const updateData: Record<string, unknown> = {
      id: input.id,
    }

    if (input.name !== undefined) {
      updateData.name = input.name
    }

    if (input.email !== undefined) {
      updateData.email = input.email
    }

    if (input.phone !== undefined) {
      updateData.phone = input.phone
    }

    if (input.rep_code !== undefined) {
      updateData.rep_code = input.rep_code
    }

    if (input.active !== undefined) {
      updateData.active = input.active
    }

    if (input.notes !== undefined) {
      updateData.notes = input.notes
    }

    const person = await salesPeople.updateSalesPeople(updateData)

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

    const compensationData: Record<string, unknown> = {
      id: previous.id,
      name: previous.name,
      rep_code: previous.rep_code,
      notes: previous.notes ?? null,
    }

    if (previous.email !== undefined) {
      compensationData.email = previous.email ?? null
    }

    if (previous.phone !== undefined) {
      compensationData.phone = previous.phone ?? null
    }

    if (previous.active !== undefined) {
      compensationData.active = previous.active
    }

    await salesPeople.updateSalesPeople(compensationData)
  }
)
