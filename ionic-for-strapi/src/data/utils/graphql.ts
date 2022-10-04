import * as AppConst from '../../static/constants'
import { empty } from './common'

export interface GqlModel {
  model: string
  paginator: {
    limit: number,
    start: number,
  }
  where: {
    type: string
    key: string
    action: string
    value: string
  }
  filter: any
  struct: any
  sort: string
  orderField: string
  searchOrder: string
  filterField: string
  filterCondition: string
  direction: string
}

export const setGQLQuery = (params: GqlModel) =>{
  
  console.log(params.orderField)

  let queryString = `query ` + params.model + ` {\n\t` + params.model

  queryString += `( `  

  if (params.paginator) {
    queryString += JSON.stringify(params.paginator, null, '')
      .replace(',',', ')
      .replace(/["{}]/g, '')
  }

  // WHERE
  var where = []
  if(!empty(params.where)){
    params.where.map((row:any)=>{
      if(row.value !== undefined && row.value !== ''){
        var whereType = row.value
        switch(row.type){
          case 'string':
            whereType = '["'+whereType+'"]';
            where.push(row.key+'_'+row.action+' : '+whereType)
          break;
          case 'array':
            const rowLen = whereType.length
            var rows = []
            var stringedWhere = whereType.map((row: any, index: number)=>{
              rows.push(row)
              if (rowLen === index + 1) {
                // last one
                stringedWhere = rows.join(',')
              }
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

  console.log(params)

  if(params.filterField !== undefined){
    if(params.filterCondition !== undefined && typeof params.searchString !== undefined){
      where.push(params.filterField+'_'+params.filterCondition+' : '+params.searchString)
    }
  }

  //https://strapi.io/documentation/developer-docs/latest/development/plugins/graphql.html#query-api
  if(!empty(where)) queryString+=', where: { '+where.join(',')+' }'

  //ORDER
  queryString += `, sort: "` + params.orderField + `:` + ( params.searchOrder ? params.searchOrder : params.direction ) + `"`

  queryString += ` )`

  if (params.struct) {
    queryString += JSON.stringify(params.struct,null,'\t')
      .replace(/number|string|date/g, '')
      .replace(/[":]/g, '')  
      .replace(',', ',')
  }

  queryString += `\n}`
console.log(queryString)
  return queryString

}