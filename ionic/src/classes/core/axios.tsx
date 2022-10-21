import axios, { AxiosRequestConfig } from 'axios'

export interface CallProps {
  req: AxiosRequestConfig,
  onSuccess: Function
  onError: Function
  onFinally?: Function
}

export const restCallAsync = async (call: CallProps) => {
  if (call.req.method === null) call.req.method = 'get'
  call.req.url = (call.req.url) ? process.env.REACT_APP_HOST+call.req.url : undefined
  return await setCall(call)
}

export const restCall = (call: CallProps) => {
  if (call.req.method === null) call.req.method = 'get'
  call.req.url = (call.req.url) ? process.env.REACT_APP_HOST+call.req.url : undefined
  return setCall(call)
}

const setCall = (call:any) =>{
  axios(call.req)
    .then((res: any)=> { 
      return call.onSuccess(res.data) 
    })
    .catch((err: Error)=> { 
      return call.onError(err) 
    })
    .finally(()=>{
      return (call.onFinally !== undefined) ? call.onFinally() : null
    })
}