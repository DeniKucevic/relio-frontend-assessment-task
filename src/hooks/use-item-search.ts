import { useMemo, useState } from 'react'

import { SEARCH_DEBOUNCE_MS } from '@/shared/config'
import { applyFilter } from '@/utils/filter-items'

import { useDebounce } from './use-debounce'

import type { FilterOption, Item } from '@/shared/types'

export function useItemSearch(items: Item[]) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>('none')
  const debouncedSearchQuery = useDebounce(searchQuery, SEARCH_DEBOUNCE_MS)

  const filteredItems = useMemo(() => {
    const byFilter = applyFilter(items, selectedFilter)
    if (!debouncedSearchQuery.trim()) return byFilter
    const q = debouncedSearchQuery.trim().toLowerCase()
    return byFilter.filter((i) => i.label.toLowerCase().includes(q))
  }, [items, selectedFilter, debouncedSearchQuery])

  return {
    searchQuery,
    setSearchQuery,
    selectedFilter,
    setSelectedFilter,
    filteredItems,
  }
}
