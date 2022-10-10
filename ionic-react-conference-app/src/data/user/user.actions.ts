import {
  setIdData,
  setJwtData,
  setUsernameData,
  setEmailData,
  setBlockedData,
  setConfirmedData,
  setCreatedAtData,
  setUpdatedAtData,
  setProviderData,
  setDarkModeData,
  setHasSeenTutorialData,
  setIsLoggedInData,
  getUserData,
} from '../dataApi'

import { ActionType } from '../../util/types'
import { UserState } from './user.state'

// Keep it simple

export const loadUserData = () => async (dispatch: React.Dispatch<any>) => {
  dispatch(setLoading(true))
  const data = await getUserData()
  dispatch(setData(data))
  dispatch(setLoading(false))
}

export const setData = (data: Partial<UserState>) => ({
  type: 'set-user-data', data
} as const)

export const logoutUser = () => async (dispatch: React.Dispatch<any>) => {
  await setIsLoggedInData(false)
  dispatch(setUsername())
  dispatch(setEmail())
  dispatch(setDarkMode(true))
}

export const setIsLoggedIn = (loggedIn: boolean) => async (dispatch: React.Dispatch<any>) => {
  await setIsLoggedInData(loggedIn)
  return ({ type: 'set-is-loggedin', loggedIn } as const)
}

// COMMON

export const setId = (id?: string) => async (dispatch: React.Dispatch<any>) => {
  await setIdData(id)
  return ({ type: 'set-id', id } as const)
}

export const setJwt = (jwt?: string) => async (dispatch: React.Dispatch<any>) => {
  await setJwtData(jwt)
  return ({type: 'set-jwt',jwt  } as const)
}

export const setUsername = (username?: string) => async (dispatch: React.Dispatch<any>) => {
  await setUsernameData(username)
  return ({ type: 'set-username', username } as const)
}

export const setEmail = (email?: string) => async (dispatch: React.Dispatch<any>) => {
  await setEmailData(email)
  return ({ type: 'set-email', email } as const)
}


export const setBlocked = (blocked?: boolean) => async (dispatch: React.Dispatch<any>) => {
  await setBlockedData(blocked)
  return ({ type: 'set-blocked', blocked } as const)
}

export const setConfirmed = (confirmed?: boolean) => async (dispatch: React.Dispatch<any>) => {
  await setConfirmedData(confirmed)
  return ({ type: 'set-confirmed', confirmed } as const)
}

export const setCreatedAt = (createdAt?: string) => async (dispatch: React.Dispatch<any>) => {
  await setCreatedAtData(createdAt)
  return ({ type: 'set-created-at', createdAt } as const)
}

export const setUpdatedAt = (updatedAt?: string) => async (dispatch: React.Dispatch<any>) => {
  await setUpdatedAtData(updatedAt)
  return ({ type: 'set-updated-at', updatedAt } as const)
}

export const setProvider = (provider2?: string) => async (dispatch: React.Dispatch<any>) => {
  await setProviderData(provider2)
  return ({ type: 'set-provider', provider2 } as const)
}

export const setDarkMode = (darkMode?: boolean) => async (dispatch: React.Dispatch<any>) => {
  await setDarkModeData(darkMode)
  return ({ type: 'set-dark-mode', darkMode } as const)
}

export const setHasSeenTutorial = (hasSeenTutorial: boolean) => async (dispatch: React.Dispatch<any>) => {
  await setHasSeenTutorialData(hasSeenTutorial)
  return ({ type: 'set-has-seen-tutorial', hasSeenTutorial } as const)
} 

export const setLoading = (isLoading: boolean) => { 
  return { type: 'set-user-loading',  isLoading } as const
}

export type UserActions =
| ActionType<typeof setId>
| ActionType<typeof setJwt>
| ActionType<typeof setUsername>
| ActionType<typeof setEmail>
| ActionType<typeof setBlocked>
| ActionType<typeof setConfirmed>
| ActionType<typeof setCreatedAt>
| ActionType<typeof setUpdatedAt>
| ActionType<typeof setProvider>
| ActionType<typeof setDarkMode>
| ActionType<typeof setHasSeenTutorial>
| ActionType<typeof setLoading>
| ActionType<typeof setData>
| ActionType<typeof setIsLoggedIn>
