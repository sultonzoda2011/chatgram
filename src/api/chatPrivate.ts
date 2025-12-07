import { api } from '@/lib/utils/axiosConfig'
import { IPrivateChatHistoryResponse } from '@/types/chatPrivate'
export const getPrivateChats = async (otherUserId: string, Skip?: number) => {
  try {
    const response = await api.get<IPrivateChatHistoryResponse>('/Chat/history/private', {
      params: { otherUserId, Skip },
    })
    return response.data.data?.items || []
  } catch (error) {
    console.error('Ошибка при получении приватных чатов:', error)
  }
}
