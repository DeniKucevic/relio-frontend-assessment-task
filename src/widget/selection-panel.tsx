import { useCallback, useMemo, useState } from 'react'

import { ElementList } from '@/components/element-list'
import { TagList } from '@/components/tag-list'
import { MAX_SELECTED, SEARCH_DEBOUNCE_MS } from '@/config'
import {
    actions,
    useSelectionDispatch,
    useSelectionState,
} from '@/context/selection-context'
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

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>('none')
  const debouncedSearchQuery = useDebounce(searchQuery, SEARCH_DEBOUNCE_MS)

  const filteredItems = useMemo(() => {
    const byFilter = applyFilter(items, selectedFilter)
    if (!debouncedSearchQuery.trim()) return byFilter
    const q = debouncedSearchQuery.trim().toLowerCase()
    return byFilter.filter((i) => i.label.toLowerCase().includes(q))
  }, [items, selectedFilter, debouncedSearchQuery])

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
  }, [dispatch])

  const handleCancel = useCallback(() => {
    dispatch(actions.cancel())
  }, [dispatch])

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
    </Paper>
  )
}
