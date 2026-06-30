import { StrictMode } from 'react'

import App from '@/App.tsx'
import { theme } from '@/theme.ts'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { createRoot } from 'react-dom/client'

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
)
