import { Box, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'

type Props = { current: number; total: number }

export function ProgressBar({ current, total }: Props) {
  const { t } = useTranslation()
  const labels = [
    t('steps.personalInfo'),
    t('steps.familyFinancial'),
    t('steps.situation'),
  ]

  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
  const isMedium = useMediaQuery('(max-width: 800px)')

  return (
    <Box 
      role="progressbar" 
      aria-label={`${t('step', { n: current })} ${labels[current - 1] ?? t('step', { n: current })}`}
      aria-valuenow={current}
      aria-valuemin={1}
      aria-valuemax={total}
      aria-current="step"
      display="flex" 
      alignItems="center" 
      width="100%"
    >
      {Array.from({ length: total }, (_, i) => i + 1).map((n, idx) => (
        <Box key={n} display="flex" alignItems="center" flexGrow={idx < total - 1 ? 1 : 0} minWidth={0}>
          <Box display="flex" alignItems="center" gap={1}>
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: n === current ? 'primary.light' : 'grey.300',
                color: n === current ? 'primary.contrastText' : 'text.primary',
                fontWeight: 700,
                flex: '0 0 auto',
              }}
              aria-label={n === current ? `${t('step', { n })} ${labels[n - 1] ?? t('step', { n })} - ${t('current')}` : `${t('step', { n })} ${labels[n - 1] ?? t('step', { n })}`}
            >
              {n}
            </Box>
            {!isMedium && (
              <Typography variant="body1" sx={{ fontWeight: n === current ? 700 : 400, whiteSpace: 'nowrap' }}>
                {labels[n - 1] ?? t('step', { n })}
              </Typography>
            )}
          </Box>
          {idx < total - 1 && (
            <Box 
              sx={{ mx: isSmall ? 1 : isMedium ? 1.5 : 2, height: 2, bgcolor: 'divider', flexGrow: 1 }} 
              aria-hidden="true"
            />
          )}
        </Box>
      ))}
    </Box>
  )
}


