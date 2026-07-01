import { STRINGS } from '@/shared/strings'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

type ConfirmDialogProps = {
  open: boolean
  message: string
  onConfirm: () => void
  onCancel: () => void
}

export const ConfirmDialog = ({
  open,
  message,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => (
  <Dialog open={open} onClose={onCancel}>
    <DialogTitle>{STRINGS.confirm.title}</DialogTitle>
    <DialogContent>
      <DialogContentText>{message}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel}>{STRINGS.confirm.cancelLabel}</Button>
      <Button onClick={onConfirm} color="error">
        {STRINGS.confirm.confirmLabel}
      </Button>
    </DialogActions>
  </Dialog>
)
