import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Alert, CircularProgress, Box, Button, Typography, Divider } from "@mui/material";
import { RootState, resetApplication } from "@app/store";
import { submitApplication } from "@shared/api/mockApi";
import { ApplicationData } from "@entities/application/model/application.types";

type Props = {
  onSuccess: () => void;
  onBack?: () => void;
};

export function ApplicationSubmission({ onSuccess, onBack }: Props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const application = useSelector((s: RootState) => s.wizard.application);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const result = await submitApplication(application as ApplicationData, t);
      setSubmitResult(result);

      if (result.success) {
        setTimeout(() => {
          dispatch(resetApplication());
          setSubmitResult(null);
          onSuccess();
        }, 3000);
      }
    } catch (error) {
      setSubmitResult({
        success: false,
        message: t("unexpectedError"),
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  if (submitResult) {
    return (
      <Box mt={3}>
        <Alert
          severity={submitResult.success ? "success" : "error"}
          sx={{ mb: 2 }}
        >
          {submitResult.message}
        </Alert>
        {submitResult.success && (
          <Alert severity="info">{t("redirectingMessage")}</Alert>
        )}
      </Box>
    );
  }

  if (isSubmitting) {
    return (
      <Box display="flex" justifyContent="center" mt={2}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box mt={3}>
      <Typography variant="h6" gutterBottom>
        {t("reviewApplication")}
      </Typography>
      
      <Box mb={3}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          {t("personalInformation")}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t("fields.name")}: {application.personalInfo?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t("fields.nationalId")}: {application.personalInfo?.nationalId}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t("fields.dateOfBirth")}: {application.personalInfo?.dateOfBirth}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t("fields.gender")}: {application.personalInfo?.gender}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t("fields.address")}: {application.personalInfo?.address}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t("fields.city")}: {application.personalInfo?.city}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t("fields.state")}: {application.personalInfo?.state}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t("fields.country")}: {application.personalInfo?.country}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t("fields.phone")}: {application.personalInfo?.phone}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t("fields.email")}: {application.personalInfo?.email}
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box mb={3}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          {t("familyFinancialInfo")}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t("fields.maritalStatus")}: {application.familyFinancialInfo?.maritalStatus}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t("fields.dependents")}: {application.familyFinancialInfo?.dependents}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t("fields.employmentStatus")}: {application.familyFinancialInfo?.employmentStatus}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t("fields.monthlyIncome")}: {application.familyFinancialInfo?.monthlyIncome}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t("fields.housingStatus")}: {application.familyFinancialInfo?.housingStatus}
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box mb={3}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          {t("situationDescriptions")}
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" fontWeight="bold" gutterBottom>
            {t("fields.currentFinancialSituation")}:
          </Typography>
          <Box 
            sx={{ 
              p: 2, 
              bgcolor: 'grey.50', 
              borderRadius: 1, 
              border: '1px solid',
              borderColor: 'grey.200',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word'
            }}
          >
            <Typography variant="body2" color="text.primary">
              {application.situationDescriptions?.currentFinancialSituation || t("noDescription")}
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" fontWeight="bold" gutterBottom>
            {t("fields.employmentCircumstances")}:
          </Typography>
          <Box 
            sx={{ 
              p: 2, 
              bgcolor: 'grey.50', 
              borderRadius: 1, 
              border: '1px solid',
              borderColor: 'grey.200',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word'
            }}
          >
            <Typography variant="body2" color="text.primary">
              {application.situationDescriptions?.employmentCircumstances || t("noDescription")}
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" fontWeight="bold" gutterBottom>
            {t("fields.reasonForApplying")}:
          </Typography>
          <Box 
            sx={{ 
              p: 2, 
              bgcolor: 'grey.50', 
              borderRadius: 1, 
              border: '1px solid',
              borderColor: 'grey.200',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word'
            }}
          >
            <Typography variant="body2" color="text.primary">
              {application.situationDescriptions?.reasonForApplying || t("noDescription")}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box display="flex" gap={2}>
        <Button 
          variant="outlined"
          onClick={onBack}
          disabled={isSubmitting}
          fullWidth
          size="large"
        >
          {t("back")}
        </Button>
        <Button 
          variant="contained" 
          onClick={handleSubmit}
          disabled={isSubmitting}
          fullWidth
          size="large"
        >
          {t("submit")}
        </Button>
      </Box>
    </Box>
  );
}

export function useApplicationSubmission() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitApplicationData = async (
    application: ApplicationData,
    t: (key: string) => string
  ) => {
    setIsSubmitting(true);
    try {
      const result = await submitApplication(application, t);
      return result;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, submitApplication: submitApplicationData };
}
