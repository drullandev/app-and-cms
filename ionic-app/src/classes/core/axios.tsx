import axios, { AxiosRequestConfig } from 'axios'

export interface CallProps {
  req: AxiosRequestConfig,
  onSuccess: {
    200: Function
  }
  onError: {
    400: Function
  }
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
      return call.onSuccess(res) 
    })
    .catch((err: any)=> {
      if (err.response) {
        // The client was given an error response (5xx, 4xx)
        return call.onError(err) 
      } else if (err.request) {
        // The client never received a response, and the request was never left
        return call.onError(err) //TODO
      } else {
        // Anything else
        //return call.onError(err) //TODO finally for error
      }

    })
    .finally(()=>{
      return (call.onFinally !== undefined) ? call.onFinally() : null
    })
}