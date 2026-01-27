import { sendMessagesApi, updateMessagesApi } from '@/api/messageApi'
import { Button } from '@/components/ui/button/button'
import FormInput from '@/components/ui/input/formInput'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { RefreshCcw, Send, X } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'

interface IMessageInputProps {
  messageId?: string
  setMessageId?: React.Dispatch<React.SetStateAction<string>>
  content?: string
  setContent?: React.Dispatch<React.SetStateAction<string>>
}

const MessageInput = ({ content, setContent, messageId, setMessageId }: IMessageInputProps) => {
  const queryClient = useQueryClient()
  const { id } = useParams()
  const { t } = useTranslation()

  const { control, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: { content: content || '' },
  })

  const { mutate: sendMessage, isPending: isSending } = useMutation({
    mutationFn: sendMessagesApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat', id] })
      reset()
    },
  })

  const { mutate: updateMessage, isPending: isUpdating } = useMutation({
    mutationFn: updateMessagesApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat', id] })
      setContent?.('')
      reset()
    },
  })

  useEffect(() => {
    setValue('content', content || '')
    if (!content) setMessageId?.('')
  }, [content, setValue, setMessageId])

  const onSubmit = (data: { content: string }) => {
    if (messageId) {
      updateMessage({ id: Number(messageId), content: data.content })
    } else {
      sendMessage({ toUserId: id!, content: data.content })
    }
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey && !e.altKey) {
      e.preventDefault()
      handleSubmit(onSubmit)()
    }
  }

  return (
    <motion.div
      className="bg-card/95 backdrop-blur-lg sticky bottom-0 w-full p-4 rounded-lg shadow-lg border border-border"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2">
        <AnimatePresence>
          {messageId && (
            <motion.div
              className="flex items-center justify-between bg-accent/50 backdrop-blur-sm px-3 py-2 rounded-lg text-sm text-accent-foreground font-medium border border-border w-full max-w-xs"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-2">
                <RefreshCcw className="w-4 h-4" />
                {t('chat.editing')}
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={() => {
                  setMessageId?.('')
                  setContent?.('')
                }}
                className="ml-2 hover:bg-destructive/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <FormInput
          control={control}
          name="content"
          type="text"
          onKeyDown={handleKeyDown}
          placeholder={t('chat.placeholder')}
        />
        <Button
          type="submit"
          size="icon"
          disabled={isSending || isUpdating || !watch('content')}
          isPending={isSending || isUpdating}
        >
          {messageId ? <RefreshCcw className="w-5 h-5" /> : <Send className="w-5 h-5" />}
        </Button>
      </form>
    </motion.div>
  )
}

export default MessageInput
