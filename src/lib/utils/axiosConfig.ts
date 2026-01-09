import { getToken } from '@/lib/utils/cookie'
import axios from 'axios'
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

api.interceptors.request.use((config) => {
  const token = getToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
