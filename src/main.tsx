import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { LanguageProvider } from './context/LanguageContext.tsx'
import { AuthorizationProvider } from './context/AuthorizationContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthorizationProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </AuthorizationProvider>
  </StrictMode>,
)
