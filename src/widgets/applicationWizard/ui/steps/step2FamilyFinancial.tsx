import { Grid2 as Grid } from '@mui/material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createFamilyFinancialSchema } from '../../lib/validationSchemas'
import { FormTextField } from '@shared/ui/formTextField'
import { FormSelect } from '@shared/ui/formSelect'
import { useTranslation } from 'react-i18next'
import { FamilyFinancialInfo } from '@entities/application/model/application.types'

type Props = {
  defaultValues: FamilyFinancialInfo
  onValid: (values: FamilyFinancialInfo) => void
}

const maritalOptions = [
  { value: 'single', label: 'options.marital.single' },
  { value: 'married', label: 'options.marital.married' },
  { value: 'divorced', label: 'options.marital.divorced' },
  { value: 'widowed', label: 'options.marital.widowed' },
]

const employmentOptions = [
  { value: 'employed', label: 'options.employment.employed' },
  { value: 'unemployed', label: 'options.employment.unemployed' },
  { value: 'student', label: 'options.employment.student' },
  { value: 'retired', label: 'options.employment.retired' },
]

const housingOptions = [
  { value: 'rent', label: 'options.housing.rent' },
  { value: 'own', label: 'options.housing.own' },
  { value: 'family', label: 'options.housing.family' },
  { value: 'other', label: 'options.housing.other' },
]

export function Step2FamilyFinancial({ defaultValues, onValid }: Props) {
  const { t } = useTranslation()
  const schema = createFamilyFinancialSchema(t)
  const { control, handleSubmit } = useForm<FamilyFinancialInfo>({
    defaultValues,
    resolver: zodResolver(schema),
    mode: 'onBlur',
  })

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <FormSelect control={control} name="maritalStatus" label={t('fields.maritalStatus')} options={maritalOptions.map(o=>({value:o.value,label:t(o.label)}))} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <FormTextField control={control} name="dependents" label={t('fields.dependents')} type="number" />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <FormSelect control={control} name="employmentStatus" label={t('fields.employmentStatus')} options={employmentOptions.map(o=>({value:o.value,label:t(o.label)}))} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <FormTextField control={control} name="monthlyIncome" label={t('fields.monthlyIncome')} type="number" />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <FormSelect control={control} name="housingStatus" label={t('fields.housingStatus')} options={housingOptions.map(o=>({value:o.value,label:t(o.label)}))} />
        </Grid>
      </Grid>
    </form>
  )
}


