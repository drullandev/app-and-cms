import { Plugins } from '@capacitor/core'
import { Schedule, Session } from '../models/Schedule'
const { Storage } = Plugins

export const parseSessions = (schedule: Schedule)=>{
  const sessions: Session[] = []
  schedule.groups.forEach( g => g.sessions.forEach(s => sessions.push(s)) )
  return sessions
}

export const setOrRemove = async (key: string, value: any, string: boolean = true) => {
  //console.log('dataApi::setOrRemove', {key: key, value: value, string: string})
  return (!value)
    ? await Storage.remove({ key: key })
    : await Storage.set({ key: key, value: string ? value : JSON.stringify(value) })
}

export const boolSwitch = async (key: string, value: any) => {
  await Storage.set({ key: key, value: value })
}
