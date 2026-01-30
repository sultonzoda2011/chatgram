import { ChevronDown, Globe } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'motion/react'

import { Button } from '@/components/ui/button/button'
import enFlag from '../../assets/flags/gb.svg'
import ruFlag from '../../assets/flags/ru.svg'
import tjFlag from '../../assets/flags/tj.svg'

const languages = [
  { code: 'en', label: 'English', flag: enFlag },
  { code: 'ru', label: 'Русский', flag: ruFlag },
  { code: 'tj', label: 'Тоҷикӣ', flag: tjFlag },
]

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const currentLang = languages.find((l) => l.code === i18n.language) || languages[0]

  const toggleOpen = () => setIsOpen(!isOpen)

  const handleSelect = (code: string) => {
    i18n.changeLanguage(code)
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={containerRef}>
      <Button
        asChild
        variant="outline"
        onClick={toggleOpen}
        className="relative flex items-center gap-2 px-2.5 py-2.5 h-auto rounded-lg  backdrop-blur-lg border border-border shadow-sm overflow-hidden group"
      >
        <button className="flex items-center gap-2">
          <div className="sm:hidden relative">
            <Globe size={16} className="text-primary" />
          </div>

          <motion.div
            className="relative hidden sm:block"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <img
              src={currentLang.flag}
              alt={currentLang.label}
              className="w-5 h-3 object-cover rounded-[2px] shadow-sm ring-1 ring-border"
            />
          </motion.div>

          <span className="text-xs font-semibold hidden sm:inline-block">{currentLang.label}</span>

          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown size={14} className="text-muted-foreground" />
          </motion.div>
        </button>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.ul
              className="absolute right-0 top-full mt-2 w-40 bg-card/95 backdrop-blur-lg border border-border rounded-lg shadow-xl overflow-hidden z-50 p-1"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {languages.map((lang) => {
                const isSelected = i18n.language === lang.code
                return (
                  <motion.li
                    key={lang.code}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button
                      asChild
                      variant="ghost"
                      className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-xs group ${
                        isSelected
                          ? 'bg-primary/15 text-primary hover:bg-primary/20'
                          : 'text-foreground hover:text-primary'
                      }`}
                    >
                      <button
                        onClick={() => handleSelect(lang.code)}
                        className="flex items-center w-full gap-2.5"
                      >
                        {isSelected && (
                          <motion.div
                            className="w-1 h-5 bg-primary rounded-full"
                            layoutId="selected-indicator"
                          />
                        )}
                        <img
                          src={lang.flag}
                          alt={lang.label}
                          className="w-6 h-4 object-cover rounded shadow-sm ring-1 ring-border"
                        />
                        <span className="font-semibold flex-1 text-left">
                          {lang.label}
                        </span>
                      </button>
                    </Button>
                  </motion.li>
                )
              })}
            </motion.ul>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default LanguageSwitcher
