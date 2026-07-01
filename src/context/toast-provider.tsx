import { type ReactNode, useCallback, useMemo, useState } from 'react'

import { Alert, Snackbar } from '@mui/material'

import { type Toast, ToastContext } from './toast-context'

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<Toast | null>(null)

  const showToast = useCallback(
    (message: string, severity: Toast['severity'] = 'success') => {
      setToast({ message, severity })
    },
    [],
  )

  const handleClose = useCallback(() => setToast(null), [])

  const value = useMemo(() => ({ showToast }), [showToast])

  return (
    <ToastContext.Provider value={value}>
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
