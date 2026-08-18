import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app'
import { setupInterceptors } from "./app/providers/setupInterceptors";

setupInterceptors();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

