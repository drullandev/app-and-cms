import * as AppConst from '../../../static/constants'

import {
  setIsLoggedIn,
  setNickname,
  setUserEmail,
  setUserJwt,
  setUserId,
  logoutUser
} from '../../user/user.actions'

import axios from 'axios'

export const set = async (action:string, form:React.FormEvent, func:Function)=>{//}, history:any) => {
  console.log('action', action)
  func(true)
  switch(action){
    case 'login':   return login(form)//, history)
    case 'signup':  return signup(form)//, history)
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

const login = async (form: any) => {//}, history: any){
  
  console.log('doing login...', form)
  //if(typeof form.identifier === 'undefined') return
  //if(typeof form.password === 'undefined') return
  //if(form.terms !== 'on') return
  //if(form.policy !== 'on') return

  return await axios.post(AppConst.RestAPI+'/auth/local', {
    identifier: form.identifier,
    password: form.password
  }).then((res:any) => {  

    if(res.status === 200){

      setIsLoggedIn(true)
      setUserEmail(res.data.user.mail)
      setNickname(res.data.user.nickname)
      setUserJwt(res.data.jwt)
      setUserId(res.data.user.id)

      return {
        type: 'history',
        params: {
          push: AppConst.HOME,
          direction: 'none'
        }
      }

    }else{

      logoutUser()

      return {
        type: 'toast',
        params: {
          message: res.data.message[0].messages[0].message,
          duration: 3000
        }
      }

    }   

  })
  .catch((err:any) => {

    return {
      type: 'toast',//Home
      params: {
        message: err.response.data.message[0].messages[0].message,
        duration: 3000
      }
    }

  })

}

const signup = async (form: any) => {

  var data = {
    username: form.identifier,
    password: form.password,
    email: form.email
  }

  return await axios.post(AppConst.RestAPI+'/auth/local/register', data)
  .then((res:any) => {    

    return {
      type: 'history',
      params: {
        push: '/account',
        direction: 'none'
      }
    }

  })
  .catch((err:any) => {

    return {
      type: 'toast',
      params: {
        message: err.response.data.message[0].messages[0].message,
        duration: 3000
      }
    }
    
  })

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