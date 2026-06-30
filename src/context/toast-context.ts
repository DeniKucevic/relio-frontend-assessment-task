import { createContext, useContext } from 'react'

import type { AlertColor } from '@mui/material'

export type Toast = {
  message: string
  severity: AlertColor
}

export type ToastContextValue = {
  showToast: (message: string, severity?: Toast['severity']) => void
}

export const ToastContext = createContext<ToastContextValue | null>(null)

export const useToast = () => {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
