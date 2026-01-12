import en from './locales/en.json'
import ru from './locales/ru.json'
import tj from './locales/tj.json'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
const resources = {
  en: {
    translation: en,
  },
  ru: {
    translation: ru,
  },
  tj: {
    translation: tj,
  },
}
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ru',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  })

export default i18n
