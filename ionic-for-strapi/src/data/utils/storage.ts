import { Plugins } from '@capacitor/core'
const { Storage } = Plugins

export const setStorage = async (key: string, value:any) => {
    var json = getType(value) === 'object'
    var res = json ? JSON.stringify(value) : value
    await Storage.set({ key : key, value : res })
}
  
export const getStorage = async (key: string) => {
  const { value } = await Storage.get({ key: key })
  var json = getType(value) === 'object'
  return value ? ( json ? JSON.parse(value) : value ) : false
}
  
export const removeStorage = async (key: string) => {
    await Storage.remove({ key : key })
}

export const switchStorage = async (key: string, value: any) => {
  if (value) {
    await setStorage(key, value)
  } else {
    await removeStorage(key)
  }  
}

function getType(p:any) {
  if (Array.isArray(p)) return 'array'
  else if (typeof p == 'string') return 'string'
  else if (p != null && typeof p == 'object') return 'object'
  else return 'other'
}