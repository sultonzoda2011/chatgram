import { sendMessagesApi, updateMessagesApi } from '@/api/messageApi'
import { Button } from '@/components/ui/button/button'
import FormInput from '@/components/ui/input/formInput'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { RefreshCcw, Send } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

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
    <div className="bg-white sticky bottom-0 w-full p-4 rounded-lg shadow-sm border border-gray-200 ">
      <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2">
        {messageId && (
          <div className="flex items-center justify-between bg-yellow-100 px-2 py-1 rounded text-sm text-yellow-800 font-medium w-full max-w-xs">
            <div className="flex items-center gap-1">
              <RefreshCcw className="w-4 h-4" />
              {t('chat.editing')}
            </div>
            <Button
              type="button"
              onClick={() => {
                setMessageId?.('')
                setContent?.('')
              }}
              className="ml-2 text-yellow-800  font-bold hover:text-yellow-600 "
            >
              ×
            </Button>
          </div>
        )}

        <FormInput
          control={control}
          name="content"
          type="text"
          onKeyDown={handleKeyDown}
          placeholder={t('chat.placeholder')}
        />
        <Button
          type="submit"
          className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1"
          disabled={isSending || isUpdating || !watch('content')}
        >
          {isSending || isUpdating ? (
            <span className="animate-spin">⏳</span>
          ) : messageId ? (
            <RefreshCcw />
          ) : (
            <Send />
          )}
        </Button>
      </form>
    </div>
  )
}

export default MessageInput
