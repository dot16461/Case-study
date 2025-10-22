import { Box, Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import WizardSteps from "./wizardSteps";

export function WizardLayout() {
  const { t } = useTranslation();
  return (
    <Box component="main" id="main-content" my={{ xs: 2, md: 4 }}>
        <Typography variant="h5" gutterBottom component="h1">
          {t('appTitle')}
        </Typography>
        <Paper elevation={1} role="region" aria-label={t('applicationForm')}>
          <Box p={{ xs: 2, md: 3 }}>
            <WizardSteps />
          </Box>
        </Paper>
      </Box>
  );
}
