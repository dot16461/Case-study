import { MenuItem, Select, SelectChangeEvent, FormControl, InputLabel } from '@mui/material'
import i18n from 'i18next'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  label?: string
}

export function LanguageSwitcher({ label }: Props) {
  const { t } = useTranslation()
  const [language, setLanguage] = useState(i18n.language || 'en')

  useEffect(() => {
    const onChange = (lng: string) => setLanguage(lng)
    i18n.on('languageChanged', onChange)
    return () => {
      i18n.off('languageChanged', onChange)
    }
  }, [])

  const handleChange = (event: SelectChangeEvent<string>) => {
    const lng = event.target.value
    setLanguage(lng)
    void i18n.changeLanguage(lng)
  }

  return (
    <FormControl size="small" sx={{ minWidth: 140 }}>
      <InputLabel id="lang-select-label">{label ?? t('language')}</InputLabel>
      <Select labelId="lang-select-label" value={language} label={label ?? t('language')} onChange={handleChange}>
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="ar">العربية</MenuItem>
      </Select>
    </FormControl>
  )
}


