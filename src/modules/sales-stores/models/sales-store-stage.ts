import { model } from "@medusajs/framework/utils"

const SalesStoreStage = model.define("sales_store_stage", {
  id: model.id().primaryKey(),
  store_id: model.text(),
  stage: model.text(),
  occurred_at: model.dateTime(),
  notes: model.text().nullable(),
  source: model.text().nullable(),
})

export default SalesStoreStage
