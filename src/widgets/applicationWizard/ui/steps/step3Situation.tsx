import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createSituationDescriptionsSchema } from '../../lib/validationSchemas'
import { FormTextarea } from '@shared/ui/formTextarea'
import { useState } from 'react'
import { HelpMeWriteButton } from '@features/helpMeWrite/ui/helpMeWriteButton'
import { AiSuggestionDialog } from '../aiSuggestionDialog'
import { useTranslation } from 'react-i18next'
import { SituationDescriptions } from '@entities/application/model/application.types'

type Props = {
  defaultValues: SituationDescriptions
  onValid: (values: SituationDescriptions) => void
  onGeneratingChange?: (isGenerating: boolean) => void
}

export function Step3Situation({ defaultValues, onValid, onGeneratingChange }: Props) {
  const { t } = useTranslation()
  const schema = createSituationDescriptionsSchema(t)
  const { control, handleSubmit, setValue } = useForm<SituationDescriptions>({
    defaultValues,
    resolver: zodResolver(schema),
    mode: 'onBlur',
  })
  const [dialogOpen, setDialogOpen] = useState(false)
  const [draft, setDraft] = useState('')
  const [target, setTarget] = useState<keyof SituationDescriptions>('currentFinancialSituation')
  const [isGenerating, setIsGenerating] = useState(false)

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <HelpMeWriteButton
        label={t('helpMeWrite')}
        placeholder={t('prompts.currentFinancial')}
        onStartGenerating={(isGenerating) => {
          setIsGenerating(isGenerating);
          onGeneratingChange?.(isGenerating);
        }}
        onResult={(text) => { 
          setDraft(text); 
          setTarget('currentFinancialSituation'); 
          setIsGenerating(false);
          onGeneratingChange?.(false);
          setDialogOpen(true) 
        }}
        disabled={isGenerating}
      />
      <FormTextarea control={control} name="currentFinancialSituation" label={t('fields.currentFinancialSituation')} />

      <HelpMeWriteButton
        label={t('helpMeWrite')}
        placeholder={t('prompts.employment')}
        onStartGenerating={(isGenerating) => {
          setIsGenerating(isGenerating);
          onGeneratingChange?.(isGenerating);
        }}
        onResult={(text) => { 
          setDraft(text); 
          setTarget('employmentCircumstances'); 
          setIsGenerating(false);
          onGeneratingChange?.(false);
          setDialogOpen(true) 
        }}
        disabled={isGenerating}
      />
      <FormTextarea control={control} name="employmentCircumstances" label={t('fields.employmentCircumstances')} />

      <HelpMeWriteButton
        label={t('helpMeWrite')}
        placeholder={t('prompts.reason')}
        onStartGenerating={(isGenerating) => {
          setIsGenerating(isGenerating);
          onGeneratingChange?.(isGenerating);
        }}
        onResult={(text) => { 
          setDraft(text); 
          setTarget('reasonForApplying'); 
          setIsGenerating(false);
          onGeneratingChange?.(false);
          setDialogOpen(true) 
        }}
        disabled={isGenerating}
      />
      <FormTextarea control={control} name="reasonForApplying" label={t('fields.reasonForApplying')} />

      <AiSuggestionDialog
        open={dialogOpen}
        initialText={draft}
        loading={isGenerating}
        onClose={() => {
          setDialogOpen(false);
          if (isGenerating) {
            setIsGenerating(false);
            onGeneratingChange?.(false);
          }
        }}
        onAccept={(text) => {
          setValue(target, text, { shouldValidate: true })
          setDialogOpen(false)
        }}
      />
    </form>
  )
}


