import { forwardRef, useMemo, useState } from 'react'

import { ConfirmDialog } from '@/components/confirm-dialog'
import { ElementList } from '@/components/element-list'
import { usePanel } from '@/context/panel-context'
import {
  actions,
  useSelectionDispatch,
  useSelectionState,
} from '@/context/selection-context'
import { useToast } from '@/context/toast-context'
import { useItemSearch } from '@/hooks/use-item-search'
import { MAX_SELECTED } from '@/shared/config'
import { STRINGS } from '@/shared/strings'
import { hasPendingChanges } from '@/utils/has-pending-changes'
import CloseIcon from '@mui/icons-material/Close'
import { Box, IconButton, Paper, Typography } from '@mui/material'

import { PanelFooter } from './panel-footer'
import { PanelToolbar } from './panel-toolbar'

import type { Item } from '@/shared/types'

type SelectionPanelProps = { items: Item[] }

export const SelectionPanel = forwardRef<HTMLDivElement, SelectionPanelProps>(
  ({ items }, ref) => {
    const state = useSelectionState()
    const dispatch = useSelectionDispatch()
    const panel = usePanel()
    const { showToast } = useToast()
    const [confirmOpen, setConfirmOpen] = useState(false)

    const {
      searchQuery,
      setSearchQuery,
      selectedFilter,
      setSelectedFilter,
      filteredItems,
    } = useItemSearch(items)

    const selectedIds = useMemo(
      () => new Set(state.draft.map((i) => i.id)),
      [state.draft],
    )

    const handleSave = () => {
      dispatch(actions.save())
      panel.close()
      showToast(STRINGS.toast.saved)
    }

    const requestClose = () => {
      if (hasPendingChanges(state.draft, state.committed)) {
        setConfirmOpen(true)
      } else {
        dispatch(actions.cancel())
        panel.close()
        showToast(STRINGS.toast.cancelled, 'info')
      }
    }

    const handleDiscard = () => {
      dispatch(actions.cancel())
      panel.close()
      setConfirmOpen(false)
      showToast(STRINGS.toast.discarded, 'info')
    }

    return (
      <Paper
        ref={ref}
        variant="outlined"
        role="region"
        aria-label={STRINGS.aria.panelLabel}
        sx={{
          mt: 2,
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          minHeight: 0,
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
            bgcolor: 'background.default',
            borderBottom: 1,
            borderColor: 'divider',
            borderTopLeftRadius: 'inherit',
            borderTopRightRadius: 'inherit',
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {STRINGS.panel.title}
          </Typography>
          <IconButton
            size="small"
            onClick={requestClose}
            aria-label={STRINGS.aria.closePanel}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <PanelToolbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
        />
        <ElementList
          items={filteredItems}
          selectedIds={selectedIds}
          maxReached={state.draft.length >= MAX_SELECTED}
          emptyText={STRINGS.panel.noItemsFound}
          onToggle={(item) => dispatch(actions.toggleItem(item))}
        />
        <PanelFooter
          draftItems={state.draft}
          onRemoveDraft={(id) => dispatch(actions.removeDraft(id))}
          onSave={handleSave}
          onCancel={requestClose}
        />
        <ConfirmDialog
          open={confirmOpen}
          message={STRINGS.confirm.message}
          onConfirm={handleDiscard}
          onCancel={() => setConfirmOpen(false)}
        />
      </Paper>
    )
  },
)
