import { Module } from "@medusajs/framework/utils"
import SalesPeopleModuleService from "./service"

export const SALES_PEOPLE_MODULE = "salesPeople"

export default Module(SALES_PEOPLE_MODULE, {
  service: SalesPeopleModuleService,
})
