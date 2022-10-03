import * as Stored from '../static/stored'
import { Home, Session } from '../models/Schedule'

//import { Speaker } from '../models/Speaker'
//import { Location } from '../models/Location'

import { getStorage, setStorage, removeStorage } from '../clases/storage'
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

export const getApiValue = async (key:string) => {
  const response = await Promise.all([
    getStorage(key),
  ])
  const value = response[0]
  return value
}

export const getUserData = async () => {

  /*{
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY0NTY4NjA1LCJleHAiOjE2NjcxNjA2MDV9.lAUwTwd7HlG1i5gF7fQbjRnqsz6vzggUCPrFjx-OqpI",
    "user": {
        "id": 1,
        "username": "White Bunny",
        "email": "bunny@gmail.com",
        "provider": "local",
        "confirmed": true,
        "blocked": false,
        "createdAt": "2022-09-30T20:02:59.863Z",
        "updatedAt": "2022-09-30T20:02:59.863Z"
    }
  }*/
  
  const response = await Promise.all([
    //
    getStorage(Stored.USERNAME),
    getStorage(Stored.EMAIL),
    getStorage(Stored.PROVIDER),
    getStorage(Stored.CONFIRMED),
    getStorage(Stored.BLOCKED),
    
    //getStorage(Stored.IS_LOGGED_IN),
    //getStorage(Stored.HAS_SEEN_TUTORIAL),
    //getStorage(Stored.USER_DARK_MODE),    
  ])

  //
  const username        = response[0] || undefined
  const email           = response[1] || undefined
  const provider        = response[2] || undefined
  const confirmed       = response[3] || undefined
  const blocked         = response[4] || undefined
  //
  //const isLoggedIn      = response[4] === 'true'
  //const hasSeenTutorial = response[5] === 'true'
  //const userDarkMode    = response[6] === 'false'

  return {
    username,
    email,
    provider,
    confirmed
  }/* {
    nickname,
    useremail,
    userJwt,
    userId,
    isLoggedIn,
    hasSeenTutorial,
    userDarkMode,
  }*/

}

/*function parseSessions(schedule: Home) {
  const sessions: Session[] = []
  schedule.groups.forEach((g) => {
    g.sessions.forEach((s) => sessions.push(s))
  })
  return sessions
}*/

export const setUsername = async (username?: string) => {
  setOrRemove(Stored.USERNAME, username)
}

export const setEmailData = async (email?: string) => {
  setOrRemove(Stored.EMAIL, email)
}

/*
export const setIsLoggedInData = async (isLoggedIn: boolean) => {
  setStorage(Stored.IS_LOGGED_IN, isLoggedIn)
}

export const setLoading = async (loading: boolean) => {
  setStorage(Stored.IS_LOADING, loading)
}

/*export const setHasSeenTutorialData = async (hasSeenTutorial: boolean) => {
  setStorage(Stored.HAS_SEEN_TUTORIAL, hasSeenTutorial)
}*/

export const setUserJwtData = async (userJwt?: string) => {
  setOrRemove(Stored.USERJWT, userJwt)
}

export const setUserIdData = async (userId?: string) => {
  setOrRemove(Stored.USERID, userId)
}
*/

export const setOrRemove = async (key: string, value: any = null)=>{
  return (value)
    ? setStorage(key, value)
    : removeStorage(key)
}