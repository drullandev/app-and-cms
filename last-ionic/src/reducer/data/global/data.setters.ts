import { UserState } from '../user/user.state';
import { setOrRemove, parseSessions } from '../../../classes/data.utils'
import { initialUser } from '../../state'

import { BLOCKED, CARET, CONFIRMED, CREATED_AT, DARK_MODE, EMAIL, HAS_LOGGED_IN, HAS_SEEN_TUTORIAL, ID, JWT, ROLE, UPDATED_AT, USERNAME, SESSION_ID } from '../../constants';

// SEPARATED
export const setIdData = async (id2?: string) => setOrRemove(ID, id2, initialUser.id)
export const setJwtData = async (jwt?: string) => setOrRemove(JWT, jwt, initialUser.jwt)
export const setSessionIdData = async (sessionId?: string) => setOrRemove(SESSION_ID, sessionId, initialUser.sessionId)
export const setUsernameData = async (username?: string) => setOrRemove(USERNAME, username, initialUser.username)
export const setEmailData = async (email?: string) => setOrRemove(EMAIL, email, initialUser.email)
export const setBlockedData = async (blocked?: boolean) => setOrRemove(BLOCKED, blocked, initialUser.blocked)
export const setConfirmedData = async (confirmed?: boolean) => setOrRemove(CONFIRMED, confirmed, initialUser.confirmed)
export const setCreatedAtData = async (createdAt?: string) => setOrRemove(CREATED_AT, createdAt, initialUser.createdAt)
export const setUpdatedAtData = async (updatedAt?: string) => setOrRemove(UPDATED_AT, updatedAt, initialUser.updatedAt)
export const setProviderData = async (provider2?: string) => setOrRemove(UPDATED_AT, provider2, initialUser.provider)// Was provider2 because provider was reservated! o.o!
export const setDarkModeData = async (darkMode?: boolean) => setOrRemove(DARK_MODE, darkMode, initialUser.darkMode)
export const setHasSeenTutorialData = async (hasSeenTutorial?: boolean) => setOrRemove(HAS_SEEN_TUTORIAL, hasSeenTutorial, initialUser.hasSeenTutorial)
export const setisLoggedData = async (isLoggedIn?: boolean) => setOrRemove(HAS_LOGGED_IN, isLoggedIn, initialUser.isLoggedIn)
export const setCaretData = async (caret?: object) => setOrRemove(CARET, caret, initialUser.caret)
export const setRoleData = async (role?: object) => setOrRemove(ROLE, role, initialUser.role)

// TOGETHER
export const setUserData = async (data: Partial<UserState>) => {
  setIdData(data.id)
  setJwtData(data.jwt)
  setSessionIdData(data.jwt)
  setUsernameData(data.username)
  setEmailData(data.email)
  setBlockedData(data.blocked)
  setConfirmedData(data.confirmed)
  setCreatedAtData(data.createdAt)
  setUpdatedAtData(data.updatedAt)
  setProviderData(data.provider)
  setDarkModeData(data.darkMode)
  setHasSeenTutorialData(data.hasSeenTutorial)
  setisLoggedData(data.isLoggedIn)
  setCaretData(data.caret)
  setRoleData(data.role)
}