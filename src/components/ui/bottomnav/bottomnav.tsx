import { Home, MessageCircle, Search, User } from "lucide-react"
import { NavLink } from "react-router-dom"
import { motion } from "motion/react"

const navItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/chats", icon: MessageCircle, label: "Chats" },
  { to: "/search", icon: Search, label: "Search" },
  { to: "/profile", icon: User, label: "Profile" },
]

const BottomNav = () => {
  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-50"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="flex w-full bg-card/95 backdrop-blur-lg border-t border-border shadow-2xl">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 h-16 transition-colors duration-200 relative group ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="active-indicator"
                    className="absolute top-0 left-0 right-0 h-0.5 bg-primary"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
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
