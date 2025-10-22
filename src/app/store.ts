import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ApplicationData, defaultApplicationData } from '@entities/application/model/application.types'

type WizardState = {
  currentStep: number
  totalSteps: number
  application: ApplicationData
}

const loadState = (): WizardState => {
  try {
    const raw = localStorage.getItem('wizardState')
    if (raw) return JSON.parse(raw) as WizardState
  } catch {}
  return { currentStep: 1, totalSteps: 3, application: defaultApplicationData }
}

const initialState: WizardState = loadState()

const wizardSlice = createSlice({
  name: 'wizard',
  initialState,
  reducers: {
    goNext(state) {
      state.currentStep = Math.min(state.totalSteps, state.currentStep + 1)
    },
    goBack(state) {
      state.currentStep = Math.max(1, state.currentStep - 1)
    },
    setPersonalInfo(state, action: PayloadAction<ApplicationData['personalInfo']>) {
      state.application.personalInfo = action.payload
    },
    setFamilyFinancialInfo(state, action: PayloadAction<ApplicationData['familyFinancialInfo']>) {
      state.application.familyFinancialInfo = action.payload
    },
    setSituationDescriptions(state, action: PayloadAction<ApplicationData['situationDescriptions']>) {
      state.application.situationDescriptions = action.payload
    },
    resetApplication(state) {
      state.currentStep = 1
      state.application = defaultApplicationData
    },
  },
})

export const { goNext, goBack, setPersonalInfo, setFamilyFinancialInfo, setSituationDescriptions, resetApplication } = wizardSlice.actions

export const store = configureStore({
  reducer: { wizard: wizardSlice.reducer },
})

store.subscribe(() => {
  try {
    const state = store.getState().wizard as WizardState
    localStorage.setItem('wizardState', JSON.stringify(state))
  } catch {}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
