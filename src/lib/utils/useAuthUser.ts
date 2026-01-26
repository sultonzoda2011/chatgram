import { getToken } from '@/lib/utils/cookie'
import { decodeToken } from '@/lib/utils/jwt'

export const useAuthUser = () => {
  const token = getToken()
  return token ? decodeToken(token) : null
}
