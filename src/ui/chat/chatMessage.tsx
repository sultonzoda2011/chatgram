import { Verified } from 'lucide-react'

interface ChatMessageProps {
  message: string
  createdAt: string
  isRead: boolean
  isMe: boolean
  userName?: string
}

const ChatMessage = ({ message, createdAt, isMe, isRead, userName }: ChatMessageProps) => {
  return (
    <div className={`flex items-end ${isMe ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`
          relative max-w-xs md:max-w-lg px-5 py-3 rounded-2xl shadow-lg transition-all duration-300 transform
          ${
            isMe
              ? 'bg-linear-to-br from-primary to-primary/80 text-primary-foreground rounded-br-none hover:scale-105'
              : 'bg-linear-to-br from-muted to-muted/80 text-muted-foreground rounded-bl-none hover:scale-105'
          }
          animate-fade-in
        `}
      >
        <span className="font-medium text-[18px] wrap-break-word">{message}</span>
        <div className="text-xs text-gray-400 mt-1 text-right">
          {new Date(createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          {isRead ? (
            <div className="flex items-center gap-1">
              <Verified className="w-4 h-4" />
              <Verified className="w-4 h-4" />
            </div>
          ) : (
            <Verified className="w-4 h-4" />
          )}
        </div>
      </div>
    </div>
  )
}

export default ChatMessage
