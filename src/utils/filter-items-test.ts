import { describe, expect, it } from 'vitest'

import { applyFilter } from './filter-items'

describe('applyFilter', () => {
  const items = [
    { id: 50, label: 'Element 50' },
    { id: 101, label: 'Element 101' },
    { id: 2501, label: 'Element 2501' },
    { id: 10001, label: 'Element 10001' },
  ]

  it('returns all items for none', () => {
    expect(applyFilter(items, 'none')).toHaveLength(4)
  })

  it('filters items with id > 100', () => {
    expect(applyFilter(items, '>100')).toEqual([
      { id: 101, label: 'Element 101' },
      { id: 2501, label: 'Element 2501' },
      { id: 10001, label: 'Element 10001' },
    ])
  })

  it('filters items with id > 2500', () => {
    expect(applyFilter(items, '>2500')).toHaveLength(2)
  })

  it('filters items with id > 10000', () => {
    expect(applyFilter(items, '>10000')).toHaveLength(1)
  })
})
