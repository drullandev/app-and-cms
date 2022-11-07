import * as AppConst from '../../../data/static/constants'

import {
  setisLoggedIn,
  setUsername,
  //setUserEmail,
  setJwt,
  //setUserId,
  logoutUser
} from '../../user/user.actions'

import axios from 'axios'

export const set = async (action:string, form:React.FormEvent, func:Function)=>{//}, history:any) => {
  console.log('action', action)
  func(true)
  switch(action){
    //case 'login':   return login(form)//, history)
    //case 'signup':  return signup(form)//, history)
    case 'recover': return recover(form)//, history)
    default:
      return {
        type: 'toast',
        params: {
          message: "This action don't exist",
          duration: 3000
        }
      }  
    break;
  }
}

function recover(form: any){

  if( typeof form.email === 'undefined' ) return

  const promise = axios.post(AppConst.RestAPI+'/auth/forgot-password', form)
  const dataPromise = promise.then((res:any) => {    

    return {
      history: {
        push: AppConst.HOME,
        params: {
          direction: 'none'
        }
      }
    }

  })
  .catch((err:any) => {

    return {
      error: {
        type: 'toast',//Home
        params: {
          message: err.response.data.message[0].messages[0].message,
        }
      }
    }

  })
  return dataPromise

}