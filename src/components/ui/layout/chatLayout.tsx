import { Outlet, useParams } from 'react-router-dom'
import ChatsPage from '@/pages/main/chats'
import { useTranslation } from 'react-i18next'

const ChatLayout = () => {
  const { id } = useParams()
  const isChatDetailPage = !!id
  const {t} = useTranslation()
  return (
    <div className="flex h-[calc(100vh-64px)] md:h-screen overflow-hidden">
      <div
        className={`
        ${isChatDetailPage ? 'hidden md:block' : 'block'}
        w-full md:w-80 lg:w-96 border-r border-border bg-card/30 backdrop-blur-md overflow-y-auto
      `}
      >
        <ChatsPage />
      </div>

      <div
        className={`
        ${isChatDetailPage ? 'block' : 'hidden md:flex'}
        flex-1 bg-background relative
      `}
      >
        <Outlet />
        {!isChatDetailPage && (
          <div className="hidden md:flex flex-col items-center justify-center h-full w-full text-center p-8 space-y-4">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-foreground">{t("chatsLayout.selectChat")}</h3>
            <p className="text-chart-1 max-w-xs mx-auto">
              {t("chatsLayout.selectChatMessage")}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatLayout
