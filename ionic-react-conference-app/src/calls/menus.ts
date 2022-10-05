/**
 For more references, take a look on the docs about Preferences api
 https://capacitorjs.com/docs/apis/preferences
*/
import {restCall} from './axios'

export const getMenuById = (id: number, onSuccess: Function, onError: Function) => {
  return restCall({
    req: {
      url: 'menus/'+id
    },
    onSuccess: (ret: any)=>{
      console.log(' Getting the menu '+id, ret)
      return onSuccess()
    },
    onError: (err: Error)=>{
      return onError(err)
    }
  })
}