import axios, { AxiosRequestConfig } from 'axios'
import { output } from '../strapi/CommonOperations'

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

export const restCall = (call: CallProps) => setCall(commonCall(call))
export const restCallAsync = async (call: CallProps) => setCall(commonCall(call))

const commonCall = (call:any) => {
  if (call.req.method === null) call.req.method = 'get'
  call.req.url = (call.req.url) ? import.meta.env.REACT_APP_HOST+'/'+call.req.url : undefined
  // Yeah... '?populate=* ... The testing API requires this to show you all or only basic elements...
  // Is not the time to stay working under this constraints
  // I'growing faster this way ;)
  if(call.req.method.toLowerCase() === 'get') call.req.url = call.req.url+'?populate=*'
  return call
}

const setCall = (call: CallProps) => axios(call.req)
  .then((res: any)=> {
    return call.onSuccess.default(res) 
  })
  .catch((err: any)=> {
    return call.onError.default(output(err))
  })
  .finally(()=>{
    return (call.onFinally !== undefined) ? call.onFinally() : null
  })
