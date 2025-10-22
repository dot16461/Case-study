export const APP_CONFIG = {
  name: 'Social Support Application',
  version: '1.0.0',
  maxSteps: 3,
  supportedLanguages: ['en', 'ar'] as const,
  defaultLanguage: 'en' as const,
  localStorageKeys: {
    wizardState: 'wizardState',
    language: 'lang'
  }
} as const

export type AppConfig = typeof APP_CONFIG
