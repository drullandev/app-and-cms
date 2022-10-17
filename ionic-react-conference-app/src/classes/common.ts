export const toCamelCase = (str: string): string =>  {
  return str.replace(/-([a-z])/g, function (g) { 
    return g[1].toUpperCase()
  })
}

export const empty = (obj: any): boolean =>{
  if(obj === undefined) return false
  if(obj === '') return false
  for(var prop in obj) {
    if(obj.hasOwnProperty(prop))
      return false
  }
  return true
}

export const capitalize = (s: string): string => {
  return s[0].toUpperCase() + s.slice(1);
}

export const camelCase = (s: string): string => {
  return s
    .replace(/\s(.)/g, function(a) {
      return a.toUpperCase()
    })
    .replace(/\s/g, '')
    .replace(/^(.)/, function(b) {
      return b.toLowerCase()
    }).toString()
}
