import { MedusaService } from "@medusajs/framework/utils"
import SalesPerson from "./models/sales-person"
import SalesPersonAssignment from "./models/sales-person-assignment"

class SalesPeopleModuleService extends MedusaService({
  SalesPerson,
  SalesPersonAssignment,
}) {
  async resolveByRepCode(repCode: string) {
    const normalizedRepCode = repCode.trim()
    const [person] = await (
      this as unknown as {
        listSalesPeople: (
          selector?: Record<string, unknown>,
          config?: Record<string, unknown>
        ) => Promise<unknown[]>
      }
    ).listSalesPeople(
      {
        rep_code: { $ilike: normalizedRepCode },
        active: true,
      },
      { take: 1 }
    )

    return person || null
  }
}

export default SalesPeopleModuleService
