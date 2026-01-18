export type ApiError = {
  message: string
}

export const postAdmin = async <TResponse>(
  path: string,
  body: unknown
): Promise<TResponse> => {
  const response = await fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    let message = `Request failed (${response.status})`
    try {
      const errorBody = (await response.json()) as ApiError
      if (errorBody?.message) {
        message = errorBody.message
      }
    } catch (error) {
      const text = await response.text()
      if (text) {
        message = text
      }
    }

    throw new Error(message)
  }

  return (await response.json()) as TResponse
}
