import { useMemo, useState } from 'react'

import { type FilterOption, SEARCH_DEBOUNCE_MS } from '@/shared/config'
import { applyFilter } from '@/utils/filter-items'

import { useDebounce } from './use-debounce'

import type { Item } from '@/shared/types'

/**
 * Custom hook for searching and filtering items.
 *
 * @param items - The list of items to search and filter.
 * @returns An object containing the search query, selected filter, filtered items, and setter functions.
 */
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
