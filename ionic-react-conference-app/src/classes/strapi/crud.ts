import { CallProps, restCall } from '../core/axios'

/**
 * 
 * @param operation With this function you are able to generate a crud operations over a Strapi model
 * @param model 
 * @param data 
 * @returns 
 */
export const crud = ( operation: string, model:string, data: any ) => {
  
  const method =
    ( operation === 'insert') ? 'PUT'     :
    ( operation === 'update') ? 'POST'    :
    ( operation === 'delete') ? 'DELETE'  :
    ( operation === 'get'   ) ? 'GET'     : operation
  
  let uri = model+'s' //XXX Used to be plural under this context (Strapi calls)

  if(method === 'GET' || method === 'POST'){
    let m2 = '/'
    Object.entries(data).forEach(([key, value]) => {
      if(key === 'id'){
        m2 = m2 + `${value}`
      }else{
        m2 = m2 + `${key}=${value}&`
      }      
    })
    m2.replace(/&+$/, '')
    uri = uri + m2
  }

  let call: CallProps = {
    req: {
      url: 'api/'+uri,
      data: data,
      method: ( operation === 'insert') ? 'PUT'     :
        ( operation === 'update') ? 'POST'    :
        ( operation === 'delete') ? 'DELETE'  :
        ( operation === 'get'   ) ? 'GET'     : 'OPTIONS'
    }    
  }

  if(call.req.method === 'GET'){
    delete call.req.data
  }

  return restCall(call)
   
}