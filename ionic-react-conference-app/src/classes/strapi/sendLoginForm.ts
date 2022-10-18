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
  
  return getMutation({
    action: "login",
    data: {
      input: formData.input,
      output: {// TODO find the way to put this by type or the initiator
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
  })

}

