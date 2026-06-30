import { describe, expect, it } from 'vitest'

import { actions, initialState, reducer } from './selection-context'

describe('selection reducer', () => {
  const item1 = { id: 1, label: 'Element 1' }
  const item2 = { id: 2, label: 'Element 2' }
  const item3 = { id: 3, label: 'Element 3' }
  const item4 = { id: 4, label: 'Element 4' }

  it('TOGGLE_ITEM adds item to draft', () => {
    const result = reducer(initialState, actions.toggleItem(item1))
    expect(result.draft).toEqual([item1])
  })

  it('TOGGLE_ITEM removes already selected item', () => {
    const state = { ...initialState, draft: [item1] }
    const result = reducer(state, actions.toggleItem(item1))
    expect(result.draft).toEqual([])
  })

  it('TOGGLE_ITEM does nothing when max reached', () => {
    const state = { ...initialState, draft: [item1, item2, item3] }
    const result = reducer(state, actions.toggleItem(item4))
    expect(result.draft).toEqual([item1, item2, item3])
  })

  it('SAVE copies draft into committed', () => {
    const state = { ...initialState, draft: [item1, item2] }
    const result = reducer(state, actions.save())
    expect(result.committed).toEqual([item1, item2])
  })

  it('CANCEL restores draft from committed', () => {
    const state = { ...initialState, committed: [item1], draft: [item1, item2] }
    const result = reducer(state, actions.cancel())
    expect(result.draft).toEqual([item1])
  })

  it('REMOVE_DRAFT removes item from draft by id', () => {
    const state = { ...initialState, draft: [item1, item2] }
    const result = reducer(state, actions.removeDraft(item1.id))
    expect(result.draft).toEqual([item2])
  })

  it('REMOVE_COMMITTED removes item from committed by id', () => {
    const state = { ...initialState, committed: [item1, item2] }
    const result = reducer(state, actions.removeCommitted(item1.id))
    expect(result.committed).toEqual([item2])
  })
})
