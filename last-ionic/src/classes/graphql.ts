import Rest from './Rest'
import { AxiosRequestConfig } from 'axios'
import StringUtil from './StringUtil'
import { useTranslation } from 'react-i18next'
import DebugUtil from './DebugUtil'

const debug = DebugUtil.setDebug(false);

export interface WhereProps {
  type: string
  key: string
  action: string
  value: string
}

export interface PaginatorProps {
  limit: number
  start: number
}

// MUTATION GENERATOR
export interface GqlMutationModel {
  model?: string
  action?: string
  data?: {
    input?: {
      identifier?: string
      password?: string
    }
    output?: any
  }
}

export const getMutation = (p: GqlMutationModel) => graphqlCall(setMutation(p))

export const getMutationAsync = async (p: GqlMutationModel) => await graphqlCallAsync(setMutation(p))

const setMutation = (p: GqlMutationModel) => {

  let qs = `mutation {\t`

  if( p.model !== undefined && p.action !== undefined ){
    qs += StringUtil.camelCase(p.action+' '+p.model)
  }else if( p.action ){
    qs += StringUtil.camelCase(p.action)
  }else if( p.model ){
    qs += p.model
  }

  if( p.data?.input !== undefined ){
    let inputString = ''
    qs += '(input:'
    Object.entries(p.data?.input).forEach(([key, value]) => {
      inputString = inputString + ` ${key}: `
      if(typeof value === 'boolean'){
        inputString = inputString + `${value},`
      }else{
        inputString = inputString + `"${value}",`
      }
    })
    qs += '{ ' + inputString.replace(/,+$/, '') + ' }'
    qs += ')'
  }

  if( p.data?.output !== undefined){
    if (p.data.output) {    
      qs += JSON.stringify(p.data?.output, null, ' ')
        .replace(/number|string| date|true|,/g, '')
        .replace(/[":]/g, '')
    }
  }

  qs += `}`

  return qs

}

// QUERY GENERATOR

export interface GqlQueryModel {
  model: string
  paginator: PaginatorProps
  where: WhereProps[]
  filter: any
  struct: any
  sort: string
  searchString: string
  orderField: string
  searchOrder: string
  filterField: string
  filterCondition: string
  direction: string
}

export const setQuery = (p: GqlQueryModel) => graphqlCall(getQuery(p))

const getQuery = (p: GqlQueryModel) =>{

  let qs = `query `

  qs =+ p.model + ` {\n\t` + p.model

  qs +=`( `  

  if (p.paginator) {
    qs +=JSON.stringify(p.paginator, null, '')
      .replace(',',', ')
      .replace(/["{}]/g, '')
  }

  // WHERE
  var where = []
  if(!StringUtil.empty(p.where)){
    p.where.map((row:any)=>{
      if(row.value !== undefined && row.value !== ''){
        var whereType = row.value
        switch(row.type){
          case 'string':
            whereType = '["'+whereType+'"]';
            where.push(row.key+'_'+row.action+' : '+whereType)
          break;
          case 'array':
            const rowLen = whereType.length
            var rows: [] = []
            var stringedWhere = whereType.map((row: any, index: number)=>{
              //rows.push(row)
              //if (rowLen === index + 1) {
                // last one
                //stringedWhere = rows.join(',')
              //}
            })
            whereType = '["'+stringedWhere+'"]';
            where.push(row.key+'_'+row.action+' : '+whereType)
          break;
          default:
            whereType = '["'+whereType+'"]';
            where.push(row.key+'_'+row.action+' : '+whereType)
          break;
        }

      }
    })
  }

  if(p.filterField !== undefined){
    if(p.filterCondition !== undefined && typeof p.searchString !== undefined){
      where.push(p.filterField+'_'+p.filterCondition+' : '+p.searchString)
    }
  }

  //https://strapi.io/documentation/developer-docs/latest/development/plugins/graphql.html#query-api
  if(!StringUtil.empty(where)) qs+=', where: { '+where.join(',')+' }'

  //ORDER
  qs +=`, sort: "` + p.orderField + `:` + ( p.searchOrder ? p.searchOrder : p.direction ) + `"`

  qs +=` )`

  if (p.struct) {
    qs +=JSON.stringify(p.struct,null,'\t')
      .replace(/number|string|date/g, '')
      .replace(/[":]/g, '')  
      .replace(',', ',')
  }

  qs +=`\n}`

  return qs

}

export interface CallProps {
  req: AxiosRequestConfig,
  onSuccess: Function
  onError: Function
  onFinally?: Function
}

const graphqlCall = (call: string): any => Rest.restCall({
  req: {
    method: 'POST',
    url: 'graphql',
    data: { query: `${call}` }      
  },
  onSuccess: {
    default: ()=>{}
  },//
  onError: {
    default: ()=>{}//
  }
})

const graphqlCallAsync = async (call: string) => await Rest.restCallAsync({
  req: {
    method: 'POST',
    url: 'graphql',
    data: { query: `${call}` }
  },
  onSuccess: {
    default: ()=>{}
  },//
  onError: {
    default: ()=>{}//
  }
})