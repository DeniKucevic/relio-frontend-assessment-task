import type { FilterOption, Item } from '@/types'

const FILTER_PREDICATES: Record<FilterOption, (item: Item) => boolean> = {
  none: () => true,
  '>100': (item) => item.id > 100,
  '>2500': (item) => item.id > 2500,
  '>10000': (item) => item.id > 10000,
}

/**
 * Applies a filter to an array of items based on the specified filter option.
 * @param items The array of items to filter.
 * @param filter The filter option to apply.
 * @returns The filtered array of items.
 */
export const applyFilter = (items: Item[], filter: FilterOption): Item[] => {
  const predicate = FILTER_PREDICATES[filter]
  return items.filter(predicate)
}
