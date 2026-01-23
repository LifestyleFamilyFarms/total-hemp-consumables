import { model } from "@medusajs/framework/utils"

const SalesPersonAssignment = model.define("sales_person_assignment", {
  id: model.id().primaryKey(),
  sales_person_id: model.text(),
  sales_store_id: model.text(),
  assigned_at: model.dateTime(),
  notes: model.text().nullable(),
})

export default SalesPersonAssignment
