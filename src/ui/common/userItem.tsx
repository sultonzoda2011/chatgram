import React, { Dispatch, SetStateAction } from 'react'
import { Mail, User } from 'lucide-react'
import Image from 'next/image'
import { useParams } from 'next/navigation'

interface UserItemProps {
  id: string
  profilePictureUrl: string
  userName: string
  nickname: string
  setUserName: Dispatch<SetStateAction<string>>
  email: string
  rightActions?: React.ReactNode
  onclick?: () => void
  setProfileUserModalOpen?: Dispatch<SetStateAction<boolean>> | undefined
}

const UserItem = ({
  profilePictureUrl,
  id,
  userName,
  nickname,
  email,
  onclick,
  rightActions,
  setProfileUserModalOpen,
}: UserItemProps) => {
  const param = useParams()
  const isActive = param.id === id

  return (
    <div
      onClick={onclick}
      className={`
        flex items-center gap-3 p-3 rounded-xl cursor-pointer border-b border-sidebar-border
        transition-colors duration-200
        ${isActive ? 'bg-primary/20 dark:bg-primary/30' : 'hover:bg-sidebar-accent/10 dark:hover:bg-sidebar-accent/30'}
      `}
    >
      <div className="relative w-12 h-12 shrink-0 flex items-center justify-center rounded-full overflow-hidden bg-muted/20 dark:bg-muted/40">
        {profilePictureUrl ? (
          <Image
            src={profilePictureUrl}
            alt={userName}
            width={48}
            height={48}
            className="object-cover w-full h-full"
          />
        ) : (
          <User className="w-6 h-6 text-muted-foreground" />
        )}
      </div>

      <div className="flex flex-col overflow-hidden">
        <span className="font-semibold text-foreground truncate">{nickname || userName}</span>
        <span className="flex items-center gap-1 text-sm text-muted-foreground truncate lowercase">
          <Mail className="w-4 h-4" />
          {email}
        </span>
      </div>

      {rightActions && <div className="ml-auto flex gap-2 items-center">{rightActions}</div>}
    </div>
  )
}

export default UserItem
