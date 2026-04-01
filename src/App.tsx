import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { FinanceProvider } from './context/FinanceProvider'
import { HomePage } from './pages/HomePage'
import { DashboardPage } from './pages/DashboardPage'

const routerBasename =
  import.meta.env.BASE_URL === '/' ? undefined : import.meta.env.BASE_URL.replace(/\/$/, '')

export default function App() {
  return (
    <FinanceProvider>
      <BrowserRouter basename={routerBasename}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </FinanceProvider>
  )
}
