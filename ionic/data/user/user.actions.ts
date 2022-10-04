import {
  getUserData,
  //setIsLoggedInData,
  //setNicknameData,
  //setUserEmailData,
  //setHasSeenTutorialData
} from '../dataApi'

//import { setStorage } from '../app/storage'

import { ActionType } from '../../src/util/types'
import { UserState } from './user.state'



export const serUserData = () => async (dispatch: React.Dispatch<any>) => {
  //dispatch(setLoading(true))
  const data = await getUserData()
  dispatch(setData(data))
  //dispatch(setLoading(false))
}

export const setData = (user: any) => {
  return { type: 'set-user-data', user } as const
}

/*
export const setJwt = (jwt?: string) => {
  return { type: 'set-jwt', jwt } as const
}

export const setHasSeenTutorial = (hasSeenTutorial: boolean) => {
  setHasSeenTutorialData(hasSeenTutorial)
  return { type: 'set-has-seen-tutorial', hasSeenTutorial } as const
}

export const logoutUser = () => async (dispatch: React.Dispatch<any>) => {
  await setIsLoggedInData(false)
  dispatch(setIsLoggedIn(true))
  dispatch(setNickname())
  dispatch(setUserEmail())
  dispatch(setUserJwt())
  dispatch(setUserId())
}

export const setIsLoggedIn = (loggedIn: boolean) => async ( dispatch: React.Dispatch<any> ) => {
  await setIsLoggedInData(loggedIn)
  return { type: 'set-is-loggedin', loggedIn } as const
}

*/
  /*
  {
    'jwt': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsImlhdCI6MTYzNTExMTM0MCwiZXhwIjoxNjM3NzAzMzQwfQ.Z9hoSs-EgQV4IXDn_KhppRaDIeKD4PFtAlX6TaUzP-M',
    'user': {
        'id': 21,
        'username': 'qy4tw098er',
        'email': '87079yui.0v@gmail.com',
        'provider': 'local',
        'confirmed': true,
        'blocked': null,
        'role': {
            'id': 1,
            'name': 'Subscribed',
            'description': 'Default role given to authenticated user.',
            'type': 'authenticated',
            'path': 16
        },
        'created_at': '2021-10-24T21:35:41.000Z',
        'updated_at': '2021-10-24T21:35:41.000Z',
        'hasSeenTutorial': null,
        'userDarkMode': null,
        'acceptedTerms': null,
        'acceptedPrivacyPolicy': null,
        'avatar': null
    }
  }
  */
/*
export const setUserEmail = (email?: string) => async (
  dispatch: React.Dispatch<any>
) => {
  await setUserEmailData(email)
  return { type: 'set-user-email', email } as const
}

export const setNickname = (nickname?: string) => async (
  dispatch: React.Dispatch<any>
) => {
  await setNicknameData(nickname)
  return { type: 'set-nickname', nickname } as const
}

export const setLoading = (loading: boolean) =>  {
  return { type: 'set-user-loading', loading } as const
}

export const setDarkMode = (userDarkMode: boolean) => {
  return { type: 'set-user-darkmode', userDarkMode } as const
}

export const setUserId = (userId?: number) => {
  return { type: 'set-user-id', userId } as const
}

export const setUserAvatar = (avatar: any) => {
  return { type: 'set-user-avatar', avatar } as const
}

*/

export type UserActions = null
  | ActionType<typeof serUserData>
  /*| ActionType<typeof setIsLoggedIn>
  | ActionType<typeof setUserEmail>
  | ActionType<typeof setNickname>
  //| ActionType<typeof setHasSeenTutorial>
  | ActionType<typeof setLoading>
  | ActionType<typeof setDarkMode>
  | ActionType<typeof setUserJwt>
  | ActionType<typeof setUserId>
  | ActionType<typeof setUserAvatar>*/