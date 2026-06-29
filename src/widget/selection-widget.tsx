import { SelectionProvider } from '@/context/selection-context'

import { WidgetContent } from './widget-content'

type SelectionWidgetProps = {}

export const SelectionWidget = ({}: SelectionWidgetProps) => {
  return (
    <SelectionProvider>
      <WidgetContent />
    </SelectionProvider>
  )
}
