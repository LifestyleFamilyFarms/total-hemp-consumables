import { model } from "@medusajs/framework/utils"

const Review = model
  .define("review", {
    id: model.id().primaryKey(),
    product_id: model.text().index("IDX_REVIEW_PRODUCT_ID"),
    customer_id: model.text().index("IDX_REVIEW_CUSTOMER_ID"),
    rating: model.float(),
    title: model.text().nullable(),
    content: model.text(),
    status: model.enum(["pending", "approved", "rejected"]).default("pending"),
  })
  .checks([
    {
      name: "CHK_review_rating_range",
      expression: (columns) => `${columns.rating} >= 1 AND ${columns.rating} <= 5`,
    },
  ])

export default Review
