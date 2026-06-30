import { type ReactNode, createContext, useContext, useState } from 'react'

type PanelContextValue = {
  isOpen: boolean
  open: () => void
  close: () => void
}

const PanelContext = createContext<PanelContextValue | null>(null)

export const PanelProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  return (
    <PanelContext.Provider value={{ isOpen, open, close }}>
      {children}
    </PanelContext.Provider>
  )
}

export const usePanel = () => {
  const ctx = useContext(PanelContext)
  if (!ctx) throw new Error('usePanel must be used within PanelProvider')
  return ctx
}
