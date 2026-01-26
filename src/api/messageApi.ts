import { api } from '@/lib/utils/axiosConfig'
import type { IChatMessagesResponse } from '@/types/message'

export const getMessagesApi = async (userId: string) => {
  try {
    const response = await api.get<IChatMessagesResponse>(`/chat/messages/${userId}`)
    return response.data.data
  } catch (error) {
    console.error('Failed to fetch messages:', error)
    return []
  }
}

export const sendMessagesApi = async ({
  toUserId,
  content,
}: {
  toUserId: string
  content: string
}) => {
  try {
    const response = await api.post(`/chat/send/${toUserId}`, { content })

    return response.data.data
  } catch (error) {
    console.error('Failed to fetch messages:', error)
    return []
  }
}

export const updateMessagesApi = async ({ id, content }: { id: number; content: string }) => {
  try {
    const response = await api.put(`/chat/messages/${id}`, { content })
    return response.data.data
  } catch (error) {
    console.error('Failed to fetch messages:', error)
    return []
  }
}
export const deleteMessagesApi = async (id: number) => {
  try {
    const response = await api.delete(`/chat/messages/${id}`)
    return response.data.data
  } catch (error) {
    console.error('Failed to fetch messages:', error)
    return []
  }
}
