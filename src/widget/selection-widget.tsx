import { PanelProvider } from '@/context/panel-context'
import { SelectionProvider } from '@/context/selection-context'
import { ToastProvider } from '@/context/toast-context'

import { WidgetContent } from './widget-content'

import type { Item } from '@/shared/types'

type SelectionWidgetProps = {
  items: Item[]
}

export const SelectionWidget = ({ items }: SelectionWidgetProps) => {
  return (
    <SelectionProvider>
      <PanelProvider>
        <ToastProvider>
          <WidgetContent items={items} />
        </ToastProvider>
      </PanelProvider>
    </SelectionProvider>
  )
}
