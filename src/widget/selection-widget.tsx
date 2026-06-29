import { SelectionProvider } from '@/context/selection-context'

import { WidgetContent } from './widget-content'

import type { Item } from '@/types'

type SelectionWidgetProps = {
  items: Item[]
}

export const SelectionWidget = ({ items }: SelectionWidgetProps) => {
  return (
    <SelectionProvider>
      <WidgetContent items={items} />
    </SelectionProvider>
  )
}
