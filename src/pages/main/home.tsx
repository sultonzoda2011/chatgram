import { getChatsApi } from '@/api/chatApi'
import { Loading } from '@/components/ui'
import { ErrorDisplay } from '@/components/ui/error'
import type { IChatItem } from '@/types/chat'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import UserItem from '@/components/ui/userItem'

const HomePage = () => {
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
    <div className="p-4 space-y-6 max-w-5xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-1"
      >
        <h2 className="text-2xl font-black text-foreground tracking-tight">
          {t('home.title') || 'Recent Chats'}
        </h2>
        <p className="text-sm font-medium text-chart-1 tracking-wider uppercase">
          {t('home.subtitle') || 'Stay connected with your friends'}
        </p>
      </motion.div>

      <div className="space-y-4">
        {chatsData?.map((chat, index) => (
          <motion.div
            key={chat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 30,
              delay: index * 0.1 
            }}
          >
            <UserItem chat={chat} index={index} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default HomePage
