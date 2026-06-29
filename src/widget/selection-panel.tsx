import { useMemo, useState } from 'react'

import { ElementList } from '@/components/element-list'
import { TagList } from '@/components/tag-list'
import { SEARCH_DEBOUNCE_MS } from '@/config'
import { useSelection } from '@/context/selection-context'
import { useDebounce } from '@/hooks/useDebounce'
import { applyFilter } from '@/utils/filter-items'
import { Input } from '@mui/material'

import type { Item } from '@/types'

type SelectionPanelProps = {
  items: Item[]
  onSave: () => void
  onCancel: () => void
}

type FilterOption = 'none'

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

  return (
    <>
      <Input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <ElementList
        items={filteredItems}
        selectedIds={selectedIds}
        maxReached={false}
        emptyText="No items found"
        onToggle={() => null}
      />
      <TagList items={state.draft} onRemove={() => null} />
    </>
  )
}
