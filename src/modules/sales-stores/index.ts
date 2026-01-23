import { Module } from "@medusajs/framework/utils"
import SalesStoresModuleService from "./service"

export const SALES_STORES_MODULE = "salesStores"

export default Module(SALES_STORES_MODULE, {
  service: SalesStoresModuleService,
})
