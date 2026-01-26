import { Home, MessageCircle, Search, User } from "lucide-react"
import { NavLink } from "react-router-dom"

const navItems = [
  { to: "/", icon: Home },
  { to: "/chats", icon: MessageCircle },
  { to: "/search", icon: Search },
  { to: "/profile", icon: User },
]

const navItemBase =
  "flex items-center justify-center flex-1 h-12 transition-colors duration-200"

const BottomNav = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="flex w-full bg-white/80 backdrop-blur-xl border-t border-white/20">
        {navItems.map(({ to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
          className={({ isActive }) =>
              `${navItemBase} ${
                isActive
                  ? "bg-primary text-white shadow-lg scale-110"
                  : "text-gray-500 hover:text-primary hover:scale-110"
              } rounded-full mx-1`
            }
          >
            <Icon size={22} />
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default BottomNav
