import { Schedule, Session } from '../interfaces/Schedule'
import { Preferences } from '@capacitor/preferences';

let testingReducer = false
let testing = testingReducer && import.meta.env.REACT_APP_TESTING

export const parseSessions = (schedule: Schedule)=>{
  const sessions: Session[] = []
  schedule.groups.forEach( g => g.sessions.forEach(s => sessions.push(s)) )
  return sessions
}

export const setOrRemove = async (key: string, value: any, def: any, string: boolean = true) => {
  if(testing) console.log('dataApi::setOrRemove', {key: key, value: value, string: string})
  return (!value)
    ? await Preferences.remove({ key: key })
    : await Preferences.set({ key: key, value: string ? value : value.toString() })
}

export const toogleBool = async (key: string, value: any, def: boolean = true) => {
  if(testing) console.log('dataApi::toogleBool', {key: key, value: value, def: def})
  await Preferences.set({ key: key, value: (typeof value === 'boolean' ? value.toString() : def.toString() ) })
}
