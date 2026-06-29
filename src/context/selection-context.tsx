import { type ReactNode, createContext, useContext, useReducer } from 'react'

import { MAX_SELECTED } from '@/config'

import type { Item } from '@/types'

type State = {
  committed: Item[]
  draft: Item[]
  isPanelOpen: boolean
}

export type Action =
  | { type: 'OPEN_PANEL' }
  | { type: 'TOGGLE_ITEM'; item: Item }
  | { type: 'REMOVE_DRAFT'; id: Item['id'] }
  | { type: 'REMOVE_COMMITTED'; id: Item['id'] }
  | { type: 'SAVE' }
  | { type: 'CANCEL' }

// Action creators
export const actions = {
  /** copies committed into draft */
  openPanel: (): Action => ({ type: 'OPEN_PANEL' }),
  /** adds/removes item from draft (max 3) */
  toggleItem: (item: Item): Action => ({ type: 'TOGGLE_ITEM', item }),
  /** removes item from draft by id */
  removeDraft: (id: Item['id']): Action => ({ type: 'REMOVE_DRAFT', id }),
  /** removes item from committed by id */
  removeCommitted: (id: Item['id']): Action => ({
    type: 'REMOVE_COMMITTED',
    id,
  }),
  /** copies draft into committed */
  save: (): Action => ({ type: 'SAVE' }),
  /** restores draft from committed */
  cancel: (): Action => ({ type: 'CANCEL' }),
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'OPEN_PANEL':
      return { ...state, draft: [...state.committed], isPanelOpen: true }
    case 'TOGGLE_ITEM': {
      const isSelected = state.draft.some((i) => i.id === action.item.id)
      if (isSelected)
        return {
          ...state,
          draft: state.draft.filter((i) => i.id !== action.item.id),
        }
      if (state.draft.length >= MAX_SELECTED) return state
      return { ...state, draft: [...state.draft, action.item] }
    }
    case 'REMOVE_DRAFT':
      return { ...state, draft: state.draft.filter((i) => i.id !== action.id) }
    case 'REMOVE_COMMITTED':
      return {
        ...state,
        committed: state.committed.filter((i) => i.id !== action.id),
      }
    case 'SAVE':
      return { ...state, committed: [...state.draft], isPanelOpen: false }
    case 'CANCEL':
      return { ...state, draft: [...state.committed], isPanelOpen: false }
    default:
      return state
  }
}

type SelectionContextValue = {
  state: State
  dispatch: React.Dispatch<Action>
}

const SelectionContext = createContext<SelectionContextValue | null>(null)

/**
 * A context provider for managing item selection state.
 * @param param0 The children to wrap with the selection context.
 * @returns The selection context provider.
 */
export const SelectionProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, {
    committed: [],
    draft: [],
    isPanelOpen: false,
  })
  return (
    <SelectionContext.Provider value={{ state, dispatch }}>
      {children}
    </SelectionContext.Provider>
  )
}

/**
 * A custom hook for accessing the selection context.
 * @returns The selection context value.
 */
export const useSelection = () => {
  const ctx = useContext(SelectionContext)
  if (!ctx)
    throw new Error('useSelection must be used within a SelectionProvider')
  return ctx
}
