import { Module } from "@medusajs/framework/utils"
import LoyaltyModuleService from "./service"
import "../../workflows/hooks/complete-cart"

export const LOYALTY_MODULE = "loyalty"

export default Module(LOYALTY_MODULE, {
  service: LoyaltyModuleService,
})
