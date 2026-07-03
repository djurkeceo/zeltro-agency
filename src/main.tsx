import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { LazyMotion, domAnimation } from 'framer-motion'
import './index.css'
import App from './App.tsx'

export const AdminPanel = lazy(() => import('./components/AdminPanel.tsx'))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage.tsx'))
const SpeedInsights = lazy(() => 
  import('@vercel/speed-insights/react').then(m => ({ default: m.SpeedInsights }))
)

const normalizedPath = window.location.pathname.replace(/\/+$/, '') || '/'
const isAdminRoute = normalizedPath === '/admin'
const isProjectsRoute = normalizedPath === '/projects'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isAdminRoute ? (
      <LazyMotion features={domAnimation} strict>
        <Suspense fallback={<div className="app-loading">Učitavanje...</div>}>
          <AdminPanel />
        </Suspense>
      </LazyMotion>
    ) : isProjectsRoute ? (
      <LazyMotion features={domAnimation} strict>
        <Suspense fallback={<div className="app-loading">Učitavanje...</div>}>
          <ProjectsPage />
        </Suspense>
      </LazyMotion>
    ) : (
      <App />
    )}
    <Suspense fallback={null}>
      <SpeedInsights />
    </Suspense>
  </StrictMode>,
)
