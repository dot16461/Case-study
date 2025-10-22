export interface PersonalInfo {
  name: string
  nationalId: string
  dateOfBirth: string
  gender: string
  address: string
  city: string
  state: string
  country: string
  phone: string
  email: string
}

export interface FamilyFinancialInfo {
  maritalStatus: string
  dependents: number
  employmentStatus: string
  monthlyIncome: number
  housingStatus: string
}

export interface SituationDescriptions {
  currentFinancialSituation: string
  employmentCircumstances: string
  reasonForApplying: string
}

export interface ApplicationData {
  personalInfo: PersonalInfo
  familyFinancialInfo: FamilyFinancialInfo
  situationDescriptions: SituationDescriptions
}

export const defaultApplicationData: ApplicationData = {
  personalInfo: {
    name: '',
    nationalId: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    country: '',
    phone: '',
    email: '',
  },
  familyFinancialInfo: {
    maritalStatus: '',
    dependents: 0,
    employmentStatus: '',
    monthlyIncome: 0,
    housingStatus: '',
  },
  situationDescriptions: {
    currentFinancialSituation: '',
    employmentCircumstances: '',
    reasonForApplying: '',
  },
}


