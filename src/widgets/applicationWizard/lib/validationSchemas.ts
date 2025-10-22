import { z } from 'zod'

import { z } from 'zod'
import { PersonalInfo, FamilyFinancialInfo, SituationDescriptions } from '@entities/application/model/application.types'

export const createPersonalInfoSchema = (t: (key: string, options?: any) => string): z.ZodType<PersonalInfo> => z.object({
  name: z.string().min(2, t('errors.minLength', { min: 2 })),
  nationalId: z.string().min(4, t('errors.minLength', { min: 4 })),
  dateOfBirth: z.string().min(4, t('errors.minLength', { min: 4 })),
  gender: z.string().min(1, t('errors.required')),
  address: z.string().min(2, t('errors.minLength', { min: 2 })),
  city: z.string().min(2, t('errors.minLength', { min: 2 })),
  state: z.string().min(2, t('errors.minLength', { min: 2 })),
  country: z.string().min(2, t('errors.minLength', { min: 2 })),
  phone: z.string().min(6, t('errors.minLength', { min: 6 })),
  email: z.string().email(t('errors.email')),
})

export const createFamilyFinancialSchema = (t: (key: string, options?: any) => string): z.ZodType<FamilyFinancialInfo> => z.object({
  maritalStatus: z.string().min(1, t('errors.required')),
  dependents: z.coerce.number().int().min(0, t('errors.number')),
  employmentStatus: z.string().min(1, t('errors.required')),
  monthlyIncome: z.coerce.number().min(0, t('errors.number')),
  housingStatus: z.string().min(1, t('errors.required')),
})

export const createSituationDescriptionsSchema = (t: (key: string, options?: any) => string): z.ZodType<SituationDescriptions> => z.object({
  currentFinancialSituation: z.string().min(20, t('errors.minLength', { min: 20 })),
  employmentCircumstances: z.string().min(20, t('errors.minLength', { min: 20 })),
  reasonForApplying: z.string().min(20, t('errors.minLength', { min: 20 })),
})

// Fallback schemas for backward compatibility
export const personalInfoSchema = z.object({
  name: z.string().min(2),
  nationalId: z.string().min(4),
  dateOfBirth: z.string().min(4),
  gender: z.string().min(1),
  address: z.string().min(2),
  city: z.string().min(2),
  state: z.string().min(2),
  country: z.string().min(2),
  phone: z.string().min(6),
  email: z.string().email(),
})

export const familyFinancialSchema = z.object({
  maritalStatus: z.string().min(1),
  dependents: z.coerce.number().int().min(0),
  employmentStatus: z.string().min(1),
  monthlyIncome: z.coerce.number().min(0),
  housingStatus: z.string().min(1),
})

export const situationDescriptionsSchema = z.object({
  currentFinancialSituation: z.string().min(20),
  employmentCircumstances: z.string().min(20),
  reasonForApplying: z.string().min(20),
})


