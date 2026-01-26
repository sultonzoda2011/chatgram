import { getChatsApi } from '@/api/chatApi'
import { Input } from '@/components/ui/input/input'
import { formatDate } from '@/lib/utils/date'
import type { IChatItem } from '@/types/chat'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const ChatsPage = () => {
  const { t } = useTranslation()
  const {
    data: chatsData,
    isPending: chatsPending,
    error: chatsError,
  } = useQuery<IChatItem[]>({
    queryKey: ['chats'],
    queryFn: getChatsApi,
    refetchInterval: 10000,
  })
  const [search, setSearch] = useState('')
  const filteredChats = chatsData?.filter((chat) =>
    chat.fullname.toLowerCase().includes(search.toLowerCase()),
  )
  if (chatsPending) return <div className="p-4">{t('home.loading')}</div>
  if (chatsError) return <div className="p-4 text-red-500">{t('home.error')}</div>

  return (
    <div>
      <Input aria-label="Search chats" value={search} onChange={(e) => setSearch(e.target.value)} />

      <div className="flex flex-col gap-2">
        {filteredChats?.map((chat) => (
          <Link
            key={chat.id}
            to={`/chat/${chat.id}`}
            className="flex items-center justify-between px-4 py-3 hover:bg-gray-100 transition"
          >
            <div>
              <h3 className="font-medium">{chat.fullname}</h3>
              <p className="text-sm text-gray-500 truncate">
                {chat.last_message || t('home.noMessages')}
              </p>
            </div>
            <p>{formatDate(chat.date)}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ChatsPage
