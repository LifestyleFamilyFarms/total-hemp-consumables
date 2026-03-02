const parseBoolean = (value: string | undefined, defaultValue = false): boolean => {
  if (typeof value !== "string") {
    return defaultValue
  }

  const normalized = value.trim().toLowerCase()

  if (["true", "1", "yes", "y", "on"].includes(normalized)) {
    return true
  }

  if (["false", "0", "no", "n", "off"].includes(normalized)) {
    return false
  }

  return defaultValue
}

export const isFirstPurchaseDiscountEnabled = (): boolean => {
  return parseBoolean(process.env.FEATURE_FIRST_PURCHASE_DISCOUNT_ENABLED, false)
}

export const getFirstPurchaseDiscountCode = (): string => {
  const value = process.env.FIRST_PURCHASE_DISCOUNT_CODE?.trim()
  return value || "FIRST_PURCHASE"
}
