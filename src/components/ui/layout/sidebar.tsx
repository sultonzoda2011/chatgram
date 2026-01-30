import { Home, MessageCircle, Search, User } from "lucide-react"
import { NavLink, Link } from "react-router-dom"
import { motion } from "motion/react"
import logo from '@/assets/logo.png'

const navItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/chats", icon: MessageCircle, label: "Chats" },
  { to: "/search", icon: Search, label: "Search" },
  { to: "/profile", icon: User, label: "Profile" },
]

const Sidebar = () => {
  return (
    <motion.aside
      className="hidden md:flex flex-col w-64 h-screen sticky top-0 bg-card/80 backdrop-blur-xl border-r border-border p-4 z-50"
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="mb-8 px-4">
        <Link to="/" className="flex items-center gap-3">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <img src={logo} className="w-10 h-10" alt="Logo" />
          </motion.div>
          <h1 className="text-2xl font-black text-primary tracking-tight">ChatGram</h1>
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 relative group ${
                isActive
                  ? "text-primary bg-primary/10 shadow-sm"
                  : "text-chart-1 hover:text-foreground hover:bg-accent/50"
              }`
            }
          >
            <Icon size={22} />
            <span className="font-semibold">{label}</span>
            <motion.div
              className="absolute left-0 w-1 h-6 bg-primary rounded-r-full opacity-0 group-[.active]:opacity-100"
              layoutId="sidebar-active-indicator"
            />
          </NavLink>
        ))}
      </div>
    </motion.aside>
  )
}

export default Sidebar
