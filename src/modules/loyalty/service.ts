import { InferTypeOf } from "@medusajs/framework/types"
import { MedusaError, MedusaService } from "@medusajs/framework/utils"
import LoyaltyPointModel from "./models/loyalty-point"
import LoyaltyTransactionModel from "./models/loyalty-transaction"

type LoyaltyPoint = InferTypeOf<typeof LoyaltyPointModel>
type LoyaltyTransaction = InferTypeOf<typeof LoyaltyTransactionModel>

const DEFAULT_EARN_POINTS_PER_CURRENCY_UNIT = 1
const DEFAULT_REDEEM_POINTS_PER_CURRENCY_UNIT = 25

const parsePositiveRate = (value: string | undefined, fallback: number, envName: string) => {
  if (!value) {
    return fallback
  }

  const parsed = Number(value)

  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new Error(`${envName} must be a positive number`)
  }

  return parsed
}

const EARN_POINTS_PER_CURRENCY_UNIT = parsePositiveRate(
  process.env.LOYALTY_EARN_POINTS_PER_CURRENCY_UNIT,
  DEFAULT_EARN_POINTS_PER_CURRENCY_UNIT,
  "LOYALTY_EARN_POINTS_PER_CURRENCY_UNIT"
)

const REDEEM_POINTS_PER_CURRENCY_UNIT = parsePositiveRate(
  process.env.LOYALTY_REDEEM_POINTS_PER_CURRENCY_UNIT,
  DEFAULT_REDEEM_POINTS_PER_CURRENCY_UNIT,
  "LOYALTY_REDEEM_POINTS_PER_CURRENCY_UNIT"
)

type LoyaltyTransactionContext = {
  order_id?: string
  cart_id?: string
  reason?: string
}

class LoyaltyModuleService extends MedusaService({
  LoyaltyPoint: LoyaltyPointModel,
  LoyaltyTransaction: LoyaltyTransactionModel,
}) {
  async getPoints(customerId: string): Promise<number> {
    const points = await this.listLoyaltyPoints(
      {
        customer_id: customerId,
      },
      {
        take: 1,
      }
    )

    return points[0]?.points || 0
  }

  async addPoints(
    customerId: string,
    points: number,
    context?: LoyaltyTransactionContext
  ): Promise<LoyaltyPoint> {
    if (points < 0) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Points to add must be greater than or equal to 0"
      )
    }

    const existingPoints = await this.listLoyaltyPoints(
      {
        customer_id: customerId,
      },
      {
        take: 1,
      }
    )

    let next: LoyaltyPoint

    if (existingPoints.length > 0) {
      next = await this.updateLoyaltyPoints({
        id: existingPoints[0].id,
        points: existingPoints[0].points + points,
      })
    } else {
      next = await this.createLoyaltyPoints({
        customer_id: customerId,
        points,
      })
    }

    await this.createLoyaltyTransactions({
      customer_id: customerId,
      loyalty_point_id: next.id,
      order_id: context?.order_id,
      cart_id: context?.cart_id,
      type: "earn",
      points,
      balance_after: next.points,
      reason: context?.reason,
    })

    return next
  }

  async deductPoints(
    customerId: string,
    points: number,
    context?: LoyaltyTransactionContext
  ): Promise<LoyaltyPoint> {
    if (points < 0) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Points to deduct must be greater than or equal to 0"
      )
    }

    const existingPoints = await this.listLoyaltyPoints(
      {
        customer_id: customerId,
      },
      {
        take: 1,
      }
    )

    if (existingPoints.length === 0 || existingPoints[0].points < points) {
      throw new MedusaError(
        MedusaError.Types.NOT_ALLOWED,
        "Insufficient loyalty points"
      )
    }

    const next = await this.updateLoyaltyPoints({
      id: existingPoints[0].id,
      points: existingPoints[0].points - points,
    })

    await this.createLoyaltyTransactions({
      customer_id: customerId,
      loyalty_point_id: next.id,
      order_id: context?.order_id,
      cart_id: context?.cart_id,
      type: "redeem",
      points: -points,
      balance_after: next.points,
      reason: context?.reason,
    })

    return next
  }

  async calculateEarnPointsFromAmount(amount: number): Promise<number> {
    if (amount < 0) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Amount cannot be negative"
      )
    }

    return Math.floor(amount * EARN_POINTS_PER_CURRENCY_UNIT)
  }

  async calculateRedeemPointsFromAmount(amount: number): Promise<number> {
    if (amount < 0) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Amount cannot be negative"
      )
    }

    return Math.ceil(amount * REDEEM_POINTS_PER_CURRENCY_UNIT)
  }

  async calculateAmountFromRedeemPoints(points: number): Promise<number> {
    if (points < 0) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Points cannot be negative"
      )
    }

    return Math.floor(points / REDEEM_POINTS_PER_CURRENCY_UNIT)
  }

  // Backward-compatible aliases for older call sites.
  async calculatePointsFromAmount(amount: number): Promise<number> {
    return this.calculateRedeemPointsFromAmount(amount)
  }

  // Backward-compatible aliases for older call sites.
  async calculateAmountFromPoints(points: number): Promise<number> {
    return this.calculateAmountFromRedeemPoints(points)
  }

  async getPointsHistory(customerId: string, limit = 20, offset = 0): Promise<{
    transactions: LoyaltyTransaction[]
    count: number
  }> {
    const [transactions, count] = await this.listAndCountLoyaltyTransactions(
      {
        customer_id: customerId,
      },
      {
        take: limit,
        skip: offset,
        order: {
          created_at: "DESC",
        },
      }
    )

    return {
      transactions,
      count,
    }
  }
}

export default LoyaltyModuleService
