import { model } from "@medusajs/framework/utils"

const LoyaltyTransaction = model.define("loyalty_transaction", {
  id: model.id().primaryKey(),
  customer_id: model.text(),
  loyalty_point_id: model.text().nullable(),
  order_id: model.text().nullable(),
  cart_id: model.text().nullable(),
  type: model.text(),
  points: model.number(),
  balance_after: model.number().default(0),
  reason: model.text().nullable(),
})

export default LoyaltyTransaction
