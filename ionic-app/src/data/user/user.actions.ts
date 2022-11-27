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
  setisLoggedInData,
  getUserData,
  setUserData,
  setCaretData
} from '../dataApi'

import { ActionType } from '../../util/types'
import { UserState } from './user.state'
import { initialUser } from '../state'

let testingUserActions = false
let testing = testingUserActions && process.env.REACT_APP_TESTING

// !Keep it simple !!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!

// EXTRA

export const loadUserData = () => async (dispatch: React.Dispatch<any>) => {
  setTesting(loadUserData)
  dispatch(setLoading(true))
  let data = await getUserData()
  dispatch(setData(data))
  dispatch(setLoading(false))
}

export const logoutUser = () => async (dispatch: React.Dispatch<any>) => {
  setTesting(logoutUser)
  await setisLoggedInData(false)
  await setUserData(initialUser)
}

export const setData = (data: Partial<UserState>) => async (dispatch: React.Dispatch<any>) => {
  setTesting(setData, data)
  await setUserData(data)
  return ({ type: 'set-user-data', data} as const)
}

export const setisLoggedIn = (loggedIn: boolean) => async (dispatch: React.Dispatch<any>) => {
  setTesting(setisLoggedIn, loggedIn)
  await setisLoggedInData(loggedIn)
  return ({ type: 'set-is-loggedin', loggedIn } as const)
}


// COMMON

export const setId = (id?: string) => async (dispatch: React.Dispatch<any>) => {
  setTesting(setId, id)
  await setIdData(id)
  return ({ type: 'set-id', id } as const)
}

export const setJwt = (jwt?: string) => async (dispatch: React.Dispatch<any>) => {
  setTesting(setJwt, jwt)
  await setJwtData(jwt)
  return ({type: 'set-jwt',jwt  } as const)
}

export const setUsername = (username?: string) => async (dispatch: React.Dispatch<any>) => {
  setTesting(setUsername, username)
  await setUsernameData(username)
  return ({ type: 'set-username', username } as const)
}

export const setEmail = (email?: string) => async (dispatch: React.Dispatch<any>) => {
  setTesting(setEmail, email)
  await setEmailData(email)
  return ({ type: 'set-email', email } as const)
}

export const setBlocked = (blocked?: boolean) => async (dispatch: React.Dispatch<any>) => {
  setTesting(setBlocked, blocked)
  await setBlockedData(blocked)
  return ({ type: 'set-blocked', blocked } as const)
}

export const setConfirmed = (confirmed?: boolean) => async (dispatch: React.Dispatch<any>) => {
  setTesting(setConfirmed, confirmed)
  await setConfirmedData(confirmed)
  return ({ type: 'set-confirmed', confirmed } as const)
}

export const setCreatedAt = (createdAt?: string) => async (dispatch: React.Dispatch<any>) => {
  setTesting(setCreatedAt, createdAt)
  await setCreatedAtData(createdAt)
  return ({ type: 'set-created-at', createdAt } as const)
}

export const setUpdatedAt = (updatedAt?: string) => async (dispatch: React.Dispatch<any>) => {
  setTesting(setUpdatedAt, updatedAt)
  await setUpdatedAtData(updatedAt)
  return ({ type: 'set-updated-at', updatedAt } as const)
}

export const setProvider = (provider2?: string) => async (dispatch: React.Dispatch<any>) => {
  setTesting(setProvider, provider2)
  await setProviderData(provider2)
  return ({ type: 'set-provider', provider2 } as const)
}

export const setDarkMode = (darkMode?: boolean) => async (dispatch: React.Dispatch<any>) => {
  setTesting(setDarkMode, darkMode)
  dispatch(await setDarkModeData(darkMode))
  return ({ type: 'set-dark-mode', darkMode } as const)
}

export const setHasSeenTutorial = (hasSeenTutorial: boolean) => async (dispatch: React.Dispatch<any>) => {
  setTesting(setHasSeenTutorial, hasSeenTutorial)
  await setHasSeenTutorialData(hasSeenTutorial)
  return ({ type: 'set-has-seen-tutorial', hasSeenTutorial } as const)
} 

export const setLoading = (isLoading: boolean) => {
  setTesting(setLoading, isLoading)
  return { type: 'set-user-loading',  isLoading } as const
}

export const setCaret = (caret: object) => async (dispatch: React.Dispatch<any>) => {
  setTesting(setLoading, caret)
  await setCaretData(caret)
  return { type: 'set-caret',  caret } as const
}

const setTesting = (func: Function, data: any = undefined, schema: string = 'user') => {
  if(testing) console.log(schema+'.action::'+func.name, data)
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
| ActionType<typeof setCaret>
| ActionType<typeof setData>
| ActionType<typeof setisLoggedIn>