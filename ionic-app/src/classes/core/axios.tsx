import axios, { AxiosRequestConfig } from 'axios'
import { output } from '../strapi/CommonOperations'
import * as icon from 'ionicons/icons'

export interface CallProps {
  req: AxiosRequestConfig,
  onSuccess: {
    default: any
  }
  onError: {
    default: any
  }
  onFinally?: Function
}

interface ErrorDesignProps {
  duration?: number
  icon?: any
  color?: string
}

const common = (call:any) => {
  if (call.req.method === null) call.req.method = 'get'
  call.req.url = (call.req.url) ? process.env.REACT_APP_HOST+call.req.url : undefined
  return call
}

export const restCallAsync = async (call: CallProps) => {
  return setCall(common(call))
}

export const restCall = (call: CallProps) => {
  return setCall(common(call))
}

const setCall = (call: CallProps, errorDesign?: ErrorDesignProps) =>{

  axios(call.req)
    .then((res: any)=> {
      return call.onSuccess.default(res) 
    })
    .catch((err: any)=> {
      return call.onError.default(output(err))
    })
    .finally(()=>{
      return (call.onFinally !== undefined) ? call.onFinally() : null
    })

}