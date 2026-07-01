import { createContext, useContext } from 'react'

export type PanelContextValue = {
  isOpen: boolean
  open: () => void
  close: () => void
}

export const PanelContext = createContext<PanelContextValue | null>(null)

export const usePanel = () => {
  const ctx = useContext(PanelContext)
  if (!ctx) throw new Error('usePanel must be used within PanelProvider')
  return ctx
}
