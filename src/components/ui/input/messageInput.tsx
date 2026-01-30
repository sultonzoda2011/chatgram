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
      className="bg-card/40 backdrop-blur-xl border-t border-border/50 pt-4 pb-2 px-4 sticky bottom-0 z-40"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="max-w-5xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <AnimatePresence>
            {messageId && (
              <motion.div
                className="flex items-center justify-between bg-primary/10 backdrop-blur-md px-4 py-2 rounded-2xl text-sm text-primary font-bold border border-primary/20"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <div className="flex items-center gap-2">
                  <RefreshCcw className="w-4 h-4 animate-spin" />
                  <span className="uppercase tracking-widest text-[10px]">{t('chat.editing')}</span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => {
                    setMessageId?.('')
                    setContent?.('')
                  }}
                  className="h-6 w-6 rounded-full hover:bg-destructive/20 text-destructive transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-3">
            <div className="flex-1">
              <FormInput
                control={control}
                name="content"
                type="text"
                onKeyDown={handleKeyDown}
                placeholder={t('chat.placeholder')}

              />
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                type="submit"
                size="icon"
                disabled={isSending || isUpdating || !watch('content')}
                isPending={isSending || isUpdating}
                className="h-12 w-12 shrink-0 bg-linear-to-br from-primary via-primary to-chart-2 shadow-lg shadow-primary/20 rounded-2xl flex items-center justify-center"
              >
                {messageId ? <RefreshCcw className="w-5 h-5" /> : <Send className="w-5 h-5" />}
              </Button>
            </motion.div>
          </div>
        </form>
      </div>
    </motion.div>
  )
}

export default MessageInput
