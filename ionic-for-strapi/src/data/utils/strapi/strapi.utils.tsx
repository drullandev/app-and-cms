/*import * as AppConst from '../../../static/constants'

import {
  setIsLoggedIn,
  setNickname,
  setUserEmail,
  setUserJwt,
  setUserId,
  logoutUser
} from '../../user/user.actions'

import axios from 'axios'

export const set = async (action: string, form: React.FormEvent) => {//}, history:any) => {
  switch (action) {
    case 'login': return login(form)//, history)
    case 'signup': return signup(form)//, history)
    case 'recover': return recover(form)//, history)
    default: break
  }
}

function login(form: any) {//}, history: any){

  console.log('Launch Login form ;);)', form)

  if (typeof form.identifier === 'undefined') return
  if (typeof form.password === 'undefined') return
  if (typeof form.terms === 'undefined') return
  if (typeof form.policy === 'undefined') return

  const promise = axios.post(AppConst.RestAPI + '/auth/local', form)
  const dataPromise = promise.then((res: any) => {

    if (res.status === 200) {

      console.log('Login Call Result!!', res.data)

      var userData = res.data.user
      if (userData.confirmed && !userData.blocked) {

        setIsLoggedIn(true)

        setUserJwt(res.data.jwt)

        setUserEmail(userData.mail)
        setNickname(userData.nickname)
        setUserId(userData.id)

        return {
          history: {
            push: '/tabs/schedule',//TODO: Set home param!!
            params: {
              direction: 'none'
            }
          }
        }

      } else {

        return {
          error: {
            type: 'toast',//TODO: Set home param!!
            params: {
              message: 'Strange rror login!??'
            }
          }
        }

      }

    } else {

      return {
        error: {
          type: 'toast',//TODO: Set home param!!
          params: {
            message: 'Strange rror login!??'
          }
        }
      }

    }

  })
    .catch((err: any) => {
      logoutUser()
      return {
        error: {
          type: 'toast',
          params: {
            message: err.response.data.message[0].messages[0].message,
          }
        }
      }
    })

  return dataPromise

}

function signup(form: any) {//}, history: any){
  if (typeof form.identifier === 'undefined') return
  if (typeof form.password === 'undefined') return
  if (typeof form.terms === 'undefined') return
  if (typeof form.policy === 'undefined') return
  const promise = axios.post(AppConst.RestAPI + '/auth/local', form)
  const dataPromise = promise.then((res: any) => {
    return {
      history: {
        push: '/tabs/schedule',
        params: {
          direction: 'none'
        }
      }
    }
  })
    .catch((err: any) => {
      return {
        error: {
          toast: {
            message: err.response.data.message[0].messages[0].message,
          }
        }
      }
    })
  return dataPromise
}

function recover(form: any) {//}, history: any){
  const promise = axios.post(AppConst.RestAPI + '/auth/local', form)
  const dataPromise = promise.then((res: any) => {
    return {
      history: {
        push: '/tabs/schedule',
        params: {
          direction: 'none'
        }
      }
    }
  })
    .catch((err: any) => {
      return {
        error: {
          toast: {
            message: err.response.data.message[0].messages[0].message,
          }
        }
      }
    })
  return dataPromise
}*/