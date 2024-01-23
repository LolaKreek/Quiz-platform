import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import { PL } from './langs'

i18n
  .use(Backend)
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: PL,
    debug: false,
    ns: ['login', 'main', 'notifications'],
    defaultNS: 'login',
    returnObjects: true,
    detection: {
      order: ['localStorage', 'cookie'],
      caches: ['localStorage', 'cookie'],
    },
    interpolation: {
      escapeValue: false,
    },
    saveMissing: true,
    missingKeyHandler: (lng, ns, key, fallbackValue) => {
      console.warn(lng, ns, key, fallbackValue)
    }
  })

export default i18n
