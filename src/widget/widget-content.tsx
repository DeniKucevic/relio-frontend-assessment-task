import { useCallback } from 'react'

import { TagList } from '@/components/tag-list'
import { usePanel } from '@/context/panel-context'
import {
  actions,
  useSelectionDispatch,
  useSelectionState,
} from '@/context/selection-context'
import { useToast } from '@/context/toast-context'
import { STRINGS } from '@/shared/strings'
import { Button, Card, Typography } from '@mui/material'

import { SelectionPanel } from './selection-panel'

import type { Item } from '@/shared/types'

type WidgetContentProps = {
  items: Item[]
}

export const WidgetContent = ({ items }: WidgetContentProps) => {
  const state = useSelectionState()
  const dispatch = useSelectionDispatch()
  const panel = usePanel()
  const { showToast } = useToast()

  const handleTagRemove = useCallback(
    (id: number) => {
      dispatch(actions.removeCommitted(id))
      showToast(STRINGS.toast.itemRemoved, 'info')
    },
    [dispatch, showToast],
  )

  const handleTogglePanel = useCallback(() => {
    panel.toggle()
  }, [panel])

  return (
    <Card variant="outlined" sx={{ p: 2, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        {STRINGS.widget.title}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {STRINGS.widget.selectedCount(state.committed.length)}
      </Typography>
      {state.committed.length > 0 ? (
        <TagList items={state.committed} onRemove={handleTagRemove} />
      ) : (
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {STRINGS.widget.noItemsSelected}
        </Typography>
      )}
      <Button variant="contained" color="primary" onClick={handleTogglePanel}>
        {STRINGS.widget.changeChoice}
      </Button>
      {panel.isOpen ? <SelectionPanel items={items} /> : null}
    </Card>
  )
}
