import { Home, MessageCircle, Search, User } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next';

const BottomNav = () => {
  const {t} = useTranslation();
  const navItems = [
    { to: '/', icon: Home, label: t("bottomNav.home") },
    { to: '/chats', icon: MessageCircle, label: t("bottomNav.chats") },
    { to: '/search', icon: Search, label: t("bottomNav.search") },
    { to: '/profile', icon: User, label: t("bottomNav.profile") },
  ]

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-50 p-4 pointer-events-none"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="max-w-md mx-auto flex w-full bg-card/80 backdrop-blur-xl border border-border shadow-2xl rounded-2xl overflow-hidden pointer-events-auto">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 h-16 transition-colors duration-200 relative group ${
                isActive ? 'text-primary' : 'text-chart-1 hover:text-foreground'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="active-indicator"
                    className="absolute inset-0 bg-primary/5 border-t-2 border-primary"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-center gap-1"
                >
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                  <span className="text-xs font-medium">{label}</span>
                </motion.div>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </motion.div>
  )
}

export default BottomNav
