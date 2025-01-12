import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import GoogleAuth from './components/GoogleAuth'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleAuth />
  </StrictMode>,
)