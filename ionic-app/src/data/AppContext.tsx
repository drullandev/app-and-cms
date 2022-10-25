import React, { createContext, useReducer } from 'react'
import { initialState, AppState, reducers } from './state'

export interface AppContextState {
  state: AppState
  dispatch: React.Dispatch<any>
}

export const AppContext = createContext<AppContextState>({
  state: initialState,
  dispatch: () => undefined
})

export const AppContextProvider: React.FC = (props => {
  const [store, dispatch] = useReducer(reducers, initialState)
  const conf = {
    state: store,
    dispatch
  }
  return (
    <AppContext.Provider value={conf}>
      {props.children}
    </AppContext.Provider>
  )
})