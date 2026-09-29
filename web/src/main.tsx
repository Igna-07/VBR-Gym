import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import App from './App.tsx'
import { PortalPage } from './pages/PortalPage.tsx'

// El portal del socio es público (se entra con el enlace personal); el resto requiere sesión de administrador.
const portalToken = window.location.pathname.match(/^\/portal\/([\w-]+)\/?$/)?.[1]

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {portalToken ? <PortalPage token={portalToken} /> : <App />}
  </StrictMode>,
)
