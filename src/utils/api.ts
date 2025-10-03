export async function handleFetchResponse(response: Response) {
    if (!response.ok) {
      const errorData = await response.json()
      const error = new Error(errorData.message)
      ;(error as any).status = errorData.status
      throw error
    }
    return response.json()
  }
  
  export async function safeFetch(input: RequestInfo, init?: RequestInit) {
    try {
      const response = await fetch(input, init)
      return handleFetchResponse(response)
    } catch (error) {
      throw error
    }
  }