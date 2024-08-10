import './Styles/Style.scss'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterConfig } from './Router/RouterConfig'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterConfig />
  </StrictMode>,
)
