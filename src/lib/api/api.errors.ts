import { AxiosError } from 'axios'

export type ApiError = {
  status: number
  message: string
}

type ApiErrorPayload = {
  message?: string
}

export function mapApiError(error: unknown): ApiError {
  if (error instanceof AxiosError && error.response) {
    const data = error.response.data as ApiErrorPayload

    return {
      status: error.response.status,
      message: data?.message ?? 'Unexpected server error',
    }
  }

  return {
    status: 0,
    message: 'Network error',
  }
}
