import * as AppConst from '../../../static/constants'
import axios from 'axios'

const testing = false

/**
 * App CRUD
 * @param model 
 * @param params 
 * @returns 
 */
export const restGet = async (model:string, params:object = {}) => {
  if(testing) console.log('app.calls.restGet::'+model)
  const searchString = (params)
    ? '?'+Object.keys(params).map(key => `${key}=${params[key]}`)
    : ''
  return axios.get(AppConst.RestAPI+'/'+model+searchString)
}

export const restPost = async (model:string, body:any) => {
  if(testing) console.log('app.calls.restPost::'+model, body)
  return axios.post(AppConst.RestAPI+'/'+model, body)
}

export const restPut = async (model:string, body:any) => {
  if(testing) console.log('app.calls.restPut::'+model, body)
  return axios.put(AppConst.RestAPI+'/'+model, body)
}

export const restDelete = async (model:string, body:any) => {
  if(testing) console.log('app.calls.restDelete::'+model, body)
  return axios.delete(AppConst.RestAPI+'/'+model, body)
}

export const setImage = (url:string) =>{
  return AppConst.RestAPI+url
}