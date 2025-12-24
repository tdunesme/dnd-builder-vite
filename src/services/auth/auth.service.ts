// services/auth/auth.service.ts
import { api } from '@/lib/api/api.client'
import { mapApiError } from '@/lib/api/api.errors'

export type LoginPayload = {
  email: string
  password: string
}

export type LoginResponse = {
  user: {
    id: string
    email: string
    firstName: string
    lastName: string
  }
  accessToken: string
}
export type AuthUser = {
  id: string
  email: string
  firstName: string
  lastName: string
}

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  try {
    const { data } = await api.post('/auth/login', payload)
    return data
  } catch (error) {
    throw mapApiError(error)
  }
}

export async function getMe(): Promise<AuthUser> {
  try {
    const { data } = await api.get('/auth/me')
    return data
  } catch (error) {
    throw mapApiError(error)
  }
}
