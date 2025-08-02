import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Homepage from './components/Homepage'
import './tailwindstuff.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Homepage />
  </StrictMode>,
)
