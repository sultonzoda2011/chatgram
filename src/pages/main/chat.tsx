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
    <div className="flex flex-col h-full bg-background relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-chart-2/5 opacity-50 pointer-events-none"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />
      <motion.div
        className="absolute -top-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.header
        className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border/50 px-4 py-3 shadow-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="flex items-center justify-between max-w-4xl mx-auto w-full">
          <div className="flex items-center gap-3">
            <Link to="/chats" className="md:hidden">
              <motion.button
                className="p-2 -ml-2 rounded-xl hover:bg-primary/10 text-primary transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft size={20} />
              </motion.button>
            </Link>
            <div className="relative group">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-primary-foreground font-bold text-lg shrink-0 shadow-lg group-hover:scale-105 transition-transform duration-300">
                {selectedChat?.fullname.charAt(0).toUpperCase()}
              </div>
            </div>
            <div>
              <h1 className="font-bold text-foreground leading-none mb-1 group-hover:text-primary transition-colors">
                {selectedChat?.fullname}
              </h1>
              <div className="flex items-center gap-1.5"></div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <motion.button
              className="p-2 rounded-xl hover:bg-primary/10 text-chart-1 hover:text-primary transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone size={18} />
            </motion.button>
            <motion.button
              className="p-2 rounded-xl hover:bg-primary/10 text-chart-1 hover:text-primary transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Video size={18} />
            </motion.button>
            <motion.button
              className="p-2 rounded-xl hover:bg-primary/10 text-chart-1 hover:text-primary transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MoreVertical size={18} />
            </motion.button>
          </div>
        </div>
      </motion.header>

      <div className="flex-1 overflow-y-auto relative z-10 custom-scrollbar">
        <div className="max-w-5xl mx-auto w-full">
          <MessageList
            messages={data || []}
            userId={user?.id}
            setMessageId={setMessageId}
            setContent={setContent}
          />
        </div>
      </div>

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
