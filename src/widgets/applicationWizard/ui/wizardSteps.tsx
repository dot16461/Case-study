import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ProgressBar } from "./progressBar";
import { StepNavigation } from "./stepNavigation";
import { WizardStepManager } from "./wizardStepManager";
import { ApplicationSubmission } from "./applicationSubmission";
import { useDispatch, useSelector } from "react-redux";
import { RootState, goBack as goBackAction } from "@app/store";
import { useState } from "react";
import { ScreenReaderAnnouncement } from "@shared/ui";

export default function WizardSteps() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentStep = useSelector((s: RootState) => s.wizard.currentStep);
  const totalSteps = useSelector((s: RootState) => s.wizard.totalSteps);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
  };

  const handleSuccess = () => {
    setIsSubmitting(false);
  };

  return (
    <>
      <ScreenReaderAnnouncement 
        message={isGenerating ? t("generating") : isSubmitting ? t("submitting") : ""} 
        priority="polite" 
      />
      <Box component="section" aria-label={t("progress")}>
        <ProgressBar current={currentStep} total={totalSteps} />
      </Box>
      
      {isSubmitting ? (
        <Box component="section" aria-label={t("submission")}>
          <ApplicationSubmission onSuccess={handleSuccess} onBack={() => setIsSubmitting(false)} />
        </Box>
      ) : (
        <Box component="section" aria-label={t("form")}>
          <WizardStepManager 
            onSubmit={handleSubmit} 
            onGeneratingChange={setIsGenerating}
          />
        </Box>
      )}
      
      {!isSubmitting && (
        <Box component="nav" mt={3} aria-label={t("navigation")}>
          <StepNavigation
            canBack={currentStep > 1 && !isGenerating}
            canNext={!isSubmitting && !isGenerating}
            nextLabel={t("next")}
            onBack={() => {
              if (isSubmitting) {
                setIsSubmitting(false);
              } else {
                dispatch(goBackAction());
              }
            }}
            onNext={() => {
              const form = document.querySelector("form") as HTMLFormElement | null;
              form?.requestSubmit();
            }}
          />
        </Box>
      )}
    </>
  );
}
