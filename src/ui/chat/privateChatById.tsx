'use client'

import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { decodeJwt } from '@/lib/utils/jwt'
import { useEffect, useRef } from 'react'
import ChatMessage from '@/ui/chat/chatMessage'
import LoadingState from '@/ui/common/loadingState'
import ErrorState from '@/ui/common/errorState'
import { getPrivateChats } from '@/api/chatPrivate'

const PrivateChatById = () => {
  const { id } = useParams()
  const info = decodeJwt()
  const chatEndRef = useRef<HTMLDivElement>(null)

  const {
    data: chats,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['privateChats', id],
    queryFn: () => getPrivateChats(id as string),
  })

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chats])

  if (isLoading)
    return (
      <div className="text-center mt-8">
        <LoadingState />
        Загрузка чатов...
      </div>
    )
  if (error) return <ErrorState message="Chats not found" />

  return (
    <div className="flex flex-col gap-4 p-4 max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
      {chats && chats.length > 0 ? (
        chats.map((chat) => (
          <ChatMessage
            isRead={chat.isRead}
            key={chat.id}
            message={chat.message}
            createdAt={chat.createdAt}
            isMe={chat.receiverUserId === info?.id}
          />
        ))
      ) : (
        <div className="text-center text-gray-500 mt-8">Чатов нет, начните общаться</div>
      )}
      <div ref={chatEndRef} />
    </div>
  )
}

export default PrivateChatById
