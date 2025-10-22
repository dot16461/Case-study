import { Box, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export function SuccessPage() {
  const { t } = useTranslation()
  return (
    <Box py={6} textAlign="center">
      <Typography variant="h4" gutterBottom>
        {t('submitted')}
      </Typography>
      <Button component={Link} to="/apply" variant="contained">
        {t('backToForm')}
      </Button>
    </Box>
  )
}


