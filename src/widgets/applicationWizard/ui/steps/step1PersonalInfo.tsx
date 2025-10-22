import { Grid } from '@mui/material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createPersonalInfoSchema } from '../../lib/validationSchemas'
import { FormTextField } from '@shared/ui/formTextField'
import { useTranslation } from 'react-i18next'
import { PersonalInfo } from '@entities/application/model/application.types'

type Props = {
  defaultValues: PersonalInfo
  onValid: (values: PersonalInfo) => void
}

export function Step1PersonalInfo({ defaultValues, onValid }: Props) {
  const { t } = useTranslation()
  const schema = createPersonalInfoSchema(t)
  const { control, handleSubmit } = useForm<PersonalInfo>({
    defaultValues,
    resolver: zodResolver(schema),
    mode: 'onBlur',
  })

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <FormTextField control={control} name="name" label={t('fields.name')} />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormTextField control={control} name="nationalId" label={t('fields.nationalId')} />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormTextField control={control} name="dateOfBirth" label={t('fields.dateOfBirth')} type="date" />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormTextField control={control} name="gender" label={t('fields.gender')} />
        </Grid>
        <Grid item xs={12}>
          <FormTextField control={control} name="address" label={t('fields.address')} />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormTextField control={control} name="city" label={t('fields.city')} />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormTextField control={control} name="state" label={t('fields.state')} />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormTextField control={control} name="country" label={t('fields.country')} />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormTextField control={control} name="phone" label={t('fields.phone')} />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormTextField control={control} name="email" label={t('fields.email')} />
        </Grid>
      </Grid>
    </form>
  )
}


