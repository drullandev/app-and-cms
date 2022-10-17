import { useQuery, useMutation } from '@apollo/client'
import axios, { AxiosRequestConfig } from 'axios'
import { restCall, restCallAsync } from './axios'
import { gql } from 'apollo-boost'

export interface CallProps {
  req: AxiosRequestConfig,
  onSuccess?: Function
  onError?: Function
  onFinally?: Function
}

export const graphqlCall = (call: string): any => {
  return restCall({
    req: {
      method: 'POST',
      url: 'graphql',
      data: { query: `${call}` }      
    }
  })
}

export const graphqlCallAsync = async (call: string) => {
  return await restCallAsync({
    req: {
      method: 'POST',
      url: 'graphql',
      data: gql`${call}`      
    }
  })
}