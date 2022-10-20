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
  setUserData
} from '../dataApi'

import { ActionType } from '../../util/types'
import { UserState } from './user.state'
import { initialUser } from '../state'

// !Keep it simple !!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!

export const loadUserData = () => async (dispatch: React.Dispatch<any>) => {
  testing(loadUserData)
  dispatch(setLoading(true))
  const data = await getUserData()
  dispatch(setData(data))
  dispatch(setLoading(false))
}

export const logoutUser = () => async (dispatch: React.Dispatch<any>) => {
  testing(logoutUser)
  await setIsLoggedInData(false)
  await setUserData(initialUser)
}

export const onLoginSuccess = async (ret: any) => {
  let user = ret.user
  user.jwt = ret.jwt // Attach JWT...
  setData(user)
  setIsLoggedIn(true)
  return user
}    

export const setData = (data: Partial<UserState>) => async (dispatch: React.Dispatch<any>) => {
  testing(setData, data)
  await setUserData(data)
  return ({ type: 'set-user-data', data} as const)
}

export const setIsLoggedIn = (loggedIn: boolean) => async (dispatch: React.Dispatch<any>) => {
  testing(setIsLoggedIn, loggedIn)
  await setIsLoggedInData(loggedIn)
  return ({ type: 'set-is-loggedin', loggedIn } as const)
}

// COMMON

export const setId = (id?: string) => async (dispatch: React.Dispatch<any>) => {
  testing(setId, id)
  await setIdData(id)
  return ({ type: 'set-id', id } as const)
}

export const setJwt = (jwt?: string) => async (dispatch: React.Dispatch<any>) => {
  testing(setJwt, jwt)
  await setJwtData(jwt)
  return ({type: 'set-jwt',jwt  } as const)
}

export const setUsername = (username?: string) => async (dispatch: React.Dispatch<any>) => {
  testing(setUsername, username)
  await setUsernameData(username)
  return ({ type: 'set-username', username } as const)
}

export const setEmail = (email?: string) => async (dispatch: React.Dispatch<any>) => {
  testing(setEmail, email)
  await setEmailData(email)
  return ({ type: 'set-email', email } as const)
}


export const setBlocked = (blocked?: boolean) => async (dispatch: React.Dispatch<any>) => {
  testing(setBlocked, blocked)
  await setBlockedData(blocked)
  return ({ type: 'set-blocked', blocked } as const)
}

export const setConfirmed = (confirmed?: boolean) => async (dispatch: React.Dispatch<any>) => {
  testing(setConfirmed, confirmed)
  await setConfirmedData(confirmed)
  return ({ type: 'set-confirmed', confirmed } as const)
}

export const setCreatedAt = (createdAt?: string) => async (dispatch: React.Dispatch<any>) => {
  testing(setCreatedAt, createdAt)
  await setCreatedAtData(createdAt)
  return ({ type: 'set-created-at', createdAt } as const)
}

export const setUpdatedAt = (updatedAt?: string) => async (dispatch: React.Dispatch<any>) => {
  testing(setUpdatedAt, updatedAt)
  await setUpdatedAtData(updatedAt)
  return ({ type: 'set-updated-at', updatedAt } as const)
}

export const setProvider = (provider2?: string) => async (dispatch: React.Dispatch<any>) => {
  testing(setProvider, provider2)
  await setProviderData(provider2)
  return ({ type: 'set-provider', provider2 } as const)
}

export const setDarkMode = (darkMode?: boolean) => async (dispatch: React.Dispatch<any>) => {
  testing(setDarkMode, darkMode)
  await setDarkModeData(darkMode)
  return ({ type: 'set-dark-mode', darkMode } as const)
}

export const setHasSeenTutorial = (hasSeenTutorial: boolean) => async (dispatch: React.Dispatch<any>) => {
  testing(setHasSeenTutorial, hasSeenTutorial)
  await setHasSeenTutorialData(hasSeenTutorial)
  return ({ type: 'set-has-seen-tutorial', hasSeenTutorial } as const)
} 

export const setLoading = (isLoading: boolean) => {
  testing(setLoading, isLoading)
  return { type: 'set-user-loading',  isLoading } as const
}

const testing = (func: Function, data: any = undefined, schema: string = 'user') => {
  console.log(schema+'.action::'+func.name, data)
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