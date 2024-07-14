import React, { createContext, PropsWithChildren, useReducer } from 'react';
import { initialState, AppState, reducers } from '../state';

/**
 * Interface defining the shape of AppContext's state and dispatch function.
 */
export interface AppContextState {
  state: AppState; // The current application state
  dispatch: React.Dispatch<any>; // Function to dispatch actions to update the state
}

/**
 * Context object for managing application state and dispatching actions.
 * Initialized with default values for state and dispatch.
 */
export const AppContext = createContext<AppContextState>({
  state: initialState,
  dispatch: () => undefined,
});

/**
 * Provider component for the AppContext.
 * Manages the state using useReducer hook and provides state and dispatch to its children.
 * @param children React elements to be wrapped by the provider.
 */
export const AppContextProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {

  // useReducer hook to manage application state based on reducers and initial state
  const [store, dispatch] = useReducer(reducers, initialState);

  return (
    <AppContext.Provider
      value={{
        state: store, // Provides the current state to consuming components
        dispatch, // Provides the dispatch function to update the swtate
      }}
    >
      {children} {/* Render children components wrapped in AppContext.Provider */}
    </AppContext.Provider>
  );
  
};
