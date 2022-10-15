import { useQuery, useMutation } from '@apollo/client'

/*export interface CallProps {
  req: AxiosRequestConfig,
  onSuccess?: Function
  onError?: Function
  onFinally?: Function
}*/

export const restCallAsync = async (call: any) => {

  /*
  if (call.req.method === null) call.req.method = 'get'

  call.req.url = (call.req.url) ? process.env.REACT_APP_HOST+call.req.url : undefined

  if(call.req.data !== undefined && call.req.method === 'get'){
    console.log('Do you wanna send data via get or what??')
    return false
  }

  if(call.req.url === undefined){

    console.log('Are you crazy?')
    return false

  }else{

    return await axios(call.req)
      .then((res)=> {
        if (call.onSuccess === undefined) console.log('No action for call::onSucces() !!', call.req, res)
        return (call.onSuccess !== undefined) ? call.onSuccess(res.data) : true
      }).catch((err: Error)=> {
        if (call.onError === undefined) console.log('No action for call::onError() !!', call.req, err);
        return (call.onError !== undefined) ? call.onError(err) : false;
      }).finally(()=>{
        if (call.onFinally === undefined) console.log('No action for call::onFinally() !!');
        return (call.onFinally !== undefined) ? call.onFinally() : null
      })

  }
*/
}

export const restCall = (call: any) => {
/*
  if (call.req.method === null) call.req.method = 'get'

  call.req.url = (call.req.url) ? process.env.REACT_APP_HOST+call.req.url : undefined

  if(call.req.url === undefined){
    console.log('Are you crazy?')
    return false
  }else{
    return axios(call.req)
    .then((res)=> {
      if (call.onSuccess === undefined) console.log('No action for call::onSucces() !!', call.req, res)
      return (call.onSuccess !== undefined) ? call.onSuccess(res.data) : true
    }).catch((err: Error)=> {
      if (call.onError === undefined) console.log('No action for call::onError() !!', call.req, err);
      return (call.onError !== undefined) ? call.onError(err) : false;
    }).finally(()=>{
      if (call.onFinally === undefined) console.log('No action for call::onFinally() !!');
      return (call.onFinally !== undefined) ? call.onFinally() : null
    })
  }
*/
}