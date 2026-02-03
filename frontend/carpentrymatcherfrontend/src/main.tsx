import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { PromptPage } from './pages'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PromptPage />
  </StrictMode>,
)
