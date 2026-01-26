import { jwtDecode } from 'jwt-decode'
import type { IJwtPayload } from '@/types/jwt'

export const decodeToken = (token: string): IJwtPayload | null => {
  try {
    return jwtDecode<IJwtPayload>(token)
  } catch (error) {
    console.error('Invalid JWT token', error)
    return null
  }
}
export const isTokenExpired = (token: string): boolean => {
  const decoded = decodeToken(token)
  if (!decoded) return true

  const currentTime = Math.floor(Date.now() / 1000)
  return decoded.exp < currentTime
}
