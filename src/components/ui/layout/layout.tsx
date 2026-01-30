import BottomNav from '@/components/ui/bottomnav/bottomnav'
import Header from '@/components/ui/layout/header'
import Sidebar from '@/components/ui/layout/sidebar'
import { getToken, removeToken } from '@/lib/utils/cookie'
import { isTokenExpired } from '@/lib/utils/jwt'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { motion } from 'motion/react'

const Layout = () => {
  const token = getToken()
  const location = useLocation()
  const isChatPage = location.pathname.startsWith('/chat/') || location.pathname === '/chats'

  if (!token || isTokenExpired(token)) {
    removeToken()
    return <Navigate to="/login" replace />
  }

  return (
    <motion.div
      className={`flex flex-col md:flex-row ${isChatPage ? 'h-screen' : 'min-h-screen'} bg-linear-to-br from-background via-background to-accent/10 relative `}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-chart-2/5 opacity-50 pointer-events-none"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />

      <Sidebar />

      <div className={`flex-1 flex flex-col relative z-10 ${isChatPage ? 'h-full' : ''}`}>
        {!isChatPage && <Header />}
        <main className={`flex-1 relative ${!isChatPage ? 'pb-20 md:pb-0' : 'h-full'}`}>
          <Outlet />
        </main>
        {!isChatPage && (
          <div className="md:hidden">
            <BottomNav />
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default Layout
