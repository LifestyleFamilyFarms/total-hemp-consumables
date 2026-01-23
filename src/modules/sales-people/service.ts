import { MedusaService } from "@medusajs/framework/utils"
import SalesPerson from "./models/sales-person"
import SalesPersonAssignment from "./models/sales-person-assignment"

export type SalesPersonInput = {
  name: string
  email?: string
  phone?: string
  rep_code: string
  active?: boolean
  notes?: string
}

class SalesPeopleModuleService extends MedusaService({
  SalesPerson,
  SalesPersonAssignment,
}) {
  async assignStore(params: {
    salesPersonId: string
    salesStoreId: string
    notes?: string
  }) {
    const existing = (
      await this.listSalesPersonAssignments(
        { sales_store_id: params.salesStoreId },
        { take: 1 }
      )
    )[0]

    if (existing) {
      const assignment = await this.updateSalesPersonAssignments(
        { id: existing.id },
        {
          sales_person_id: params.salesPersonId,
          notes: params.notes,
          assigned_at: new Date(),
        }
      )
      return assignment
    }

    const assignment = await this.createSalesPersonAssignments({
      sales_person_id: params.salesPersonId,
      sales_store_id: params.salesStoreId,
      assigned_at: new Date(),
      notes: params.notes,
    })
    return assignment
  }

  async unassignStore(salesStoreId: string) {
    const existing = (
      await this.listSalesPersonAssignments(
        { sales_store_id: salesStoreId },
        { take: 1 }
      )
    )[0]

    if (!existing) {
      return null
    }

    await this.deleteSalesPersonAssignments({ id: existing.id })
    return existing
  }

  async resolveByRepCode(repCode: string) {
    const [person] = await this.listSalesPeople(
      { rep_code: repCode },
      { take: 1 }
    )
    return person || null
  }
}

export default SalesPeopleModuleService
