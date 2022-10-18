import { restCall, restCallAsync } from '../core/axios'
import { AxiosRequestConfig } from 'axios'
import { empty, camelCase } from '../common'

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

export const getMutation = (p: GqlMutationModel) => {
  return graphqlCall(setMutation(p))
}

export const setMutation = (p: GqlMutationModel) => {

  let qs = `mutation {\t`

  if( p.model !== undefined && p.action !== undefined ){
    qs += camelCase(p.action+' '+p.model)
  }else if( p.action ){
    qs += camelCase(p.action)
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

export const setQuery = (p: GqlQueryModel) => {
  return graphqlCall(getQuery(p))
}

export const getQuery = (p: GqlQueryModel) =>{
  
  console.log(p.orderField)

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
  if(!empty(p.where)){
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

  console.log(p)

  if(p.filterField !== undefined){
    if(p.filterCondition !== undefined && typeof p.searchString !== undefined){
      where.push(p.filterField+'_'+p.filterCondition+' : '+p.searchString)
    }
  }

  //https://strapi.io/documentation/developer-docs/latest/development/plugins/graphql.html#query-api
  if(!empty(where)) qs+=', where: { '+where.join(',')+' }'

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

  console.log(qs)
  
  return qs

}

export interface CallProps {
  req: AxiosRequestConfig,
  onSuccess?: Function
  onError?: Function
  onFinally?: Function
}

export const graphqlCall = (call: string): any => {
  return restCall({
    req: {
      method: 'POST',
      url: 'graphql',
      data: { query: `${call}` }      
    }
  })
}

export const graphqlCallAsync = async (call: string) => {
  return await restCallAsync({
    req: {
      method: 'POST',
      url: 'graphql',
      data: { query: `${call}` }
    }
  })
}

export const filter = () => {
  
  return {
    order : {
      default: 'desc',
      options: [ 
        {
          label: 'Descendant',
          value: 'desc'
        },{
          label: 'Ascendant',
          value: 'asc',
        }
      ]
    },
    fields: {
      default: 'published_at',
      options: [
        {
          label: 'Published at',
          value: 'published_at',
          type: 'date'
        },{
          label: 'Created at',
          value: 'created_at',
          type: 'date'
        },{
          label: 'Updated at',
          value: 'updated_at',
          type: 'date'
        },{
          label: 'Content',
          value: 'content',
          type: 'string'
        }
      ]    
    },
    conditions: {
      default: 'contains',
      options: [
        {
          label: 'Distinct',
          value: 'ne',
          families: ['all']
        },
        {
          label: 'Lower than',
          value: 'lt',
          families: ['all']
        },
        {
          label: 'Lower or equal',
          value: 'lte',
          families: ['all']
        },
        {
          label: 'Greater than',
          value: 'gt',
          families: ['all']
        },
        {
          label: 'Greater or equal',
          value: 'gte',
          families: ['all']
        },
        {
          label: 'Contains',
          value: 'contains',
          families: ['all']
        },
        {
          label: 'Contains sensitive',
          value: 'containss',
          families: ['all']
        },
        {
          label: 'No Contains',
          value: 'ncontains',
          families: ['all']
        },
        {
          label: 'No Contains sensitive',
          value: 'ncontainss',
          families: ['all']
        },
        {
          label: 'In',
          value: 'in',
          families: ['array']
        },
        {
          label: 'Not in',
          value: 'nin',
          families: ['array'] 
        },
        {
          label: 'Equals null',
          value: 'null',
          families: []
        },
        {
          label: 'Not equals null',
          value: 'nnull',
          families: []
        }
      ]
    }
  }
}



