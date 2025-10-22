import { CssBaseline, Container, Box } from '@mui/material'
import { AppProviders } from './appProviders'
import { AppRouter } from './appRouter'
import { LanguageSwitcher } from '@shared/ui/languageSwitcher'

export function App() {
  return (
    <AppProviders>
      <CssBaseline />
      <Container maxWidth="md">
        <Box component="nav" display="flex" justifyContent="flex-end" mt={2} mb={1} aria-label="Language selection">
          <LanguageSwitcher label="Language" />
        </Box>
        <AppRouter />
      </Container>
    </AppProviders>
  )
}


