import {  Moon, Sun } from 'lucide-react'
import { useTheme } from '@/lib/providers/theme-provider'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import LanguageSwitcher from '@/components/ui/languageSwitcher'

const Header = () => {
  const { theme, setTheme } = useTheme()

  return (
    <motion.header
      className="sticky top-0 z-50 bg-card/95 backdrop-blur-lg border-b border-border shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <motion.div
              className="w-8 h-8 bg-linear-to-br from-primary to-chart-2 rounded-lg flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-primary-foreground font-bold text-lg">C</span>
            </motion.div>
            <h1 className="text-xl font-bold bg-linear-to-r from-primary to-chart-2 bg-clip-text text-transparent">
              ChatGram
            </h1>
          </Link>
        </div>

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
