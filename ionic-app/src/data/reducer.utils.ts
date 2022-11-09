import { Plugins } from '@capacitor/core'
import { Schedule, Session } from '../models/Schedule'
const { Storage } = Plugins

let testingReducer = false
let testing = testingReducer && process.env.REACT_APP_TESTING

export const parseSessions = (schedule: Schedule)=>{
  const sessions: Session[] = []
  schedule.groups.forEach( g => g.sessions.forEach(s => sessions.push(s)) )
  return sessions
}

export const setOrRemove = async (key: string, value: any, string: boolean = true) => {
  if(testing) console.log('dataApi::setOrRemove', {key: key, value: value, string: string})
  return (!value)
    ? await Storage.remove({ key: key })
    : await Storage.set({ key: key, value: string ? value : JSON.stringify(value) })
}

export const toogleBool = async (key: string, value: any, def: boolean = true) => {
  if(testing) console.log('dataApi::toogleBool', {key: key, value: value, def: def})
  await Storage.set({ key: key, value: (typeof value === 'boolean' ? value.toString() : def.toString() ) })
}
