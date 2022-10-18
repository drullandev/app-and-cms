import { restCall } from '../core/axios'
//import { getMutation} from '../graphql/graphql'
//import { crud } from '../strapi/crud'

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
  
<<<<<<< HEAD
export const sendLoginForm = (data: LoginFormProps) => {

  return restCall({
    req: {
      url: 'api/auth/local',
      data: data.input,
      method: 'POST'
    },
    onSuccess: (ret: StrapiAuthProps)=>{
      //let crud('get', 'user', { id: ret.user.id })) 
      if(data.onSuccess ) return data.onSuccess(ret)

    },
    onError: (err: Error)=> {
      if(data.onError ) return data.onError(err)
    }
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
=======
export const sendLoginForm = async (formData: LoginFormProps) => {
  
  return getMutation({
    action: "login",
    data: {
      input: formData.input,
      output: {// TODO find the way to put this by type or the initiator
>>>>>>> 0197264f47f600e5156776224a2e0d254c2cce24
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
<<<<<<< HEAD
  }).data.login
  */
=======
  })

}
>>>>>>> 0197264f47f600e5156776224a2e0d254c2cce24

}