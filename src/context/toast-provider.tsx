import { type ReactNode, useState } from 'react'

import { Alert, Snackbar } from '@mui/material'

import { ToastContext, type Toast } from './toast-context'

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
      <Snackbar
        open={!!toast}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={toast?.severity} onClose={handleClose}>
          {toast?.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  )
}
