import Medusa from "@medusajs/js-sdk"

export type ApiError = {
  message: string
}

const resolveBackendUrl = () => {
  if (typeof window !== "undefined") {
    const globalBackend =
      (window as { __BACKEND_URL__?: string }).__BACKEND_URL__ ||
      (globalThis as { __BACKEND_URL__?: string }).__BACKEND_URL__
    return globalBackend || window.location.origin
  }

  return process.env.MEDUSA_BACKEND_URL || "http://localhost:9000"
}

// Medusa docs recommend the JS SDK for admin customizations.
export const sdk = new Medusa({
  baseUrl: resolveBackendUrl(),
  debug: process.env.NODE_ENV === "development",
  auth: {
    type: "session",
  },
})

export const postAdmin = async <TResponse>(
  path: string,
  body?: BodyInit | Record<string, unknown> | null
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

export const getAdminUser = async <TResponse>(): Promise<TResponse> => {
  try {
    return (await sdk.admin.user.me()) as TResponse
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Request failed."
    throw new Error(message)
  }
}

export const listAdminUsers = async <TResponse>(
  query?: Record<string, unknown>
): Promise<TResponse> => {
  try {
    return (await sdk.admin.user.list(query)) as TResponse
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Request failed."
    throw new Error(message)
  }
}

export const updateAdminUser = async <TResponse>(
  id: string,
  body: Record<string, unknown>
): Promise<TResponse> => {
  try {
    return (await sdk.admin.user.update(id, body)) as TResponse
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Request failed."
    throw new Error(message)
  }
}
