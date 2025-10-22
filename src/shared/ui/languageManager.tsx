import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export function LanguageManager() {
  const { i18n } = useTranslation()

  useEffect(() => {
    const updateDocumentLanguage = () => {
      document.documentElement.lang = i18n.language
      document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr'
    }

    updateDocumentLanguage()
    i18n.on('languageChanged', updateDocumentLanguage)

    return () => {
      i18n.off('languageChanged', updateDocumentLanguage)
    }
  }, [i18n])

  return null
}
