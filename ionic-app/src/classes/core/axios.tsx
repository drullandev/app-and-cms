import axios, { AxiosRequestConfig } from 'axios'
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

const common = (call:any) => {
  if (call.req.method === null) call.req.method = 'get'
  call.req.url = (call.req.url) ? process.env.REACT_APP_HOST+call.req.url : undefined
  return call
}

export const restCallAsync = async (call: CallProps) => {
  let ccall = common(call)
  return await setCall(ccall)
}

export const restCall = (call: CallProps) => {
  let ccall = common(call)
  return setCall(ccall)
}

interface ErrorDesignProps {
  duration?: number
  icon?: any
  color?: string
}

const setCall = (call: CallProps, errorDesign?: ErrorDesignProps) =>{

  axios(call.req)
    .then((res: any)=> {
      return call.onSuccess.default(res) 
    })
    .catch((err: any)=> {

      let errorOutput = {
        message: '',
        duration: errorDesign?.duration ?? 1500,
        color: errorDesign?.color ?? 'warning',
        icon: errorDesign?.icon ?? icon.closeCircleOutline,
      }

      if (err.response) {
        // The client was given an error response (5xx, 4xx)
        //return call.onError.default(err) 

        switch(err.response?.status){
          case 400:
            errorOutput.message = err.response.data.error.message
          break
          case 500:
            if(err.search('SMTP')){
              errorOutput.color = 'error'
              errorOutput.message = 'Something is wrong with the email...'
            }
      
            break;
          default:
            errorOutput.message = err.response.data.message[0].messages[0].message
        }

      } else if (err.request) {
        // The client never received a response, and the request was never left
        //return call.onError.default(err) //TODO
        errorOutput.message = 'Sorry What???'
      } else {
        // Anything else
        //return call.onError(err)
        errorOutput.message = 'Anithing else??? o.o'
      }

      call.onError.default(errorOutput)

    })
    .finally(()=>{
      return (call.onFinally !== undefined) ? call.onFinally() : null
    })
}