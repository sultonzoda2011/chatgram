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
      className=" bg-gradient-to-t from-background via-background/95 to-transparent pt-6 pb-4 px-4 z-40"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <AnimatePresence>
            {messageId && (
              <motion.div
                className="flex items-center justify-between bg-gradient-to-r from-amber-500/10 to-orange-500/10 backdrop-blur-sm px-4 py-2.5 rounded-lg text-sm text-amber-600 dark:text-amber-400 font-semibold border border-amber-500/20 hover:border-amber-500/40 transition-colors"
                initial={{ opacity: 0, x: -20, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, x: -20, y: 10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  >
                    <RefreshCcw className="w-4 h-4" />
                  </motion.div>
                  <span>{t('chat.editing')}</span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => {
                    setMessageId?.('')
                    setContent?.('')
                  }}
                  className="ml-2 hover:bg-destructive/20 transition-colors"
                >
                  <X className="w-4 h-4" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-end gap-2.5">
            <div className="flex-1 w-full">
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
                className="h-10 w-10 shrink-0 bg-gradient-to-br from-primary via-primary to-primary/80 hover:from-primary/90 hover:via-primary/85 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-200 rounded-lg flex items-center justify-center"
              >
                <motion.div
                  animate={{ rotate: messageId ? 360 : 0 }}
                  transition={{ duration: messageId ? 0.6 : 0, repeat: messageId ? Infinity : 0 }}
                >
                  {messageId ? <RefreshCcw className="w-5 h-5" /> : <Send className="w-5 h-5" />}
                </motion.div>
              </Button>
            </motion.div>
          </div>
        </form>
      </div>
    </motion.div>
  )
}

export default MessageInput
