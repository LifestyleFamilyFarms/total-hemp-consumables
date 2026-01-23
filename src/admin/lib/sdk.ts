import Medusa from "@medusajs/js-sdk"

export type ApiError = {
  message: string
}

const baseUrl =
  typeof window !== "undefined" ? window.location.origin : "http://localhost:9000"

// Medusa docs recommend the JS SDK for admin customizations.
export const sdk = new Medusa({
  baseUrl,
  debug: process.env.NODE_ENV === "development",
  auth: {
    type: "session",
  },
})

export const postAdmin = async <TResponse>(
  path: string,
  body: unknown
): Promise<TResponse> => {
  try {
    return await sdk.client.fetch<TResponse>(path, {
      method: "POST",
      body,
    })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Request failed."
    throw new Error(message)
  }
}

export const getAdmin = async <TResponse>(
  path: string,
  query?: Record<string, unknown>
): Promise<TResponse> => {
  try {
    return await sdk.client.fetch<TResponse>(path, {
      query,
    })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Request failed."
    throw new Error(message)
  }
}
