import { deleteMessagesApi } from '@/api/messageApi'
import { Button } from '@/components/ui/button/button'
import type { IChatMessage } from '@/types/message'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Edit, Trash2 } from 'lucide-react'
import { useParams } from 'react-router-dom'

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
    <div>
      {messages.map((message) => (
        <div key={message.id}>
          <div>
            <p>{message.content}</p>
            {message.from_user_id === userId && (
              <div>
                <Button
                  onClick={() => {
                    setMessageId(String(message.id))
                    setContent(message.content)
                  }}
                >
                  <Edit />
                </Button>
                <Button
                  onClick={() => {
                    mutate(message.id)
                  }}
                >
                  <Trash2 />
                </Button>
              </div>
            )}
          </div>
          <p>{message.date}</p>
        </div>
      ))}
    </div>
  )
}

export default MessageList
