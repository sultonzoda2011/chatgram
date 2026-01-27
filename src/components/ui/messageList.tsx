import { deleteMessagesApi } from '@/api/messageApi'
import { Button } from '@/components/ui/button/button'
import { formatDate } from '@/lib/utils/date'
import type { IChatMessage } from '@/types/message'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Edit, Trash2 } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { useEffect, useRef } from 'react'

interface MessageListProps {
  messages: IChatMessage[]
  userId?: number
  setMessageId: (id: string) => void
  setContent: (content: string) => void
}

const MessageList = ({ messages, userId, setMessageId, setContent }: MessageListProps) => {
  const messageRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])
  const { id } = useParams()
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: deleteMessagesApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat', id] })
    },
  })

  return (
    <div className="flex flex-col gap-3 p-4 pb-2 overflow-y-auto flex-1">
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
                className={`group relative max-w-[70%] rounded-lg p-3 shadow-sm backdrop-blur-sm transition-all duration-200 ${
                  isOwnMessage
                    ? 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground hover:shadow-md'
                    : 'bg-card border border-border hover:border-border/80 hover:shadow-md'
                }`}
              >
                <p className="text-sm break-words leading-relaxed">{message.content}</p>
                <p className="text-xs mt-2 opacity-70">{formatDate(message.date)}</p>

                {isOwnMessage && (
                  <motion.div
                    className="absolute -top-3 -right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    initial={{ scale: 0, y: -10 }}
                    whileInView={{ scale: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="secondary"
                        size="icon-sm"
                        onClick={() => {
                          setMessageId(String(message.id))
                          setContent(message.content)
                        }}
                        className="shadow-lg hover:shadow-xl transition-shadow"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="destructive"
                        size="icon-sm"
                        onClick={() => mutate(message.id)}
                        className="shadow-lg hover:shadow-xl transition-shadow"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </motion.div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )
        })}
        <div ref={messageRef}></div>
      </AnimatePresence>
    </div>
  )
}

export default MessageList
