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
      className="flex items-center gap-4 p-4 bg-card/60 backdrop-blur-md rounded-2xl border border-border/50 hover:bg-card/80 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group"
    >
      <div className="relative">
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-primary-foreground font-bold text-xl shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-300">
          {name.charAt(0).toUpperCase()}
        </div>

      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <h3 className="font-bold text-foreground truncate group-hover:text-primary transition-colors duration-200">{name}</h3>
          {isChat && date && (
            <span className="text-[10px] font-medium text-chart-1 uppercase tracking-wider">
              {formatDate(date)}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          {isChat && lastMessage ? (
            <p className="text-sm text-chart-1 truncate font-medium">
              {lastMessage}
            </p>
          ) : (
            <p className="text-sm text-chart-1 font-medium">
              {t('home.noMessages')}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}

export default UserItem
