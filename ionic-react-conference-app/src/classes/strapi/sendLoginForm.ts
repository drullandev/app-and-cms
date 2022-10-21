import {
  restCall,
  restCallAsync
} from '../core/axios'

export interface LoginFormProps  {
  input: {
    identifier: string
    password: string
  }
  onSuccess: Function
  onError: Function
}

export interface StrapiAuthProps {
  user: {
    id?: string
    username?: string
    email?: string
    blocked?: boolean
    confirmed?: boolean
    createdAt?: string
    updatedAt?: string
    provider?: string
    darkMode?: boolean
  },
  jwt?: string
}

let testing = true && process.env.REACT_APP_TESTING
  
export const sendLoginForm = (data: LoginFormProps) => {
  return restCall({
    req: {
      url: 'api/auth/local',
      data: data.input,
      method: 'POST'
    },
    onSuccess: data.onSuccess,
    onError: data.onError
  })

  // XXX GrahpQL: Was nice to prepare this hability, the way I can generate mutations 
  // with few data in my own way... But finally, I skip to API for all the common, 
  // less for the basic listing
  /*
  return await getMutation({
    action: "login",
    data: {
      input: data.input,
      output: {//TODO find the way to put this as type :P initiator
        user: {
          id: 'string',
          username: 'string',
          email: 'string',
          blocked: true,
          confirmed: true,
        },
        jwt: 'string'
      } as StrapiAuthProps
    }
  }).data.login
  */

}