/**
 For more references, take a look on the docs about Preferences api
 https://capacitorjs.com/docs/apis/preferences
*/

import { Preferences } from '@capacitor/preferences';
import { getType } from './utils'

export const setStorage = async (key: string, value:any) => {
    var json = getType(value) === 'object'
    var res = json ? JSON.stringify(value) : value
    await Preferences.set({ key : key, value : res })
}
  
export const getStorage = async (key: string) => {
  const { value } = await Preferences.get({ key: key })
  var json = getType(value) === 'object'
  return value ? ( json ? JSON.parse(value) : value ) : false
}
  
export const removeStorage = async (key: string) => {
  await Preferences.remove({ key : key })
}

export const switchStorage = async (key: string, value: any) => {
  if (value) {
    await setStorage(key, value)
  } else {
    await removeStorage(key)
  }  
}
