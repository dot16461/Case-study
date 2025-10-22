import { ApplicationData } from '@entities/application/model/application.types'

export async function submitApplication(data: ApplicationData, t: (key: string) => string): Promise<{ success: boolean; message: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Submitting application:', data)
      
      const success = Math.random() > 0.1
      
      if (success) {
        resolve({
          success: true,
          message: t('submittedSuccessfully')
        })
      } else {
        resolve({
          success: false,
          message: t('submissionFailed')
        })
      }
    }, 2000)
  })
}
