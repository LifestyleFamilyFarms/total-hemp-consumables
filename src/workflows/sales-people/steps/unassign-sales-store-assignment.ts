import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"

type UnassignSalesStoreAssignmentStepInput = {
  sales_store_id: string
}

type SalesPersonAssignmentRecord = {
  id: string
  sales_person_id: string
  sales_store_id: string
  assigned_at?: string | Date
  notes?: string | null
}

type SalesPeopleService = {
  listSalesPersonAssignments: (
    selector?: Record<string, unknown>,
    config?: Record<string, unknown>
  ) => Promise<SalesPersonAssignmentRecord[]>
  createSalesPersonAssignments: (
    data: Record<string, unknown>
  ) => Promise<SalesPersonAssignmentRecord>
  deleteSalesPersonAssignments: (selector: Record<string, unknown>) => Promise<void>
}

type UnassignSalesStoreAssignmentCompensationInput = {
  deleted_assignment: SalesPersonAssignmentRecord | null
}

type UnassignSalesStoreAssignmentStepOutput = {
  assignment: SalesPersonAssignmentRecord | null
}

export const unassignSalesStoreAssignmentStep = createStep(
  "sales-people.assignment.unassign-sales-store-assignment",
  async (
    input: UnassignSalesStoreAssignmentStepInput,
    { container }
  ): Promise<
    StepResponse<
      UnassignSalesStoreAssignmentStepOutput,
      UnassignSalesStoreAssignmentCompensationInput
    >
  > => {
    const salesPeople = container.resolve("salesPeople") as SalesPeopleService

    const [existingAssignment] = await salesPeople.listSalesPersonAssignments(
      { sales_store_id: input.sales_store_id },
      { take: 1 }
    )

    if (!existingAssignment) {
      return new StepResponse(
        { assignment: null } as UnassignSalesStoreAssignmentStepOutput,
        { deleted_assignment: null } as UnassignSalesStoreAssignmentCompensationInput
      )
    }

    await salesPeople.deleteSalesPersonAssignments({ id: existingAssignment.id })

    return new StepResponse(
      { assignment: existingAssignment } as UnassignSalesStoreAssignmentStepOutput,
      ({
        deleted_assignment: existingAssignment,
      } as UnassignSalesStoreAssignmentCompensationInput)
    )
  },
  async (compensationInput, { container }) => {
    if (!compensationInput?.deleted_assignment) {
      return
    }

    const salesPeople = container.resolve("salesPeople") as SalesPeopleService
    const deletedAssignment = compensationInput.deleted_assignment

    await salesPeople.createSalesPersonAssignments({
      sales_person_id: deletedAssignment.sales_person_id,
      sales_store_id: deletedAssignment.sales_store_id,
      assigned_at: deletedAssignment.assigned_at
        ? new Date(deletedAssignment.assigned_at)
        : new Date(),
      notes: deletedAssignment.notes ?? null,
    })
  }
)
