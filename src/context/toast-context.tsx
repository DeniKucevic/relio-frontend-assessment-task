import { type ReactNode, createContext, useContext, useState } from 'react'

import { Alert, type AlertColor, Snackbar } from '@mui/material'

type Toast = {
  message: string
  severity: AlertColor
}

type ToastContextValue = {
  showToast: (message: string, severity?: Toast['severity']) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<Toast | null>(null)

  const showToast = (
    message: string,
    severity: Toast['severity'] = 'success',
  ) => {
    setToast({ message, severity })
  }

  const handleClose = () => setToast(null)

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Snackbar open={!!toast} autoHideDuration={3000} onClose={handleClose}>
        <Alert severity={toast?.severity} onClose={handleClose}>
          {toast?.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
