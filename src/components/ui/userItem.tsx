import { formatDate } from '@/lib/utils/date'
import type { IChatItem } from '@/types/chat'
import type { IUser } from '@/types/user'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

interface UserItemProps {
  chat?: IChatItem
  user?: IUser
  index: number
}

const UserItem = ({ chat, user }: UserItemProps) => {
  const { t } = useTranslation()
  const data = chat || user
  const name = data?.fullname || data?.username || ''
  const lastMessage = (chat as IChatItem)?.last_message
  const date = (chat as IChatItem)?.date
  const isChat = !!chat

  return (
    <Link
      to={`/chat/${data?.id}`}
      className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border hover:shadow-md transition-all"
    >
      <div className="w-10 h-10 bg-linear-to-br from-primary to-chart-2 rounded-lg flex items-center justify-center text-primary-foreground font-bold text-lg shrink-0">
        {name.charAt(0).toUpperCase()}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-foreground">{name}</h3>
        {isChat && lastMessage && (
          <p className="text-sm text-muted-foreground truncate">
            {lastMessage}
          </p>
        )}
        {!isChat && !lastMessage && (
          <p className="text-sm text-muted-foreground">
            {t('home.noMessages')}
          </p>
        )}
      </div>
      {isChat && date && (
        <div className="text-xs text-muted-foreground whitespace-nowrap">
          {formatDate(date)}
        </div>
      )}
    </Link>
  )
}

export default UserItem
