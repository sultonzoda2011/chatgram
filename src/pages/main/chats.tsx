import { getChatsApi } from '@/api/chatApi'
import { Input } from '@/components/ui/input/input'
import {  Loading } from '@/components/ui'
import { ErrorDisplay } from '@/components/ui/error'
import type { IChatItem } from '@/types/chat'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import UserItem from '@/components/ui/userItem'
import { ArrowLeft,  MessageCircle, Search } from 'lucide-react'
import { Link } from 'react-router-dom'

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

  <div className="sticky top-0 z-40 bg-background/70 backdrop-blur-xl border-b border-border/40">
  <div className="flex items-center  px-4 py-3 max-w-5xl mx-auto">

    <Link
      to="/"
      className="p-2 rounded-xl hover:bg-accent/30 transition"
    >
      <ArrowLeft className="w-5 h-5" />
    </Link>



    <div className="relative ml-auto w-full max-w-xs group">
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground
        group-focus-within:text-primary transition"
      />
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={t('home.searchPlaceholder')}
        className="
          pl-10 h-10 rounded-xl
          bg-card/70 border-border/40
          focus-visible:ring-2 focus-visible:ring-primary/30
          transition
        "
      />
    </div>

  </div>
</div>


      <div className="flex-1 overflow-y-auto p-4">
        {filteredChats && filteredChats.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center">
              <MessageCircle size={40} className="text-chart-1" />
            </div>
            <p className="text-chart-1 font-medium">{t('chats.noFound')}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredChats?.map((chat, index) => (
              <motion.div
                key={chat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 30,
                  delay: index * 0.05,
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
