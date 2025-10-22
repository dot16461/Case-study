import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './resources/en/common.json'
import ar from './resources/ar/common.json'

const storedLang = (() => {
  try {
    const v = localStorage.getItem('lang')
    return v || 'en'
  } catch {
    return 'en'
  }
})()

void i18n.use(initReactI18next).init({
  resources: {
    en: { common: en },
    ar: { common: ar },
  },
  lng: storedLang,
  fallbackLng: 'en',
  ns: ['common'],
  defaultNS: 'common',
  interpolation: { escapeValue: false },
})

i18n.on('languageChanged', (lng) => {
  try {
    localStorage.setItem('lang', lng)
  } catch {}
})

export default i18n
