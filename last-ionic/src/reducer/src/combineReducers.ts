/**
 * Type definition for an object whose values are functions returning any type.
 */
 interface R {
  [key: string]: (...args: any) => any;
}

/**
 * Combines multiple reducers into a single reducer function.
 * @param reducers An object where each key is a reducer function.
 * @returns A combined reducer function that merges the state updates from each reducer.
 */
export function combineReducers(reducers: R) {
  // Define type aliases for keys and return types of reducers
  type keys = keyof typeof reducers;
  type returnType = { [K in keys]: ReturnType<typeof reducers[K]> };

  /**
   * Combined reducer function that handles state updates.
   * @param state The current state object.
   * @param action The action object that describes the state change.
   * @returns A new state object with updates from all individual reducers.
   */
  const combinedReducer = (state: any, action: any) => {
    const newState: returnType = {} as any; // Initialize an empty object for the new state
    const keys = Object.keys(reducers); // Get all keys from the reducers object

    // Iterate over each key and apply the corresponding reducer function
    keys.forEach(key => {
      const result = reducers[key](state[key], action); // Call the reducer with current state and action
      newState[key as keys] = result || state[key]; // Assign the result to the new state or retain the current state
    });

    return newState; // Return the updated state object
  };

  return combinedReducer; // Return the combined reducer function
}
