import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { useDebounce } from './use-debounce'

describe('useDebounce', () => {
  it('returns the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('a', 200))
    expect(result.current).toBe('a')
  })

  it('does not update before the delay elapses', () => {
    vi.useFakeTimers()
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 200),
      {
        initialProps: { value: 'a' },
      },
    )
    rerender({ value: 'b' })
    act(() => vi.advanceTimersByTime(100))
    expect(result.current).toBe('a')
    vi.useRealTimers()
  })

  it('updates after the delay elapses', () => {
    vi.useFakeTimers()
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 200),
      {
        initialProps: { value: 'a' },
      },
    )
    rerender({ value: 'b' })
    act(() => vi.advanceTimersByTime(200))
    expect(result.current).toBe('b')
    vi.useRealTimers()
  })
})
