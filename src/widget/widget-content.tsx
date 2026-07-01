import { useEffect, useRef } from 'react'

import { TagList } from '@/components/tag-list'
import { usePanel } from '@/context/panel-context'
import {
  actions,
  useSelectionDispatch,
  useSelectionState,
} from '@/context/selection-context'
import { useToast } from '@/context/toast-context'
import { WIDGET_MAX_WIDTH } from '@/shared/sizing'
import { STRINGS } from '@/shared/strings'
import { Box, Button, Card, Fade, Stack, Typography } from '@mui/material'

import { SelectionPanel } from './selection-panel'

import type { Item } from '@/shared/types'

type WidgetContentProps = {
  items: Item[]
}

export const WidgetContent = ({ items }: WidgetContentProps) => {
  const triggerRef = useRef<HTMLButtonElement>(null)
  const wasOpen = useRef(false)

  const state = useSelectionState()
  const dispatch = useSelectionDispatch()
  const panel = usePanel()
  const { showToast } = useToast()

  useEffect(() => {
    if (wasOpen.current && !panel.isOpen) triggerRef.current?.focus()
    wasOpen.current = panel.isOpen
  }, [panel.isOpen])

  const handleTagRemove = (id: number) => {
    dispatch(actions.removeCommitted(id))
    showToast(STRINGS.toast.itemRemoved, 'info')
  }

  const handleOpenPanel = () => {
    if (panel.isOpen) return
    dispatch(actions.syncDraft())
    panel.open()
  }

  return (
    <Card
      variant="outlined"
      sx={{
        p: 2,
        maxWidth: WIDGET_MAX_WIDTH,
        mx: 'auto',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: { xs: '95vh', sm: 'none' },
        overflow: 'hidden',
      }}
    >
      <Stack spacing={2} sx={{ flexShrink: 0 }}>
        <Box>
          <Typography variant="h6" gutterBottom>
            {STRINGS.widget.title}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {STRINGS.widget.selectedCount(state.committed.length)}
          </Typography>
        </Box>
        {state.committed.length > 0 ? (
          <TagList items={state.committed} onRemove={handleTagRemove} />
        ) : (
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {STRINGS.widget.noItemsSelected}
          </Typography>
        )}
        <Button
          ref={triggerRef}
          variant="contained"
          color="primary"
          onClick={handleOpenPanel}
          sx={{ alignSelf: 'flex-start' }}
        >
          {state.committed.length > 0
            ? STRINGS.widget.changeChoice
            : STRINGS.widget.selectChoice}
        </Button>
      </Stack>
      <Fade in={panel.isOpen} unmountOnExit>
        <SelectionPanel items={items} />
      </Fade>
    </Card>
  )
}
