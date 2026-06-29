import { useMemo } from 'react'

import { ITEM_COUNT } from '@/config'
import { SelectionWidget } from '@/widget/selection-widget'
import { Paper } from '@mui/material'

import type { Item } from '@/types'

const App = () => {
  const items: Item[] = useMemo(
    () =>
      Array.from({ length: ITEM_COUNT }, (_, i) => ({
        id: i + 1,
        label: `Element ${i + 1}`,
      })),
    [],
  )

  return (
    <Paper>
      <SelectionWidget items={items} />
    </Paper>
  )
}

export default App
