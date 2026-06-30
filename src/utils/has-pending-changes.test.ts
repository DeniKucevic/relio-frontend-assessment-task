import { describe, expect, it } from 'vitest'

import { hasPendingChanges } from './has-pending-changes'

describe('hasPendingChanges', () => {
  const a = { id: 1, label: 'Element 1' }
  const b = { id: 2, label: 'Element 2' }

  it('returns false when draft equals committed', () => {
    expect(hasPendingChanges([a, b], [a, b])).toBe(false)
  })

  it('returns true when lengths differ', () => {
    expect(hasPendingChanges([a], [a, b])).toBe(true)
  })

  it('returns true when same length but different items', () => {
    expect(hasPendingChanges([a, b], [a, { id: 3, label: 'Element 3' }])).toBe(
      true,
    )
  })
})
