import { useCallback, useMemo, useState } from 'react'

import { ConfirmDialog } from '@/components/confirm-dialog'
import { ElementList } from '@/components/element-list'
import { TagList } from '@/components/tag-list'
import { MAX_SELECTED, SEARCH_DEBOUNCE_MS } from '@/config'
import { usePanel } from '@/context/panel-context'
import {
  actions,
  useSelectionDispatch,
  useSelectionState,
} from '@/context/selection-context'
import { useToast } from '@/context/toast-context'
import { useDebounce } from '@/hooks/useDebounce'
import { applyFilter } from '@/utils/filter-items'
import {
  Button,
  ButtonGroup,
  Input,
  MenuItem,
  Paper,
  Select,
} from '@mui/material'

import type { FilterOption, Item } from '@/types'

type SelectionPanelProps = {
  items: Item[]
}

export const SelectionPanel = ({ items }: SelectionPanelProps) => {
  const state = useSelectionState()
  const dispatch = useSelectionDispatch()
  const panel = usePanel()
  const { showToast } = useToast()

  const [confirmOpen, setConfirmOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>('none')
  const debouncedSearchQuery = useDebounce(searchQuery, SEARCH_DEBOUNCE_MS)

  const filteredItems = useMemo(() => {
    const byFilter = applyFilter(items, selectedFilter)
    if (!debouncedSearchQuery.trim()) return byFilter
    const q = debouncedSearchQuery.trim().toLowerCase()
    return byFilter.filter((i) => i.label.toLowerCase().includes(q))
  }, [items, selectedFilter, debouncedSearchQuery])

  const hasPendingChanges = useMemo(() => {
    if (state.draft.length !== state.committed.length) return true
    const committedIds = new Set(state.committed.map((i) => i.id))
    return state.draft.some((i) => !committedIds.has(i.id))
  }, [state.draft, state.committed])

  const selectedIds = useMemo(
    () => new Set(state.draft.map((i) => i.id)),
    [state.draft],
  )

  const handleToggle = useCallback(
    (item: Item) => {
      dispatch(actions.toggleItem(item))
    },
    [dispatch],
  )

  const handleTagRemove = useCallback(
    (id: number) => {
      dispatch(actions.removeDraft(id))
    },
    [dispatch],
  )

  const handleSave = useCallback(() => {
    dispatch(actions.save())
    panel.close()
    showToast('Selection saved')
  }, [dispatch, showToast])

  const handleCancel = () => {
    if (hasPendingChanges) {
      setConfirmOpen(true)
    } else {
      dispatch(actions.cancel())
      panel.close()
      showToast('Selection cancelled', 'info')
    }
  }

  const handleDiscard = useCallback(() => {
    dispatch(actions.cancel())
    panel.close()
    setConfirmOpen(false)
    showToast('Changes discarded', 'info')
  }, [dispatch, showToast])

  return (
    <Paper>
      <Input
        value={searchQuery}
        autoFocus
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Select
        value={selectedFilter}
        onChange={(e) => setSelectedFilter(e.target.value as FilterOption)}
      >
        <MenuItem value="none">No filter</MenuItem>
        <MenuItem value=">100">&gt;100</MenuItem>
        <MenuItem value=">2500">&gt;2500</MenuItem>
        <MenuItem value=">10000">&gt;10000</MenuItem>
      </Select>
      <ElementList
        items={filteredItems}
        selectedIds={selectedIds}
        maxReached={state.draft.length >= MAX_SELECTED}
        emptyText="No items found"
        onToggle={handleToggle}
      />
      <TagList items={state.draft} onRemove={handleTagRemove} />
      <ButtonGroup>
        <Button onClick={handleSave}>Save</Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </ButtonGroup>
      <ConfirmDialog
        open={confirmOpen}
        title="Discard changes?"
        message="You have unsaved changes. Are you sure you want to discard them?"
        confirmLabel="Discard"
        cancelLabel="Keep editing"
        onConfirm={handleDiscard}
        onCancel={() => setConfirmOpen(false)}
      />
    </Paper>
  )
}
