import { RouteComponentProps } from 'react-router';
import { AppState } from '../reducer/state'; // Asegúrate de que esta importación sea correcta
import { loadUserData, setData } from '../reducer/data/user/user.actions'; // Asegúrate de que estas importaciones sean correctas
import { loadConfData } from '../reducer/data/sessions/sessions.actions';
import { Schedule } from '../reducer/models/Schedule';
import { buildInitialValues } from '../classes/MyYup';


// Define OwnProps
export interface OwnProps extends RouteComponentProps {}

// Define StateProps
export interface StateProps {
    darkMode: boolean;
    schedule: Schedule;
    hasLoggedIn: boolean;
    initialUser: User; // Asegúrate de que el tipo de User sea el adecuado
}
// mapStateToProps
export const mapStateToProps = (state: AppState): StateProps => ({
    darkMode: state.user.darkMode,
    schedule: state.data.schedule,
    hasLoggedIn: state.user.hasLoggedIn,
    initialUser: state.user.initialUser // Asegúrate de que esto coincida con la estructura de tu estado
});

// Define DispatchProps
export interface DispatchProps {
    loadConfData: typeof loadConfData;
    loadUserData: typeof loadUserData;
    setData: typeof setData;
}

// mapDispatchToProps
export const mapDispatchToProps: DispatchProps = {
    loadConfData,
    loadUserData,
    setData
};

// Define ComponentProps
export interface ComponentProps extends OwnProps, StateProps, DispatchProps {}