import { useCallback } from 'react'

import { TagList } from '@/components/tag-list'
import {
    actions,
    useSelectionDispatch,
    useSelectionState,
} from '@/context/selection-context'
import { Box, Button, Typography } from '@mui/material'

import { SelectionPanel } from './selection-panel'

import type { Item } from '@/types'

type WidgetContentProps = {
  items: Item[]
}

export const WidgetContent = ({ items }: WidgetContentProps) => {
  const state = useSelectionState()
  const dispatch = useSelectionDispatch()

  const handleTagRemove = useCallback(
    (id: number) => {
      dispatch(actions.removeCommitted(id))
    },
    [dispatch],
  )

  const handleOpenPanel = useCallback(() => {
    dispatch(actions.openPanel())
  }, [dispatch])

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Select items
      </Typography>
      <Typography variant="body1" gutterBottom>
        You currently have {state.committed.length} items selected.
      </Typography>
      <TagList items={state.committed} onRemove={handleTagRemove} />
      <Button variant="contained" color="primary" onClick={handleOpenPanel}>
        Change my choice
      </Button>
      {state.isPanelOpen ? <SelectionPanel items={items} /> : null}
    </Box>
  )
}
