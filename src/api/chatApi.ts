import { api } from '@/lib/utils/axiosConfig'
import type { IChatsResponse } from '@/types/chat'

export const getChatsApi = async () => {
  try {
    const response = await api.get<IChatsResponse>('/chat/chats')
    return response.data.data
  } catch (error) {
    console.error('Failed to fetch chats:', error)
    return []
  }
}
