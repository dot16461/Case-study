import { ReactNode, useEffect, useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { BrowserRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import i18n from '@shared/lib/i18n'
import { Provider } from 'react-redux'
import { store } from './store'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import { prefixer } from 'stylis'
import rtlPlugin from '@mui/stylis-plugin-rtl'

type Props = { children: ReactNode }

const makeTheme = (direction: 'ltr' | 'rtl') =>
  createTheme({
    direction,
  })

// Create RTL cache
const rtlCache = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
})

// Create LTR cache
const ltrCache = createCache({
  key: 'muiltr',
  stylisPlugins: [prefixer],
})

export function AppProviders({ children }: Props) {
  const [theme, setTheme] = useState(makeTheme(i18n.dir() as 'ltr' | 'rtl'))
  const [cache, setCache] = useState(i18n.dir() === 'rtl' ? rtlCache : ltrCache)

  useEffect(() => {
    const applyLang = () => {
      const dir = i18n.dir() as 'ltr' | 'rtl'
      document.documentElement.setAttribute('dir', dir)
      document.documentElement.lang = i18n.language
      setTheme(makeTheme(dir))
      setCache(dir === 'rtl' ? rtlCache : ltrCache)
    }
    applyLang()
    i18n.on('languageChanged', applyLang)
    return () => {
      i18n.off('languageChanged', applyLang)
    }
  }, [])

  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <CacheProvider value={cache}>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              {children}
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={i18n.dir() === 'rtl'}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
            </BrowserRouter>
          </ThemeProvider>
        </CacheProvider>
      </Provider>
    </I18nextProvider>
  )
}


