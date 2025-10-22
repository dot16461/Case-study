import { Routes, Route, Navigate } from 'react-router-dom'
import { ApplyPage } from '@pages/apply/applyPage'
import { SuccessPage } from '@pages/success/successPage'

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/apply" replace />} />
      <Route path="/apply" element={<ApplyPage />} />
      <Route path="/success" element={<SuccessPage />} />
      <Route path="*" element={<Navigate to="/apply" replace />} />
    </Routes>
  )
}


