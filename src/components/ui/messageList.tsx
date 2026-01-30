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
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 25, delay: index * 0.02 }}
              className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`group relative max-w-[75%] rounded-2xl p-4 shadow-lg backdrop-blur-md transition-all duration-300 ${
                  isOwnMessage
                    ? 'bg-primary text-primary-foreground rounded-tr-none hover:shadow-primary/20'
                    : 'bg-card/60 border border-border/50 text-foreground rounded-tl-none hover:border-primary/30'
                }`}
              >
                <p className="text-sm wrap-break-word leading-relaxed font-medium">{message.content}</p>
                <div className="flex items-center justify-end gap-1 mt-1 opacity-60">
                  <p className="text-[10px] font-bold uppercase tracking-tighter">{formatDate(message.date)}</p>
                </div>

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
                        className="shadow-lg hover:shadow-xl transition-shadow bg-card/90 backdrop-blur-md rounded-lg"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="destructive"
                        size="icon-sm"
                        onClick={() => mutate(message.id)}
                        className="shadow-lg hover:shadow-xl transition-shadow rounded-lg"
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
