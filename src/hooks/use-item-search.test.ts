import { type RenderHookResult, act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { useItemSearch } from './use-item-search'

const items = Array.from({ length: 150 }, (_, i) => ({
  id: i + 1,
  label: `Element ${i + 1}`,
}))

type Search = ReturnType<typeof useItemSearch>
const ids = (r: RenderHookResult<Search, unknown>) =>
  r.result.current.filteredItems.map((i) => i.id)

describe('useItemSearch', () => {
  it('returns all items with no filter or search', () => {
    const { result } = renderHook(() => useItemSearch(items))
    expect(result.current.filteredItems).toHaveLength(150)
  })

  it('debounces the search before filtering', () => {
    vi.useFakeTimers()
    const r = renderHook(() => useItemSearch(items))

    act(() => r.result.current.setSearchQuery('Element 5'))
    expect(r.result.current.filteredItems).toHaveLength(150)

    act(() => vi.advanceTimersByTime(200))
    const got = ids(r)
    expect(got).toContain(5)
    expect(got).toContain(55)
    expect(got).not.toContain(15)
    expect(got).not.toContain(6)
    vi.useRealTimers()
  })

  it('is case-insensitive substring search', () => {
    vi.useFakeTimers()
    const r = renderHook(() => useItemSearch(items))
    act(() => r.result.current.setSearchQuery('element 7'))
    act(() => vi.advanceTimersByTime(200))
    expect(ids(r)).toContain(7)
    expect(ids(r)).toContain(77)
    vi.useRealTimers()
  })

  it('composes filter AND search (both must hold)', () => {
    vi.useFakeTimers()
    const r = renderHook(() => useItemSearch(items))
    act(() => r.result.current.setSelectedFilter('>100'))
    act(() => r.result.current.setSearchQuery('2'))
    act(() => vi.advanceTimersByTime(200))

    expect(r.result.current.filteredItems.length).toBeGreaterThan(0)
    expect(ids(r).every((id) => id > 100)).toBe(true)
    expect(
      r.result.current.filteredItems.every((i) => i.label.includes('2')),
    ).toBe(true)
    vi.useRealTimers()
  })
})
