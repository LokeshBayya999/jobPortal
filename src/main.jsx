import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { SavedJobsProvider } from './context/SavedJobsContext.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <SavedJobsProvider>
        <App />
      </SavedJobsProvider>
    </BrowserRouter>
  </StrictMode>,
)
