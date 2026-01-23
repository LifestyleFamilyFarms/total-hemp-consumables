import { model } from "@medusajs/framework/utils"

const SalesPerson = model.define("sales_person", {
  id: model.id().primaryKey(),
  name: model.text(),
  email: model.text().nullable(),
  phone: model.text().nullable(),
  rep_code: model.text(),
  active: model.boolean().default(true),
  notes: model.text().nullable(),
})

export default SalesPerson
