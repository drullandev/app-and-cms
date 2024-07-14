import React, { useContext, useMemo } from 'react';
import { AppContext } from './AppContext';
import { DispatchObject } from '../../utils/types';
import { AppState } from '../state';

/**
 * Parameters for the connect function, which connects a component to the application state and dispatch.
 */
interface ConnectParams<TOwnProps extends {} = any, TStateProps = any, TDispatchProps extends object = any> {
  mapStateToProps?: (state: AppState, props: TOwnProps) => TStateProps; // Function to map state to props
  mapDispatchToProps?: TDispatchProps; // Object containing functions to map dispatch to props
  component: React.ComponentType<any>; // Component to be connected
}

/**
 * Connects a component to the application state and dispatch, providing state props and dispatch functions as props.
 * @param mapStateToProps Function to map application state to component props.
 * @param mapDispatchToProps Object containing functions to map dispatch actions to component props.
 * @param component Component to be connected.
 */
export function connect<TOwnProps extends {} = any, TStateProps = any, TDispatchProps extends object = any>({
  mapStateToProps = () => ({} as TStateProps),
  mapDispatchToProps = {} as TDispatchProps,
  component,
}: ConnectParams<TOwnProps, TStateProps, TDispatchProps>): React.FunctionComponent<TOwnProps> {

  const Connect = (ownProps: TOwnProps) => {
    const context = useContext(AppContext); // Access the AppContext to get state and dispatch

    // Memoize the dispatch functions to prevent unnecessary re-renders
    const dispatchFuncs = useMemo(() => {
      const dispatchFuncs: { [key: string]: any } = {};

      // Iterate through each key in mapDispatchToProps and create a new dispatch function
      Object.keys(mapDispatchToProps).forEach((key) => {
        const oldFunc = (mapDispatchToProps as any)[key];
        const newFunc = (...args: any) => {
          const dispatchFunc = oldFunc(...args); // Call the original dispatch function

          // Handle different types of dispatch functions (object or promise)
          if (typeof dispatchFunc === 'object') {
            context.dispatch(dispatchFunc); // Dispatch an object action
          } else {
            const result = dispatchFunc(context.dispatch); // Call a function that returns a dispatch object or promise
            if (typeof result === 'object' && result.then) {
              result.then((dispatchObject?: DispatchObject) => {
                if (dispatchObject && dispatchObject.type) {
                  context.dispatch(dispatchObject); // Dispatch the returned object action
                }
              });
            }
          }
        };
        dispatchFuncs[key] = newFunc; // Store the new dispatch function
      });

      return dispatchFuncs; // Return all dispatch functions
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mapDispatchToProps]);

    // Memoize props to optimize rendering
    const props = useMemo(() => {
      return Object.assign({}, ownProps, mapStateToProps(context.state, ownProps), dispatchFuncs); // Combine ownProps, state props, and dispatch functions
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ownProps, context.state]);

    // Render the connected component with props
    return React.createElement<TOwnProps>(component, props);
  };

  return React.memo(Connect as any); // Memoize the connected component to optimize re-renders
}
