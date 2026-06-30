import { type ReactNode, useReducer } from 'react'

import {
  SelectionDispatchContext,
  SelectionStateContext,
  initialState,
  reducer,
} from './selection-context'

export const SelectionProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <SelectionStateContext.Provider value={state}>
      <SelectionDispatchContext.Provider value={dispatch}>
        {children}
      </SelectionDispatchContext.Provider>
    </SelectionStateContext.Provider>
  )
}
