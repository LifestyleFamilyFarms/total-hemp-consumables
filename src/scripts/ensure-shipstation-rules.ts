// @ts-nocheck
import { Modules } from "@medusajs/framework/utils"
import type { ExecArgs } from "@medusajs/framework/types"

const PROVIDER_ID = "shipstation_shipstation"
const RULE_ATTRIBUTE = "enabled_in_store"
const RULE_VALUE = "true"

export default async function ensureShipstationRules({ container }: ExecArgs) {
  const fulfillmentModule = container.resolve(Modules.FULFILLMENT)

  const options = await fulfillmentModule.listShippingOptions({ provider_id: [PROVIDER_ID] }, { withDeleted: false })

  const rules = await fulfillmentModule.listShippingOptionRules({})
  const existingByOption = new Map<string, boolean>()
  rules.forEach((rule: any) => {
    if (rule.shipping_option_id && rule.attribute === RULE_ATTRIBUTE && rule.value === RULE_VALUE) {
      existingByOption.set(rule.shipping_option_id, true)
    }
  })

  const missing = options.filter((option: any) => !existingByOption.has(option.id))

  if (!missing.length) {
    console.log("[ensure-shipstation-rules] All ShipStation options already have enabled_in_store rule")
    return
  }

  await fulfillmentModule.createShippingOptionRules(
    missing.map((option: any) => ({
      shipping_option_id: option.id,
      attribute: RULE_ATTRIBUTE,
      operator: "eq",
      value: RULE_VALUE,
    }))
  )

  console.log(`[ensure-shipstation-rules] Added rule for ${missing.length} option(s)`) 
}
