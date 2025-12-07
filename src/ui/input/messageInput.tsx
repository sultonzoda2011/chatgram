'use client'
import { Input } from '@/ui/input/input'
import { FileImageIcon, SendHorizonal } from 'lucide-react'
import { Button } from '@/ui/button/button'
import { useState } from 'react'

const MessageInput = () => {
  const [text, setText] = useState('')

  const handleSend = () => {
    if (!text.trim()) return
    console.log('Отправлено:', text)
    setText('')
  }

  return (
    <div className="flex items-center gap-2 p-3 border-t border-border bg-background dark:bg-background">
      <Button variant="outline" className="p-2 px-5 h-full rounded-full">
        <FileImageIcon size={20} />
      </Button>

      <Input
        type="text"
        placeholder="Напишите сообщение..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        className="flex-1 rounded-xl border border-border focus:ring-2 focus:ring-primary focus:border-primary px-4 py-2"
      />

      <Button
        variant="default"
        size="default"
        onClick={handleSend}
        className="flex items-center gap-2 h-full px-4 py-2 rounded-xl hover:bg-primary/90 active:scale-95 transition-all"
      >
        <SendHorizonal size={18} />
        Отправить
      </Button>
    </div>
  )
}

export default MessageInput
