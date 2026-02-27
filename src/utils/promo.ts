import {
  CartDTO,
  CustomerDTO,
  OrderDTO,
  PromotionDTO,
} from "@medusajs/framework/types"

export type CartData = CartDTO & {
  promotions?: PromotionDTO[]
  customer?: CustomerDTO
  metadata?: {
    loyalty_promo_id?: string | null
    [key: string]: unknown
  }
}

export type OrderData = OrderDTO & {
  promotions?: PromotionDTO[]
  customer?: CustomerDTO
  cart?: CartData
}

export const CUSTOMER_ID_PROMOTION_RULE_ATTRIBUTE = "customer_id"

export function getCartLoyaltyPromotion(
  cart: CartData
): PromotionDTO | undefined {
  const loyaltyPromoId = cart?.metadata?.loyalty_promo_id

  if (!loyaltyPromoId) {
    return undefined
  }

  return cart.promotions?.find((promotion) => promotion.id === loyaltyPromoId)
}

export function orderHasLoyaltyPromotion(order: OrderData): boolean {
  const loyaltyPromotion = getCartLoyaltyPromotion(order.cart as CartData)

  return (
    loyaltyPromotion?.rules?.some((rule) => {
      return (
        rule?.attribute === CUSTOMER_ID_PROMOTION_RULE_ATTRIBUTE &&
        (rule?.values?.some((value) => value.value === order.customer?.id) ||
          false)
      )
    }) || false
  )
}
