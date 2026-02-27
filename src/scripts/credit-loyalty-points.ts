import type { ExecArgs } from "@medusajs/framework/types"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { LOYALTY_MODULE } from "../modules/loyalty"
import type LoyaltyModuleService from "../modules/loyalty/service"

type CustomerService = {
  listCustomers: (
    selector?: Record<string, unknown>,
    config?: Record<string, unknown>
  ) => Promise<Array<{ id: string; email?: string | null }>>
}

const parsePoints = (raw: string | undefined) => {
  const parsed = Number.parseInt(raw || "", 10)
  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new Error("LOYALTY_POINTS must be a positive integer")
  }
  return parsed
}

export default async function creditLoyaltyPoints({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const customerEmail = (process.env.LOYALTY_CUSTOMER_EMAIL || "").trim().toLowerCase()
  const points = parsePoints(process.env.LOYALTY_POINTS)
  const reason = (process.env.LOYALTY_REASON || "manual_credit").trim()
  const operation =
    (process.env.LOYALTY_OPERATION || "add").trim().toLowerCase() === "deduct"
      ? "deduct"
      : "add"

  if (!customerEmail) {
    throw new Error("LOYALTY_CUSTOMER_EMAIL is required")
  }

  const customerService = container.resolve("customer") as CustomerService
  const customers = await customerService.listCustomers(
    { email: customerEmail },
    { take: 1 }
  )
  const customer = customers[0]

  if (!customer?.id) {
    throw new Error(`Customer not found for email ${customerEmail}`)
  }

  const loyaltyModuleService = container.resolve(LOYALTY_MODULE) as LoyaltyModuleService

  const updated =
    operation === "deduct"
      ? await loyaltyModuleService.deductPoints(customer.id, points, { reason })
      : await loyaltyModuleService.addPoints(customer.id, points, { reason })

  const balance = await loyaltyModuleService.getPoints(customer.id)

  logger.info(
    `[credit-loyalty-points] ${operation === "deduct" ? "Deducted" : "Credited"} ${points} point(s) ${
      operation === "deduct" ? "from" : "to"
    } ${customerEmail} (${customer.id}). New balance: ${balance}. Loyalty point record: ${updated.id}`
  )
}
