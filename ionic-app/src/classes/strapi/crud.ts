import { CallProps, restCall } from '../core/axios'

/**
 * 
 * @param operation With this function you are able to generate a crud operations over a Strapi model
 * @param model 
 * @param data 
 * @returns 
 */
export const crud = ( operation: string, model:string, data?: any, onSuccess?: Function, onError?: Function) => {
  
  const method =
    ( operation === 'insert') ? 'PUT'     :
    ( operation === 'update') ? 'POST'    :
    ( operation === 'delete') ? 'DELETE'  :
    ( operation === 'get'   ) ? 'GET'     : operation
  
  let uri = model+'s' //XXX Used to be plural under this context (Strapi calls)

  if(method === 'GET' || method === 'POST'){
    let queryStr = '/'
    Object.entries(data).forEach(([key, value]) => {
      if(key === 'id'){
        queryStr = queryStr + `${value}`
      }else{
        queryStr = queryStr + `${key}=${value}&`
      }      
    })
    queryStr.replace(/&+$/, '')
    uri = uri + queryStr
  }

  let call: CallProps = {
    req: {
      url: 'api/'+uri,
      data: data,
      method: ( operation === 'insert') ? 'PUT'     :
        ( operation === 'update') ? 'POST'    :
        ( operation === 'delete') ? 'DELETE'  :
        ( operation === 'get'   ) ? 'GET'     : 'OPTIONS'
    },
    onSuccess: { 
      default: onSuccess !== undefined ? (ret: any) => onSuccess(data) : ()=>{}
    },
    onError: {
      default: onError !== undefined ? (err:Error)=> onError(err) : ()=>{}
    }
  }

  if(call.req.method === 'GET'){
    delete call.req.data
  }

  return restCall(call)
   
}