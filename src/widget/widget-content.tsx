import { TagList } from '@/components/tag-list'
import { actions, useSelection } from '@/context/selection-context'
import { Box, Button, Typography } from '@mui/material'

import { SelectionPanel } from './selection-panel'

const mockItems = [
  { id: 1, label: 'Item 1' },
  { id: 2, label: 'Item 2' },
  { id: 3, label: 'Item 3' },
]

export const WidgetContent = () => {
  const { dispatch, state } = useSelection()

  const handleTagRemove = (id: number) => {
    dispatch(actions.removeCommitted(id))
  }

  const handleOpenPanel = () => {
    dispatch(actions.openPanel())
  }

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
      {state.isPanelOpen ? (
        <SelectionPanel
          items={mockItems}
          onSave={() => null}
          onCancel={() => null}
        />
      ) : null}
    </Box>
  )
}
