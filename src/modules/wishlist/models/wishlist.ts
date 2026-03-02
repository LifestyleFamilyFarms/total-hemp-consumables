import { model } from "@medusajs/framework/utils"
import { WishlistItem } from "./wishlist-item"

export const Wishlist = model.define("wishlist", {
  id: model.id().primaryKey(),
  customer_id: model.text().unique("IDX_wishlist_customer_id_unique"),
  items: model.hasMany(() => WishlistItem, {
    mappedBy: "wishlist",
  }),
})
