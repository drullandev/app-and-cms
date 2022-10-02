import axios, { AxiosRequestConfig } from 'axios'

export interface CallProps {
  req: AxiosRequestConfig,
  onSuccess?: Function
  onError?: Function
  onFinally?: Function
}

export const restCall = async (call: CallProps) => {

  if (call.req.method === null) call.req.method = 'get'

  call.req.url = (call.req.url) ? process.env.REACT_APP_HOST+call.req.url : undefined

  if(call.req.url === undefined){
    console.log('Are you crazy?')
    return false
  }else{
    return await axios(call.req)
    .then((res)=> {
      if (call.onSuccess === undefined) console.log('No action for call::onSucces() !!', call.req, res)
      return (call.onSuccess !== undefined) ? call.onSuccess(res) : true
    }).catch((err: Error)=> {
      if (call.onError === undefined) console.log('No action for call::onError() !!', call.req, err);
      return (call.onError !== undefined) ? call.onError(err) : false;
    })/*.finally(()=>{
      if (call.onFinally === undefined) console.log('No action for call::onFinally() !!', req);
      return (call.onFinally !== undefined) ? call.onFinally() : null
    })*/
  }

}