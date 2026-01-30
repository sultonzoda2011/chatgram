import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/lib/providers/theme-provider'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import LanguageSwitcher from '@/components/ui/languageSwitcher'
import logo from '@/assets/logo.png'
const Header = () => {
  const { theme, setTheme } = useTheme()
  return (
    <motion.header
      className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3 md:hidden">
          <Link to="/" className="flex items-center gap-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <img src={logo} className="w-10 h-10" alt="" />
            </motion.div>
            <h1 className="text-xl font-black text-primary tracking-tight">ChatGram</h1>
          </Link>
        </div>

        <div className="hidden md:block" />

        <div className="flex items-center gap-2">
          <motion.button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg hover:bg-accent transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>

          <LanguageSwitcher />
        </div>
      </div>
    </motion.header>
  )
}

export default Header
