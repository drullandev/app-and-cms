import * as AppConst from '../../../static/constants'
import { setGQLQuery } from '../graphql'
import axios from 'axios'

export const restGet = async (model: string, params: any = {}) => {
  return axios.get(AppConst.RestAPI + '/' + model, { params: params })
}

export const restPost = async (
  model: string,
  body: any = {},
  headers: any = {}
) => {
  return axios.post(AppConst.RestAPI + '/' + model, body, headers)
}

export const restPut = async (model: string, body: any, headers: any = {}) => {
  return axios.put(AppConst.RestAPI + '/' + model, body, headers)
}

export const restDelete = async (model: string, body: any) => {
  return axios.delete(AppConst.RestAPI + '/' + model, body)
}

export const setImage = (url: string = '') => {
  return AppConst.RestAPI + url
}

export const getGQL = async (
  params: any
) => {
  return axios.post(AppConst.RestAPI + '/graphql', {
    query: setGQLQuery(params),
  })
}
