import { AxiosRequestConfig } from 'axios'
import { restCall, restCallAsync } from './axios'

export interface CallProps {
  req: AxiosRequestConfig,
  onSuccess?: Function
  onError?: Function
  onFinally?: Function
}

export const setCall = (call: string): CallProps => {
  return {
    req: {
      method: 'POST',
      url: 'graphql',
      data: {
        query: `${call}`
      }      
    }
  }
}

export const graphqlCall = (call: string): any => restCall(setCall(call))

export const graphqlCallAsync = async (call: string) => await restCallAsync(setCall(call))