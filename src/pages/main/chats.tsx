import { getChatsApi } from '@/api/chatApi'
import { Input } from '@/components/ui/input/input'
import { Loading } from '@/components/ui'
import { ErrorDisplay } from '@/components/ui/error'
import type { IChatItem } from '@/types/chat'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import UserItem from '@/components/ui/userItem'
import { MessageCircle, Search } from 'lucide-react'

const ChatsPage = () => {
  const { t } = useTranslation()
  const {
    data: chatsData,
    isPending: chatsPending,
    error: chatsError,
    refetch,
  } = useQuery<IChatItem[]>({
    queryKey: ['chats'],
    queryFn: getChatsApi,
    refetchInterval: 10000,
  })
  const [search, setSearch] = useState('')
  const filteredChats = chatsData?.filter((chat) =>
    chat.fullname.toLowerCase().includes(search.toLowerCase()),
  )
  if (chatsPending) return <Loading text={t('home.loading')} className="p-8" />
  if (chatsError)
    return (
      <ErrorDisplay
        title={t('home.error')}
        error={chatsError}
        onRetry={() => refetch()}
        className="m-4"
      />
    )

  return (
    <div className="h-full flex flex-col max-w-5xl mx-auto w-full">
      <div className="p-4 bg-background/40 backdrop-blur-md sticky top-0 z-40 border-b border-border/50">
        <div className="relative group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-chart-1 group-focus-within:text-primary transition-colors duration-200"
            size={18}
          />
          <Input
            aria-label="Search chats"
            value={search}
            placeholder={t('home.searchPlaceholder')}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-12 bg-card/60 border-border/50 rounded-2xl h-12 focus:ring-primary/20 focus:border-primary/30 transition-all duration-300 shadow-sm"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {filteredChats && filteredChats.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center">
              <MessageCircle size={40} className="text-chart-1" />
            </div>
            <p className="text-chart-1 font-medium">{t('chats.noFound') || 'No chats found'}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredChats?.map((chat, index) => (
              <motion.div
                key={chat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  delay: index * 0.05 
                }}
              >
                <UserItem chat={chat} index={index} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatsPage
