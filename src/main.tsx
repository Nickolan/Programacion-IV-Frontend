import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { ParticipanteProvider } from './context/ParticipantesContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ParticipanteProvider>
      <App />
    </ParticipanteProvider>
  </StrictMode>,
)
