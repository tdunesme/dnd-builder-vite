import axios from 'axios'
import { getAccessToken } from '../auth/auth.storage'

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
