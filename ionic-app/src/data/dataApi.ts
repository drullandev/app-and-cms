import { Plugins } from '@capacitor/core'
import { Schedule, Session } from '../models/Schedule'
import { Speaker } from '../models/Speaker'
import { Location } from '../models/Location'
import { setOrRemove, parseSessions, toogleBool } from './reducer.utils'
import { UserState } from './user/user.state'
import { initialUser } from './state'
const { Storage } = Plugins

const dataUrl = '/assets/data/data.json'
const locationsUrl = '/assets/data/locations.json'

const ID = 'id'
const JWT = 'jwt'
const USERNAME = 'username'
const EMAIL = 'email'
const BLOCKED = 'blocked'
const CONFIRMED = 'confirmed'
const CREATED_AT = 'createdAt'
const UPDATED_AT = 'updatedAt'
const PROVIDER = 'provider'
const DARK_MODE = 'darkMode'
const HAS_SEEN_TUTORIAL = 'hasSeenTutorial'
const HAS_LOGGED_IN = 'hasLoggedIn'
const CARET = 'caret'
const ROLE = 'role'

export const getConfData = async () => {

  const response = await Promise.all([
    fetch(dataUrl),
    fetch(locationsUrl)])

  const responseData = await response[0].json()
  const schedule = responseData.schedule[0] as Schedule
  const sessions = parseSessions(schedule)
  const speakers = responseData.speakers as Speaker[]
  const locations = await response[1].json() as Location[]

  const allTracks = sessions
    .reduce((all, session) => all.concat(session.tracks), [] as string[])
    .filter((trackName, index, array) => array.indexOf(trackName) === index)
    .sort()

  const data = {
    schedule,
    sessions,
    locations,
    speakers,
    allTracks,
    filteredTracks: [...allTracks]
  }

  return data

}

export const getUserData = async () => {

  const response = await Promise.all([
    Storage.get({ key: ID }),
    Storage.get({ key: JWT }),
    Storage.get({ key: USERNAME }),
    Storage.get({ key: EMAIL }),
    Storage.get({ key: BLOCKED }),
    Storage.get({ key: CONFIRMED }),
    Storage.get({ key: CREATED_AT }),
    Storage.get({ key: UPDATED_AT }),
    Storage.get({ key: PROVIDER }),
    Storage.get({ key: DARK_MODE }),
    Storage.get({ key: HAS_SEEN_TUTORIAL }),
    Storage.get({ key: HAS_LOGGED_IN }),
    Storage.get({ key: CARET }),
    Storage.get({ key: ROLE }),
  ])

  const id          = response[0].value || '0'
  const jwt         = response[1].value || undefined
  const username    = response[2].value || undefined
  const email       = response[3].value || undefined
  const blocked     = response[4].value === 'true'
  const confirmed   = response[5].value === 'true'
  const created_at  = response[6].value || undefined
  const updated_at  = response[7].value || undefined
  const provider    = response[8].value || undefined
  const darkMode    = response[9].value  === 'true'
  const hasSeenTutorial = response[10].value === 'true'
  const isLoggedIn      = response[11].value === 'true'
  const caret       = response[12].value === undefined
  const role        = response[13].value === undefined

  return {
    id,
    jwt,
    username,
    email,
    blocked,
    confirmed,
    created_at,
    updated_at,
    provider,    
    darkMode,
    hasSeenTutorial,
    isLoggedIn,
    caret,
    role
  }

}

// BASIC
export const setIdData = async (id2?: string) => setOrRemove(ID, id2, false)
export const setJwtData = async (jwt?: string) => setOrRemove(JWT, jwt)
export const setUsernameData = async (username?: string) => setOrRemove(USERNAME, username)
export const setEmailData = async (email?: string) => setOrRemove(EMAIL, email)
export const setBlockedData = async (blocked?: boolean) => toogleBool(BLOCKED, blocked, initialUser.blocked)
export const setConfirmedData = async (confirmed?: boolean) => toogleBool(CONFIRMED, confirmed, initialUser.confirmed)
export const setCreatedAtData = async (createdAt?: string) => setOrRemove(CREATED_AT, createdAt)
export const setUpdatedAtData = async (updatedAt?: string) => setOrRemove(UPDATED_AT, updatedAt)
export const setProviderData = async (provider2?: string) => setOrRemove(UPDATED_AT, provider2)
export const setDarkModeData = async (darkMode?: boolean) => toogleBool(DARK_MODE, darkMode, initialUser.darkMode)
export const setHasSeenTutorialData = async (hasSeenTutorial?: boolean) => toogleBool(HAS_SEEN_TUTORIAL, hasSeenTutorial, initialUser.hasSeenTutorial)
export const setisLoggedInData = async (isLoggedIn?: boolean) => toogleBool(HAS_LOGGED_IN, isLoggedIn, initialUser.isLoggedIn)
export const setCaretData = async (caret?: object) => setOrRemove(CARET, caret, true)
export const setRoleData = async (role?: object) => setOrRemove(ROLE, role, true)

// EXTRA
export const setUserData = async (data: Partial<UserState>) => {
  setIdData(data.id)
  setJwtData(data.jwt)
  setUsernameData(data.username)
  setEmailData(data.email)
  setBlockedData(data.blocked)
  setConfirmedData(data.confirmed)
  setCreatedAtData(data.createdAt)
  setUpdatedAtData(data.updatedAt)
  setProviderData(data.provider)
  setDarkModeData(data.darkMode)
  setHasSeenTutorialData(data.hasSeenTutorial)
  setisLoggedInData(data.isLoggedIn)
  setCaretData(data.caret)
  setRoleData(data.role)
}