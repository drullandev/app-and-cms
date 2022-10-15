import { restCallAsync } from '../calls/apollo'
import { StrapiAuthProps } from './models/StrapiAuthProps'
import { LoginFormProps } from './models/SendStrapiAuthProps' 
import { useQuery, useMutation } from '@apollo/client'
import { gql } from 'apollo-boost'
import { restCall } from '../../classes/calls/axios'

export const sendLoginForm = async (data: LoginFormProps) => {
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
  await null*/
  const LOGIN_USER = gql`
  mutation {
    login(input: { identifier: "bunny@gmail.com", password: "Qwer1234"}) {
      jwt
    }
  }` 

  return restCall({
    req: {
      url: 'graphql',
      data: {
        variables: LOGIN_USER
      },
      method: 'POST'
    },
    onSuccess: (ret: StrapiAuthProps)=>{
      data.onSuccess(ret)
    },
    onError: (err:Error)=>{
      data.onError(err)
    }

  })


//    data.query = LOGIN_USER

}

