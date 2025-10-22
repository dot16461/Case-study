import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Box } from '@mui/material'
import { RootState, goBack as goBackAction, goNext as goNextAction, setFamilyFinancialInfo, setPersonalInfo, setSituationDescriptions } from '@app/store'
import { Step1PersonalInfo } from './steps/step1PersonalInfo'
import { Step2FamilyFinancial } from './steps/step2FamilyFinancial'
import { Step3Situation } from './steps/step3Situation'
import { ScreenReaderAnnouncement } from '@shared/ui/screenReaderAnnouncement'
import { useFocusManagement } from '@shared/hooks/useFocusManagement'

type Props = {
  onSubmit: () => void
  onGeneratingChange?: (isGenerating: boolean) => void
}

export function WizardStepManager({ onSubmit, onGeneratingChange }: Props) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const currentStep = useSelector((s: RootState) => s.wizard.currentStep)
  const totalSteps = useSelector((s: RootState) => s.wizard.totalSteps)
  const application = useSelector((s: RootState) => s.wizard.application)
  
  const { stepRef, focusFirstElement } = useFocusManagement()
  
  const stepLabels = [
    t('steps.personalInfo'),
    t('steps.familyFinancial'),
    t('steps.situation'),
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      focusFirstElement()
    }, 100)
    
    return () => clearTimeout(timer)
  }, [currentStep, focusFirstElement])

  const getStepAnnouncement = () => {
    const stepLabel = stepLabels[currentStep - 1] || t('step', { n: currentStep })
    return `${t('step', { n: currentStep })}: ${stepLabel}`
  }

  return (
    <>
      <ScreenReaderAnnouncement message={getStepAnnouncement()} />
      <Box mt={3} ref={stepRef}>
        {currentStep === 1 && (
          <Step1PersonalInfo
            defaultValues={application.personalInfo}
            onValid={(v) => {
              dispatch(setPersonalInfo(v))
              dispatch(goNextAction())
            }}
          />
        )}
        {currentStep === 2 && (
          <Step2FamilyFinancial
            defaultValues={application.familyFinancialInfo}
            onValid={(v) => {
              dispatch(setFamilyFinancialInfo(v))
              dispatch(goNextAction())
            }}
          />
        )}
        {currentStep === 3 && (
          <Step3Situation
            defaultValues={application.situationDescriptions}
            onValid={(v) => {
              dispatch(setSituationDescriptions(v))
              onSubmit()
            }}
            onGeneratingChange={onGeneratingChange}
          />
        )}
      </Box>
    </>
  )
}
