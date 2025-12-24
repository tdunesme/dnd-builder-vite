import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL

const headers = {
  'Content-Type': 'application/json',
}

export const api = axios.create({
  baseURL: apiUrl,
  headers,
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})
