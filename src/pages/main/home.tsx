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
    <div className="p-4 space-y-6">
      <div className="space-y-3">
        {chatsData?.map((chat, index) => (
          <motion.div
            key={chat.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <UserItem chat={chat} index={index} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default HomePage
