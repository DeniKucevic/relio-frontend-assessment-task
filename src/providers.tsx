import type { ReactNode } from 'react'

import { PanelProvider } from '@/context/panel-provider'
import { SelectionProvider } from '@/context/selection-provider'
import { ToastProvider } from '@/context/toast-provider'

export const Providers = ({ children }: { children: ReactNode }) => (
  <SelectionProvider>
    <PanelProvider>
      <ToastProvider>{children}</ToastProvider>
    </PanelProvider>
  </SelectionProvider>
)
