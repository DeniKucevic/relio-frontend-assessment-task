import type { ReactNode } from 'react'

import { PanelProvider } from '@/context/panel-context'
import { SelectionProvider } from '@/context/selection-context'
import { ToastProvider } from '@/context/toast-context'

export const Providers = ({ children }: { children: ReactNode }) => (
  <SelectionProvider>
    <PanelProvider>
      <ToastProvider>{children}</ToastProvider>
    </PanelProvider>
  </SelectionProvider>
)
