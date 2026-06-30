import { useMemo } from 'react'

import { ITEM_COUNT } from '@/shared/config'
import { SelectionWidget } from '@/widget/selection-widget'
import { Box } from '@mui/material'

import { ErrorBoundary } from './components/error-boundary'
import { PAGE_MIN_HEIGHT, PAGE_VERTICAL_PADDING } from './shared/sizing'

import type { Item } from '@/shared/types'

export const App = () => {
  const items: Item[] = useMemo(
    () =>
      Array.from({ length: ITEM_COUNT }, (_, i) => ({
        id: i + 1,
        label: `Element ${i + 1}`,
      })),
    [],
  )

  return (
    <ErrorBoundary>
      <Box
        component="main"
        sx={{ minHeight: PAGE_MIN_HEIGHT, py: PAGE_VERTICAL_PADDING }}
      >
        <SelectionWidget items={items} />
      </Box>
    </ErrorBoundary>
  )
}
