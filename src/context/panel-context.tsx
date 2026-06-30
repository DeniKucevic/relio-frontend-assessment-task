import {
    type ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react'

type PanelContextValue = {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

const PanelContext = createContext<PanelContextValue | null>(null)

export const PanelProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  const toggle = () => setIsOpen(!isOpen)

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  return (
    <PanelContext.Provider value={{ isOpen, open, close, toggle }}>
      {children}
    </PanelContext.Provider>
  )
}

export const usePanel = () => {
  const ctx = useContext(PanelContext)
  if (!ctx) throw new Error('usePanel must be used within PanelProvider')
  return ctx
}
