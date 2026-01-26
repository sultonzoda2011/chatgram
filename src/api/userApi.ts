import { api } from '@/lib/utils/axiosConfig'
import type { IUserResponse } from '@/types/user'

export const searchUserApi = async (query: string) => {
  try {
    const response = await api.get<IUserResponse>(`/users/search/`, { params: { q: query } })
    return response.data.data
  } catch (error) {
    console.error('Failed to fetch users:', error)
    return []
  }
}
