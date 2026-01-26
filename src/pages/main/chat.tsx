import { getMessagesApi } from '@/api/messageApi'
import MessageInput from '@/components/ui/input/messageInput'
import MessageList from '@/components/ui/messageList'
import { useAuthUser } from '@/lib/utils/useAuthUser'
import type { IChatItem } from '@/types/chat'
import type { IChatMessage } from '@/types/message'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

const ChatPage = () => {
  const { t } = useTranslation()
  const user = useAuthUser()
  const params = useParams()
  const [messageId, setMessageId] = useState('')
  const [content, setContent] = useState('')
  const { data: chatsData } = useQuery<IChatItem[]>({
    queryKey: ['chats'],
  })
  const { data, isPending, isError } = useQuery<IChatMessage[]>({
    queryKey: ['chat', params.id],
    queryFn: () => getMessagesApi(params.id as string),
    enabled: !!params.id,
    refetchInterval: 4000,
  })
  const selectedChat = chatsData?.find((chat) => chat.id === Number(params.id))
  if (isPending) return <div>{t('common.loading')}</div>
  if (isError) return <div>{t('common.error')}</div>

  return (
    <div>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 p-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600 font-bold text-lg">
              {selectedChat?.fullname?.charAt(0)?.toUpperCase()}
            </span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-gray-900 font-semibold text-lg">{selectedChat?.fullname}</h1>
            <p className="text-gray-500 text-sm">@{selectedChat?.username}</p>
          </div>
        </div>
      </header>
      <MessageList
        messages={data || []}
        userId={user?.id}
        setMessageId={setMessageId}
        setContent={setContent}
      />
      <MessageInput
        content={content}
        messageId={messageId}
        setMessageId={setMessageId}
        setContent={setContent}
      />
    </div>
  )
}

export default ChatPage
