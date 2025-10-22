import { Box, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'

type Props = {
  canBack?: boolean
  canNext?: boolean
  nextLabel?: string
  onBack?: () => void
  onNext?: () => void
}

export function StepNavigation({ canBack = true, canNext = true, nextLabel = 'Next', onBack, onNext }: Props) {
  const { t } = useTranslation()
  return (
    <Box display="flex" justifyContent="space-between">
      <Button disabled={!canBack} variant="outlined" onClick={onBack}>
        {t('back')}
      </Button>
      <Button disabled={!canNext} variant="contained" onClick={onNext}>
        {nextLabel}
      </Button>
    </Box>
  )
}


