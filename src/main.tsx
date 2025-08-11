import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/style.css'
import App from './routes'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>,
)
