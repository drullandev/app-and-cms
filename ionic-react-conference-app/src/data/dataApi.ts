import { Plugins } from '@capacitor/core'
import { Schedule, Session } from '../models/Schedule'
import { Speaker } from '../models/Speaker'
import { Location } from '../models/Location'

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

const HAS_LOGGED_IN = 'hasLoggedIn'
const HAS_SEEN_TUTORIAL = 'hasSeenTutorial'

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
    Storage.get({ key: HAS_LOGGED_IN }),
    Storage.get({ key: HAS_SEEN_TUTORIAL }),
  ])

  const id          = await response[0].value || '0'
  const jwt         = await response[1].value || undefined
  const username    = await response[2].value || undefined
  const blocked     = await response[3].value === 'true'
  const confirmed   = await response[4].value === 'true'
  const created_at  = await response[5].value || undefined
  const updated_at  = await response[6].value || undefined
  const email       = await response[7].value || undefined
  const provider    = await response[8].value || undefined
  const darkMode    = await response[9].value  === 'true'

  const isLoggedin      = await response[10].value === 'true'
  const hasSeenTutorial = await response[11].value === 'true'

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
    isLoggedin,
    hasSeenTutorial,
  }

  return data

}

export const setIdData = async (id2?: string) => {
  if (!id2) {
    await Storage.remove({ key: ID })
  } else {
    await Storage.set({ key: ID, value: JSON.stringify(id2) })
  }
}

export const setJwtData = async (jwt?: string) => {
  if (!jwt) {
    await Storage.remove({ key: JWT })
  } else {
    await Storage.set({ key: JWT, value: jwt })
  }
}

export const setUsernameData = async (username?: string) => {
  if (!username) {
    await Storage.remove({ key: USERNAME })
  } else {
    await Storage.set({ key: USERNAME, value: username })
  }
}

export const setEmailData = async (email?: string) => {
  if (!email) {
    await Storage.remove({ key: EMAIL })
  } else {
    await Storage.set({ key: EMAIL, value: email })
  }
}

export const setBlockedData = async (blocked?: boolean) => {
  if (!blocked) {
    await Storage.remove({ key: BLOCKED })
  } else {
    await Storage.set({ key: BLOCKED, value: JSON.stringify(blocked) })
  }
}

export const setConfirmedData = async (confirmed?: boolean) => {
  if (!confirmed) {
    await Storage.remove({ key: CONFIRMED })
  } else {
    await Storage.set({ key: CONFIRMED, value: JSON.stringify(confirmed) })
  }
}

export const setCreatedAtData = async (createdAt?: string) => {
  if (!createdAt) {
    await Storage.remove({ key: CREATED_AT })
  } else {
    await Storage.set({ key: CREATED_AT, value: createdAt })
  }
}

export const setUpdatedAtData = async (updatedAt?: string) => {
  if (!updatedAt) {
    await Storage.remove({ key: UPDATED_AT })
  } else {
    await Storage.set({ key: UPDATED_AT, value: updatedAt })
  }
}

export const setProviderData = async (provider2?: string) => {
  if (!provider2) {
    await Storage.remove({ key: PROVIDER })
  } else {
    await Storage.set({ key: PROVIDER, value: provider2 })
  }
}

export const setDarkModeData = async (darkMode?: boolean) => {
  if (!darkMode) {
    await Storage.remove({ key: DARK_MODE })
  } else {
    await Storage.set({ key: DARK_MODE, value: JSON.stringify(darkMode) })
  }
}


// Extra ??

export const setIsLoggedInData = async (isLoggedIn: boolean) => {
  await Storage.set({ key: HAS_LOGGED_IN, value: JSON.stringify(isLoggedIn) })
}

export const setHasSeenTutorialData = async (hasSeenTutorial: boolean) => {
  await Storage.set({ key: HAS_SEEN_TUTORIAL, value: JSON.stringify(hasSeenTutorial) })
}


export const parseSessions = (schedule: Schedule)=>{
  const sessions: Session[] = []
  schedule.groups.forEach(g => {
    g.sessions.forEach(s => sessions.push(s))
  })
  return sessions
}
