import { RouteComponentProps } from "react-router"; // Import necessary type from react-router
import { AppState } from '../reducer/state'; // Import the type for the global state
import { loadUserData, setData } from '../reducer/data/user/user.actions'; // Import action creators
import { loadConfData } from "../reducer/data/sessions/sessions.actions";
import { Schedule } from '../reducer/models/Schedule';

// Define OwnProps to extend RouteComponentProps for routing capabilities
export interface OwnProps {}

// Define StateProps to represent the part of the state this component needs
export interface StateProps {
    darkMode: boolean
    schedule: Schedule
    hasLoggedIn: boolean
}

// Define DispatchProps to represent the action creators this component needs to dispatch
export interface DispatchProps {
    loadConfData: typeof loadConfData
    loadUserData: typeof loadUserData
    setData: typeof setData
}

// Define ComponentProps to combine all props needed by the component
export interface ComponentProps extends OwnProps, StateProps, DispatchProps {}

// mapStateToProps maps the required state properties to the component's props
export const mapStateToProps = (state: AppState): StateProps => ({
    darkMode: state.user.darkMode,
    schedule: state.data.schedule,
    hasLoggedIn: state.user.hasLoggedIn,
});

// mapDispatchToProps maps the action creators to the component's props
export const mapDispatchToProps: DispatchProps = {
    loadConfData,
    loadUserData,
    setData
};


// Explanation of the reducers and actions:

/**
 * Reducers:
 * - Reducers are functions that take the current state and an action as arguments, and return a new state.
 * - They are used to manage how the state changes in response to actions.
 * - In this example, the reducers would be handling changes to the user state, such as loading status and user data.
 *
 * Action Creators:
 * - Action creators are functions that create actions. An action is a plain object with a type property and optionally other properties.
 * - setData, setLoading, and setisLogged are action creators imported from user.actions.
 * - setData might be used to update the user information in the state.
 * - setLoading would be used to set the loading status when data is being fetched.
 * - setisLogged would be used to update the logged-in status of the user.
 *
 * Component Integration:
 * - The `mapStateToProps` function allows the component to access parts of the global state as props.
 * - The `mapDispatchToProps` object allows the component to dispatch actions as props.
 * - When the component dispatches an action, the corresponding reducer updates the state, and the component re-renders with the new state.
 */
