import { useMemo, useState } from 'react'

import { ElementList } from '@/components/element-list'
import { TagList } from '@/components/tag-list'
import { SEARCH_DEBOUNCE_MS } from '@/config'
import { actions, useSelection } from '@/context/selection-context'
import { useDebounce } from '@/hooks/useDebounce'
import { applyFilter } from '@/utils/filter-items'
import { Button, ButtonGroup, Input, Paper } from '@mui/material'

import type { FilterOption, Item } from '@/types'

type SelectionPanelProps = {
  items: Item[]
  onSave: () => void
  onCancel: () => void
}

export const SelectionPanel = ({
  items,
  onSave,
  onCancel,
}: SelectionPanelProps) => {
  const { dispatch, state } = useSelection()

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

  const handleToggle = (item: Item) => {
    dispatch(actions.toggleItem(item))
  }

  const handleTagRemove = (id: number) => {
    dispatch(actions.removeDraft(id))
  }

  const handleSave = () => {
    dispatch(actions.save())
    onSave()
  }

  const handleCancel = () => {
    dispatch(actions.cancel())
    onCancel()
  }

  return (
    <Paper>
      <Input
        value={searchQuery}
        autoFocus
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <ElementList
        items={filteredItems}
        selectedIds={selectedIds}
        maxReached={state.draft.length >= 3}
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
