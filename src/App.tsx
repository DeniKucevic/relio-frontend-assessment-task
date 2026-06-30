import { useMemo } from 'react'

import { ITEM_COUNT } from '@/shared/config'
import { SelectionWidget } from '@/widget/selection-widget'
import { Box } from '@mui/material'

import type { Item } from '@/shared/types'

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
    <Box>
      <SelectionWidget items={items} />
    </Box>
  )
}

export default App
