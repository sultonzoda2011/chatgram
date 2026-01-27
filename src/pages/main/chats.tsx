import { getChatsApi } from '@/api/chatApi'
import { Input } from '@/components/ui/input/input'
import { Loading } from '@/components/ui'
import { ErrorDisplay } from '@/components/ui/error'
import { formatDate } from '@/lib/utils/date'
import type { IChatItem } from '@/types/chat'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { Search } from 'lucide-react'

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
    <div className="h-full flex flex-col">
      <div className="p-4 bg-background sticky top-15 z-40 border-b border-border">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={18}
          />
          <Input
            aria-label="Search chats"
            value={search}
            placeholder={t('home.searchPlaceholder')}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-accent/50 border-0 rounded-full"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredChats && filteredChats.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <p>No chats found</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredChats?.map((chat, index) => {
              return (
                <motion.div
                  key={chat.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={`/chat/${chat.id}`}
                    className="flex items-center gap-3 px-4 py-4 hover:bg-accent/50 transition-colors active:bg-accent"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-chart-2 rounded-lg flex items-center justify-center text-primary-foreground font-bold text-lg flex-shrink-0">
                      {chat.fullname.charAt(0).toUpperCase()}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground truncate">{chat.fullname}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {chat.last_message || t('home.noMessages')}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className="text-xs text-muted-foreground">{formatDate(chat.date)}</span>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatsPage
