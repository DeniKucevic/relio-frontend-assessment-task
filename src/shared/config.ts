import type { Item } from './types'

// maximum number of items that can be selected at once
export const MAX_SELECTED = 3
// debounce delay for search input
export const SEARCH_DEBOUNCE_MS = 200
// total number of items to generate for the list
export const ITEM_COUNT = 15000

// filter options for the selection panel
export const FILTER_OPTIONS = [
  { value: 'none', label: 'No filter', predicate: () => true },
  { value: '>100', label: '> 100', predicate: (item: Item) => item.id > 100 },
  {
    value: '>2500',
    label: '> 2500',
    predicate: (item: Item) => item.id > 2500,
  },
  {
    value: '>10000',
    label: '> 10000',
    predicate: (item: Item) => item.id > 10000,
  },
] as const
// type definition for filter options based on the FILTER_OPTIONS array
export type FilterOption = (typeof FILTER_OPTIONS)[number]['value']
