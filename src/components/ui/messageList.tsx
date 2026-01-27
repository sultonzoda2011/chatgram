import { deleteMessagesApi } from '@/api/messageApi'
import { Button } from '@/components/ui/button/button'
import { formatDate } from '@/lib/utils/date'
import type { IChatMessage } from '@/types/message'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Edit, Trash2 } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'

interface MessageListProps {
  messages: IChatMessage[]
  userId?: number
  setMessageId: (id: string) => void
  setContent: (content: string) => void
}

const MessageList = ({ messages, userId, setMessageId, setContent }: MessageListProps) => {
  const { id } = useParams()
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: deleteMessagesApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat', id] })
    },
  })

  return (
    <div className="flex flex-col gap-3 p-4">
      <AnimatePresence>
        {messages.map((message, index) => {
          const isOwnMessage = message.from_user_id === userId
          return (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`group relative max-w-[70%] rounded-lg p-3 shadow-sm backdrop-blur-sm ${
                  isOwnMessage
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card border border-border'
                }`}
              >
                <p className="text-sm wrap-break-word">{message.content}</p>
                <p className="text-xs mt-1 opacity-70">{formatDate(message.date)}</p>

                {isOwnMessage && (
                  <motion.div
                    className="absolute -top-2 -right-2 flex gap-1 opacity-0 group-hover:opacity-100"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button
                      variant="secondary"
                      size="icon-sm"
                      onClick={() => {
                        setMessageId(String(message.id))
                        setContent(message.content)
                      }}
                      className="shadow-md"
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon-sm"
                      onClick={() => mutate(message.id)}
                      className="shadow-md"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

export default MessageList
