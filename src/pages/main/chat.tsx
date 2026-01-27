import { getMessagesApi } from '@/api/messageApi'
import MessageInput from '@/components/ui/input/messageInput'
import MessageList from '@/components/ui/messageList'
import { Loading } from '@/components/ui'
import { ErrorDisplay } from '@/components/ui/error'
import { useAuthUser } from '@/lib/utils/useAuthUser'
import type { IChatItem } from '@/types/chat'
import type { IChatMessage } from '@/types/message'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowLeft, MoreVertical, Phone, Video } from 'lucide-react'
import { getChatsApi } from '@/api/chatApi'

const ChatPage = () => {
  const { t } = useTranslation()
  const user = useAuthUser()
  const params = useParams()
  const [messageId, setMessageId] = useState('')
  const [content, setContent] = useState('')
  const { data: chatsData } = useQuery<IChatItem[]>({
    queryKey: ['chats'],
    queryFn: getChatsApi,
  })
  const { data, isPending, isError, refetch } = useQuery<IChatMessage[]>({
    queryKey: ['chat', params.id],
    queryFn: () => getMessagesApi(params.id as string),
    enabled: !!params.id,
    refetchInterval: 4000,
  })
  const selectedChat = chatsData?.find((chat) => chat.id === Number(params.id))
  if (isPending) return <Loading text={t('common.loading')} fullscreen />
  if (isError)
    return <ErrorDisplay title={t('common.error')} onRetry={() => refetch()} fullscreen />

  return (
    <div className="flex flex-col h-screen bg-background">
      <motion.header
        className="sticky top-0 z-50 bg-card/95 backdrop-blur-lg border-b border-border px-4 py-3"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/chats">
              <motion.button
                className="p-2 -ml-2 rounded-full hover:bg-accent transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft size={20} />
              </motion.button>
            </Link>
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-chart-2 rounded-lg flex items-center justify-center text-primary-foreground font-bold text-lg flex-shrink-0">
          {selectedChat?.fullname.charAt(0).toUpperCase()}
        </div>
            <div>
              <h1 className="font-semibold text-foreground">{selectedChat?.fullname}</h1>
              <p className="text-xs text-chart-1">Online</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <motion.button
              className="p-2 rounded-full hover:bg-accent transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone size={18} />
            </motion.button>
            <motion.button
              className="p-2 rounded-full hover:bg-accent transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Video size={18} />
            </motion.button>
            <motion.button
              className="p-2 rounded-full hover:bg-accent transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MoreVertical size={18} />
            </motion.button>
          </div>
        </div>
      </motion.header>

      <div className="flex-1 overflow-y-auto bg-gradient-to-b from-background to-accent/20">
        <MessageList
          messages={data || []}
          userId={user?.id}
          setMessageId={setMessageId}
          setContent={setContent}
        />
      </div>

      <div className="border-t border-border bg-card">
        <MessageInput
          content={content}
          messageId={messageId}
          setMessageId={setMessageId}
          setContent={setContent}
        />
      </div>
    </div>
  )
}

export default ChatPage
