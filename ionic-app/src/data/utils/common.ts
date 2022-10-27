export const toCamelCase = (str: string) =>  {
  return str.replace(/-([a-z])/g, function (g) { 
    return g[1].toUpperCase()
  })
}

export const empty = (obj: any) =>{
  if(obj === undefined) return false
  if(obj === '') return false
  for(var prop in obj) {
    if(obj.hasOwnProperty(prop))
      return false
  }
  return true
}