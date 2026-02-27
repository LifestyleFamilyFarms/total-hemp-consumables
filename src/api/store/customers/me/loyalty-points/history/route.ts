import {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { LOYALTY_MODULE } from "../../../../../../modules/loyalty"
import LoyaltyModuleService from "../../../../../../modules/loyalty/service"
import type { GetLoyaltyHistoryQuery } from "./middlewares"

export async function GET(
  req: AuthenticatedMedusaRequest<GetLoyaltyHistoryQuery>,
  res: MedusaResponse
) {
  const loyaltyModuleService: LoyaltyModuleService = req.scope.resolve(LOYALTY_MODULE)

  const { limit, offset } = req.validatedQuery

  const { transactions, count } = await loyaltyModuleService.getPointsHistory(
    req.auth_context.actor_id,
    limit,
    offset
  )

  res.json({
    history: transactions,
    count,
    limit,
    offset,
  })
}
