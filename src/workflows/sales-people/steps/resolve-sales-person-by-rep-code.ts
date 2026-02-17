import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"

type ResolveSalesPersonByRepCodeStepInput = {
  rep_code: string
}

type SalesPersonRecord = {
  id: string
  rep_code: string
  [key: string]: unknown
}

type SalesPeopleService = {
  resolveByRepCode: (repCode: string) => Promise<SalesPersonRecord | null>
}

export const resolveSalesPersonByRepCodeStep = createStep(
  "resolve-sales-person-by-rep-code",
  async (input: ResolveSalesPersonByRepCodeStepInput, { container }) => {
    const salesPeople = container.resolve("salesPeople") as unknown as SalesPeopleService

    const person = await salesPeople.resolveByRepCode(input.rep_code)

    if (!person) {
      throw new Error("Sales person not found.")
    }

    return new StepResponse(person)
  }
)
