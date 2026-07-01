import { FILTER_OPTIONS, type FilterOption } from '@/shared/config'

import type { Item } from '@/shared/types'

/**
 * Applies a filter to an array of items based on the specified filter option.
 * @param items The array of items to filter.
 * @param filter The filter option to apply.
 * @returns The filtered array of items.
 */
export const applyFilter = (items: Item[], filter: FilterOption): Item[] => {
  const option = FILTER_OPTIONS.find((o) => o.value === filter)!
  return items.filter(option.predicate)
}
