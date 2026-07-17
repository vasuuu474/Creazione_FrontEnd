import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from '@/components/ui/sonner'
import { useAuthStore } from '@/store/useAuthStore'

// Initialize auth session immediately from local token
useAuthStore.getState().initialize()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Toaster position="top-right" richColors />
  </StrictMode>,
)

