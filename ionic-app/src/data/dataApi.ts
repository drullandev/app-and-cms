import { Plugins } from '@capacitor/core'
import { Schedule, 
  //Session
} from '../models/Schedule'
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
  ])

  const id          = await response[0].value || '0'
  const jwt         = await response[1].value || undefined
  const username    = await response[2].value || undefined
  const email       = await response[3].value || undefined
  const blocked     = await response[4].value === 'true'
  const confirmed   = await response[5].value === 'true'
  const created_at  = await response[6].value || undefined
  const updated_at  = await response[7].value || undefined
  const provider    = await response[8].value || undefined
  const darkMode    = await response[9].value  === 'true'
  const hasSeenTutorial = await response[11].value === 'true'

  const isLoggedin      = await response[10].value === 'true'

  const data = {
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
    isLoggedin,
  }

  return data

}

// BASIC
export const setIdData = async (id2?: string) => setOrRemove(ID, id2, false)
export const setJwtData = async (jwt?: string) => setOrRemove(JWT, jwt)
export const setUsernameData = async (username?: string) => setOrRemove(USERNAME, username)
export const setEmailData = async (email?: string) => setOrRemove(EMAIL, email)
export const setBlockedData = async (blocked?: boolean) => toogleBool(BLOCKED, blocked)
export const setConfirmedData = async (confirmed?: boolean) => toogleBool(CONFIRMED, confirmed)
export const setCreatedAtData = async (createdAt?: string) => setOrRemove(CREATED_AT, createdAt)
export const setUpdatedAtData = async (updatedAt?: string) => setOrRemove(UPDATED_AT, updatedAt)
export const setProviderData = async (provider2?: string) => setOrRemove(UPDATED_AT, provider2)
export const setDarkModeData = async (darkMode?: boolean) => toogleBool(DARK_MODE, darkMode)
export const setHasSeenTutorialData = async (hasSeenTutorial?: boolean) => toogleBool(HAS_SEEN_TUTORIAL, hasSeenTutorial)
export const setIsLoggedInData = async (isLoggedIn?: boolean) => toogleBool(HAS_LOGGED_IN, isLoggedIn)

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
  setDarkModeData(data.darkMode !== null ? data.darkMode : initialUser.darkMode)
  setHasSeenTutorialData(data.hasSeenTutorial)
  //setIsLoggedInData//XXX no!
}