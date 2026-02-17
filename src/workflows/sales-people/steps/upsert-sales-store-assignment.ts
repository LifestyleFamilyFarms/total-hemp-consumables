import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"

type UpsertSalesStoreAssignmentStepInput = {
  sales_person_id: string
  sales_store_id: string
  notes?: string
}

type SalesPersonRecord = {
  id: string
}

type SalesStoreRecord = {
  id: string
}

type SalesPersonAssignmentRecord = {
  id: string
  sales_person_id: string
  sales_store_id: string
  assigned_at?: string | Date
  notes?: string | null
}

type SalesPeopleService = {
  listSalesPeople: (
    selector?: Record<string, unknown>,
    config?: Record<string, unknown>
  ) => Promise<SalesPersonRecord[]>
  listSalesPersonAssignments: (
    selector?: Record<string, unknown>,
    config?: Record<string, unknown>
  ) => Promise<SalesPersonAssignmentRecord[]>
  createSalesPersonAssignments: (
    data: Record<string, unknown>
  ) => Promise<SalesPersonAssignmentRecord>
  updateSalesPersonAssignments: (
    selector: Record<string, unknown>,
    data: Record<string, unknown>
  ) => Promise<SalesPersonAssignmentRecord>
  deleteSalesPersonAssignments: (selector: Record<string, unknown>) => Promise<void>
}

type SalesStoresService = {
  listSalesStores: (
    selector?: Record<string, unknown>,
    config?: Record<string, unknown>
  ) => Promise<SalesStoreRecord[]>
}

type UpsertSalesStoreAssignmentCompensationInput = {
  previous_assignment: SalesPersonAssignmentRecord | null
  created_assignment_id: string | null
}

export const upsertSalesStoreAssignmentStep = createStep(
  "sales-people.assignment.upsert-sales-store-assignment",
  async (input: UpsertSalesStoreAssignmentStepInput, { container }) => {
    const salesPeople = container.resolve("salesPeople") as unknown as SalesPeopleService
    const salesStores = container.resolve("salesStores") as SalesStoresService

    const [salesPerson] = await salesPeople.listSalesPeople(
      { id: input.sales_person_id },
      { take: 1 }
    )

    if (!salesPerson) {
      throw new Error("Sales person not found.")
    }

    const [salesStore] = await salesStores.listSalesStores(
      { id: input.sales_store_id },
      { take: 1 }
    )

    if (!salesStore) {
      throw new Error("Sales store not found.")
    }

    const [existingAssignment] = await salesPeople.listSalesPersonAssignments(
      { sales_store_id: input.sales_store_id },
      { take: 1 }
    )

    const assignedAt = new Date()

    let assignment: SalesPersonAssignmentRecord
    let createdAssignmentId: string | null = null

    if (existingAssignment) {
      assignment = await salesPeople.updateSalesPersonAssignments(
        { id: existingAssignment.id },
        {
          sales_person_id: input.sales_person_id,
          notes: input.notes,
          assigned_at: assignedAt,
        }
      )
    } else {
      assignment = await salesPeople.createSalesPersonAssignments({
        sales_person_id: input.sales_person_id,
        sales_store_id: input.sales_store_id,
        notes: input.notes,
        assigned_at: assignedAt,
      })
      createdAssignmentId = assignment.id
    }

    return new StepResponse(
      assignment,
      {
        previous_assignment: existingAssignment || null,
        created_assignment_id: createdAssignmentId,
      } satisfies UpsertSalesStoreAssignmentCompensationInput
    )
  },
  async (compensationInput, { container }) => {
    if (!compensationInput) {
      return
    }

    const salesPeople = container.resolve("salesPeople") as unknown as SalesPeopleService

    if (compensationInput.previous_assignment) {
      const previous = compensationInput.previous_assignment
      await salesPeople.updateSalesPersonAssignments(
        { id: previous.id },
        {
          sales_person_id: previous.sales_person_id,
          notes: previous.notes ?? null,
          assigned_at: previous.assigned_at
            ? new Date(previous.assigned_at)
            : new Date(),
        }
      )
      return
    }

    if (compensationInput.created_assignment_id) {
      await salesPeople
        .deleteSalesPersonAssignments({ id: compensationInput.created_assignment_id })
        .catch(() => undefined)
    }
  }
)
