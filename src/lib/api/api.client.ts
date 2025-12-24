import axios from 'axios'
import { clearAccessToken, getAccessToken } from '../auth/auth.storage'
import { router } from '@/router'

const apiUrl = import.meta.env.VITE_API_URL

const headers = {
  'Content-Type': 'application/json',
}

export const api = axios.create({
  baseURL: apiUrl,
  headers,
})

api.interceptors.request.use(config => {
  const token = getAccessToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  response => response,
  error => {
    if (
      error.response?.status === 401 &&
      error.response?.data?.message === 'Unauthorized'
    ) {
      clearAccessToken()

      router.navigate({
        to: '/auth/login',
        replace: true,
      })
    }

    return Promise.reject(error)
  }
)
