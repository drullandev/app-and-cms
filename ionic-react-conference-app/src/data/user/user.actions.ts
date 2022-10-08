import { getUserData, setIsLoggedInData, setUsernameData, setHasSeenTutorialData, setJwtData, setBlockedData, setConfirmedData, setCreatedAtData, setUpdatedAtData, setEmailData, setIdData, setProviderData } from '../dataApi';
import { ActionType } from '../../util/types';
import { UserState } from './user.state';

// Keep it simple

export const loadUserData = () => async (dispatch: React.Dispatch<any>) => {
  dispatch(setLoading(true));
  const data = await getUserData();
  dispatch(setData(data));
  dispatch(setLoading(false));
}

export const setLoading = (isLoading: boolean) => { 
  return { type: 'set-user-loading',  isLoading } as const
}

export const setData = (data: Partial<UserState>) => ({
  type: 'set-user-data', data
} as const);

export const logoutUser = () => async (dispatch: React.Dispatch<any>) => {
  await setIsLoggedInData(false);
  dispatch(setUsername());
};

export const setIsLoggedIn = (loggedIn: boolean) => async (dispatch: React.Dispatch<any>) => {
  await setIsLoggedInData(loggedIn);
  return ({
    type: 'set-is-loggedin',
    loggedIn
  } as const)
};

export const setUsername = (username?: string) => async (dispatch: React.Dispatch<any>) => {
  await setUsernameData(username);
  return ({
    type: 'set-username',
    username
  } as const);
};

export const setHasSeenTutorial = (hasSeenTutorial: boolean) => async (dispatch: React.Dispatch<any>) => {
  await setHasSeenTutorialData(hasSeenTutorial);
  return ({
    type: 'set-has-seen-tutorial',
    hasSeenTutorial
  } as const);
} 

export const setDarkMode = (darkMode: boolean) => ({
  type: 'set-dark-mode',
  darkMode
} as const);

export const setJwt = (jwt?: string) => async (dispatch: React.Dispatch<any>) => {
  await setJwtData(jwt);
  return ({type: 'set-jwt',jwt  } as const);
}

export const setBlocked = (blocked?: boolean) => async (dispatch: React.Dispatch<any>) => {
  await setBlockedData(blocked);
  return ({ type: 'set-blocked', blocked } as const);
}

export const setConfirmed = (confirmed?: boolean) => async (dispatch: React.Dispatch<any>) => {
  await setConfirmedData(confirmed);
  return ({ type: 'set-confirmed', confirmed } as const);
}

export const setCreatedAt = (createdAt?: string) => async (dispatch: React.Dispatch<any>) => {
  await setCreatedAtData(createdAt);
  return ({ type: 'set-created-at', createdAt } as const);
}

export const setUpdatedAt = (updatedAt?: string) => async (dispatch: React.Dispatch<any>) => {
  await setUpdatedAtData(updatedAt);
  return ({ type: 'set-updated-at', updatedAt } as const);
}

export const setEmail = (email?: string) => async (dispatch: React.Dispatch<any>) => {
  await setEmailData(email);
  return ({ type: 'set-email', email } as const);
}
/*
export const setProvider = (provider?: string) => async (dispatch: React.Dispatch<any>) => {
  await setProviderData(provider);
  return ({ type: 'set-provider', provider } as const);
}

export const setId = (id?: number) => async (dispatch: React.Dispatch<any>) => {
  await setIdData(id);
  return ({ type: 'set-id', id } as const);
}
*/

export type UserActions =
  | ActionType<typeof setLoading>
  | ActionType<typeof setData>
  | ActionType<typeof setIsLoggedIn>
  | ActionType<typeof setUsername>
  | ActionType<typeof setHasSeenTutorial>
  | ActionType<typeof setDarkMode>
  | ActionType<typeof setJwt>
  | ActionType<typeof setBlocked>
  | ActionType<typeof setConfirmed>
  | ActionType<typeof setCreatedAt>
  | ActionType<typeof setUpdatedAt>
  | ActionType<typeof setEmail>
  //| ActionType<typeof setProvider>
  //| ActionType<typeof setId>
