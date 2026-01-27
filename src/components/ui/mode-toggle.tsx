import { Button } from '@/components/ui/button/button'
import { useTheme } from '@/lib/providers/theme-provider'
import { Moon, Sun } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex gap-2">
      <Button
        variant={theme === 'light' ? 'default' : 'outline'}
        size="icon"
        onClick={() => setTheme('light')}
        className="relative overflow-hidden"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key="sun"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Sun className="h-4 w-4" />
          </motion.div>
        </AnimatePresence>
      </Button>
      <Button
        variant={theme === 'dark' ? 'default' : 'outline'}
        size="icon"
        onClick={() => setTheme('dark')}
        className="relative overflow-hidden"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key="moon"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Moon className="h-4 w-4" />
          </motion.div>
        </AnimatePresence>
      </Button>
    </div>
  )
}
