import { createContext, useContext } from 'react'

import { MAX_SELECTED } from '@/shared/config'

import type { Item } from '@/shared/types'

type State = {
  committed: Item[]
  draft: Item[]
}

export const initialState: State = {
  committed: [],
  draft: [],
}

export type Action =
  | { type: 'TOGGLE_ITEM'; item: Item }
  | { type: 'REMOVE_DRAFT'; id: Item['id'] }
  | { type: 'REMOVE_COMMITTED'; id: Item['id'] }
  | { type: 'SAVE' }
  | { type: 'CANCEL' }
  | { type: 'SYNC_DRAFT' }

// Action creators
export const actions = {
  toggleItem: (item: Item): Action => ({ type: 'TOGGLE_ITEM', item }),
  removeDraft: (id: Item['id']): Action => ({ type: 'REMOVE_DRAFT', id }),
  removeCommitted: (id: Item['id']): Action => ({
    type: 'REMOVE_COMMITTED',
    id,
  }),
  save: (): Action => ({ type: 'SAVE' }),
  cancel: (): Action => ({ type: 'CANCEL' }),
  syncDraft: (): Action => ({ type: 'SYNC_DRAFT' }),
}

const toggleItemInDraft = (draft: Item[], item: Item): Item[] => {
  const isSelected = draft.some((i) => i.id === item.id)
  if (isSelected) return draft.filter((i) => i.id !== item.id)
  if (draft.length >= MAX_SELECTED) return draft
  return [...draft, item]
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'TOGGLE_ITEM':
      return { ...state, draft: toggleItemInDraft(state.draft, action.item) }
    case 'REMOVE_DRAFT':
      return { ...state, draft: state.draft.filter((i) => i.id !== action.id) }
    case 'REMOVE_COMMITTED': {
      const committed = state.committed.filter((i) => i.id !== action.id)
      const draft = state.draft.filter((i) => i.id !== action.id)
      return { ...state, committed, draft }
    }
    case 'SAVE':
      return { ...state, committed: [...state.draft] }
    case 'CANCEL':
    case 'SYNC_DRAFT':
      // both actions reset draft from committed — kept as separate
      // action types because they're triggered by different events
      // (user cancel vs. opening the panel), even though the state
      // change is identical
      return { ...state, draft: [...state.committed] }

    default:
      return state
  }
}

// We split the state and dispatch into two separate contexts to
// avoid unnecessary re-renders of components that only need one
// of them. This is a common optimization technique in React when
// using the Context API.
export const SelectionStateContext = createContext<State | null>(null)
export const SelectionDispatchContext =
  createContext<React.Dispatch<Action> | null>(null)

export const useSelectionState = () => {
  const ctx = useContext(SelectionStateContext)
  if (!ctx)
    throw new Error('useSelectionState must be used within SelectionProvider')
  return ctx
}

export const useSelectionDispatch = () => {
  const dispatch = useContext(SelectionDispatchContext)
  if (!dispatch)
    throw new Error(
      'useSelectionDispatch must be used within SelectionProvider',
    )
  return dispatch
}
