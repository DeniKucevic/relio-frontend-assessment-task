import { Providers } from '@/providers'

import { WidgetContent } from './widget-content'

import type { Item } from '@/shared/types'

type SelectionWidgetProps = {
  items: Item[]
}

export const SelectionWidget = ({ items }: SelectionWidgetProps) => {
  return (
    <Providers>
      <WidgetContent items={items} />
    </Providers>
  )
}
