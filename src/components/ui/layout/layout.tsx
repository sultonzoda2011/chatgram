import BottomNav from '@/components/ui/bottomnav/bottomnav'
import { getToken, removeToken } from '@/lib/utils/cookie'
import { isTokenExpired } from '@/lib/utils/jwt'
import { Navigate, Outlet } from 'react-router-dom'

const Layout = () => {
  const token = getToken()

  if (!token || isTokenExpired(token)) {
    removeToken()
    return <Navigate to="/login" replace />
  }

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <Outlet />
      <BottomNav />
    </div>
  )
}

export default Layout
