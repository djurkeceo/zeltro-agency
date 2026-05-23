import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { SpeedInsights } from '@vercel/speed-insights/react'
import './index.css'
import App from './App.tsx'

export const AdminPanel = lazy(() => import('./components/AdminPanel.tsx'))

const normalizedPath = window.location.pathname.replace(/\/+$/, '') || '/'
const isAdminRoute = normalizedPath === '/admin'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isAdminRoute ? (
      <Suspense fallback={<div className="app-loading">Učitavanje...</div>}>
        <AdminPanel />
      </Suspense>
    ) : (
      <App />
    )}
    <SpeedInsights />
  </StrictMode>,
)
