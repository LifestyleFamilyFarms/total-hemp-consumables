import { model } from "@medusajs/framework/utils"

const SalesStore = model.define("sales_store", {
  id: model.id().primaryKey(),
  name: model.text().nullable(),
  address: model.text(),
  normalized_address: model.text(),
  lat: model.number().nullable(),
  lng: model.number().nullable(),
  source: model.text().nullable(),
  stage: model.text().nullable(),
  stage_updated_at: model.dateTime().nullable(),
  notes: model.text().nullable(),
  assigned_sales_person_id: model.text().nullable(),
})

export default SalesStore
