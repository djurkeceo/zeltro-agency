import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SpeedInsights } from '@vercel/speed-insights/react'
import './index.css'
import App from './App.tsx'
import AdminPanel from './components/AdminPanel.tsx'

const normalizedPath = window.location.pathname.replace(/\/+$/, '') || '/'
const isAdminRoute = normalizedPath === '/admin'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isAdminRoute ? <AdminPanel /> : <App />}
    <SpeedInsights />
  </StrictMode>,
)
