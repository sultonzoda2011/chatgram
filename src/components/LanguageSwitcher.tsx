import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDown, Check, Globe } from 'lucide-react'

import enFlag from '../assets/flags/gb.svg'
import ruFlag from '../assets/flags/ru.svg'
import tjFlag from '../assets/flags/tj.svg'
import { Button } from '@/components/ui/button'

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
        className="relative flex items-center gap-2 px-3 py-3 h-auto rounded-xl bg-background/50 hover:bg-background/80 backdrop-blur-xl border-2 border-border/50 hover:border-primary/50 text-foreground shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
      >
        <button className="flex items-center gap-2">
          <div className="sm:hidden relative">
            <Globe size={18} className="text-primary" />
          </div>

          <div className="relative hidden sm:block">
            <img
              src={currentLang.flag}
              alt={currentLang.label}
              className="w-6 h-4 object-cover rounded-[2px] shadow-md ring-1 ring-black/10 transition-transform duration-200 hover:scale-110"
            />
          </div>

          <span className="text-sm font-semibold hidden sm:inline-block">{currentLang.label}</span>

          <ChevronDown
            size={16}
            className={`text-muted-foreground transition-transform duration-300 ${
              isOpen ? 'rotate-180 text-primary' : ''
            }`}
          />
        </button>
      </Button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

          <ul className="absolute right-0 top-full mt-2 w-52 bg-card/95 backdrop-blur-2xl border-2 border-border/50 rounded-2xl shadow-2xl shadow-black/10 dark:shadow-black/30 overflow-hidden z-50 p-2 transition-all duration-200">
            {languages.map((lang) => {
              const isSelected = i18n.language === lang.code
              return (
                <li key={lang.code}>
                  <Button
                    asChild
                    variant="ghost"
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 group ${
                      isSelected
                        ? 'bg-primary/15 text-primary hover:bg-primary/20'
                        : 'text-foreground hover:text-primary'
                    }`}
                  >
                    <button
                      onClick={() => handleSelect(lang.code)}
                      className="flex items-center w-full gap-3"
                    >
                      {isSelected && <div className="w-1 h-6 bg-primary rounded-full" />}
                      <img
                        src={lang.flag}
                        alt={lang.label}
                        className="w-7 h-5 object-cover rounded shadow-md ring-1 ring-black/10"
                      />
                      <span
                        className={`font-semibold flex-1 text-left ${
                          isSelected ? 'text-primary' : ''
                        }`}
                      >
                        {lang.label}
                      </span>
                      {isSelected && <Check size={16} className="text-primary" />}
                    </button>
                  </Button>
                </li>
              )
            })}
          </ul>
        </>
      )}
    </div>
  )
}
export default LanguageSwitcher
