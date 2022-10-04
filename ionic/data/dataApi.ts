import * as Stored from '../src/static/stored'
//import { Home, Session } from '../models/Schedule'

//import { Speaker } from '../models/Speaker'
//import { Location } from '../models/Location'

import { getStorage, setStorage, removeStorage, setOrRemove } from '../src/clases/storage'
//import { restGet } from './utils/rest/rest.utils'

//----------------------------------------------------------------

export const getUserExtra = async () => {

  // Featurize more, is so simple, but comes from API now! 
  // Must come by user!!! ^^
  //const extra  = await restGet('extra').then(res=>{ return res.data })

  //const responseData  = extra.schedule  

  //const locations     = extra.locations as Location[]

  // Speakers TODO Mates!
  //const speakers      = responseData.speakers as Speaker[]
  
  // Home
  //const schedule      = responseData.schedule[0] as Home

  //const sessions      = parseSessions(schedule)  
  /*const allTracks     = sessions
    .reduce((all, session) => all.concat(session.tracks), [] as string[])
    .filter((trackName, index, array) => array.indexOf(trackName) === index)
    .sort()
*/
  return {} /*{
    schedule,
    sessions,
    locations,
    speakers,
    allTracks,
    filteredTracks: [...allTracks],
  }*/
}

export const getUserData = async () => {

  const response = await Promise.all([
    // Main data
    getStorage(Stored.USERNAME),
    getStorage(Stored.EMAIL),
    getStorage(Stored.PROVIDER),
    getStorage(Stored.CONFIRMED),
    getStorage(Stored.BLOCKED),
    getStorage(Stored.CREATED_AT),
    getStorage(Stored.UPDATED_AT),
    //getStorage(Stored.IS_LOGGED_IN),
    //getStorage(Stored.HAS_SEEN_TUTORIAL),
    //getStorage(Stored.USER_DARK_MODE),    
  ])

  const username        = response[0] || undefined
  const email           = response[1] || undefined
  const provider        = response[2] || 'local'
  const confirmed       = response[3] || false
  const blocked         = response[4] || true
  const createdAt       = response[5] || ''
  const updatedAt       = response[6] || ''
  //const isLoggedIn      = response[4] === 'true'
  //const hasSeenTutorial = response[5] === 'true'
  //const userDarkMode    = response[6] === 'false'

  return {
    username,
    email,
    provider,
    confirmed,
    blocked,
    createdAt,
    updatedAt
  /*
    isLoggedIn,
    hasSeenTutorial,
    userDarkMode,
  */
  }

}

export const setUsername = async (username?: string) => {
  setOrRemove(Stored.USERNAME, username)
}

export const setEmail = async (email?: string) => {
  setOrRemove(Stored.EMAIL, email)
}

/*
export const setIsLoggedInData = async (isLoggedIn: boolean) => {
  setStorage(Stored.IS_LOGGED_IN, isLoggedIn)
}

export const setLoading = async (loading: boolean) => {
  setStorage(Stored.IS_LOADING, loading)
}

export const setHasSeenTutorialData = async (hasSeenTutorial: boolean) => {
  setStorage(Stored.HAS_SEEN_TUTORIAL, hasSeenTutorial)
}

export const setUserJwtData = async (userJwt?: string) => {
  setOrRemove(Stored.USERJWT, userJwt)
}

export const setUserIdData = async (userId?: string) => {
  setOrRemove(Stored.USERID, userId)
}
*/