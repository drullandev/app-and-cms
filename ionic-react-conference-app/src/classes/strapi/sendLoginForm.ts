import {
  //setQuery,
  setMutation,
  getMutation
} from '../graphql/graphql'
//import { GeolocationPluginWeb } from '@capacitor/core'
//import { sad, star } from 'ionicons/icons'
//import { initialUser } from '../../data/state'

export interface LoginFormProps  {
  input: {
    identifier: string
    password: string
  }
  onSuccess?: Function
  onError?: Function
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
  
export const sendLoginForm = async (formData: LoginFormProps) => {

  console.log('param', formData)

  let login = {
    action: "login",
    data: {
      input: formData.input,
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
  }

  

  console.log(getMutation(login))

  /*await restCallAsync({
    req: {
      url: 'api/auth/local',
      data: data.data,
      method: 'post'
    },
    onSuccess: (ret: StrapiAuthProps)=>{
      data.onSuccess(ret)
    },
    onError: (err: Error)=> {
      data.onError(err)
    }
  })
  await null
  const LOGIN_USER = gql`
  mutation {
    login(input: { identifier: "bunny@gmail.com", password: "Qwer1234"}) {
      jwt
    }
  }` 

  return restCall({
    req: {
      url: 'graphql',
      data:  LOGIN_USER,
      method: 'POST'
    },
    onSuccess: (ret: StrapiAuthProps)=>{
      data.onSuccess(ret)
    },
    onError: (err:Error)=>{
      data.onError(err)
    }

  })
*/


//    data.query = LOGIN_USER

}

