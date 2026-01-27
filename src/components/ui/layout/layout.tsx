import BottomNav from '@/components/ui/bottomnav/bottomnav'
import Header from '@/components/ui/layout/header'
import { getToken, removeToken } from '@/lib/utils/cookie'
import { isTokenExpired } from '@/lib/utils/jwt'
import { Navigate, Outlet } from 'react-router-dom'
import { motion } from 'motion/react'

const Layout = () => {
  const token = getToken()

  if (!token || isTokenExpired(token)) {
    removeToken()
    return <Navigate to="/login" replace />
  }

  return (
    <motion.div
      className="flex flex-col min-h-screen bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Header />
      <main className="flex-1 pb-20">
        <Outlet />
      </main>
      <BottomNav />
    </motion.div>
  )
}

export default Layout
