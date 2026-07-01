import { type ReactNode, useState } from 'react'

import { PanelContext } from './panel-context'

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
