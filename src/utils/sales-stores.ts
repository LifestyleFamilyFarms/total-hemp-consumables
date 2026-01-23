export const normalizeAddress = (address: string) =>
  address.trim().toLowerCase().replace(/\s+/g, " ")
