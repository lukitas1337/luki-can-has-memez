import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import { ThemeProvider } from './context/ThemeContext';
import { MemeProvider } from './context/MemeContext';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
    <MemeProvider>
      <App />
    </MemeProvider>
    </ThemeProvider>
  </StrictMode>,
)
