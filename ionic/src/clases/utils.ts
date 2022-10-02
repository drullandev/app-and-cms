
export const getType = (p:any)=>{
  if (Array.isArray(p)) return 'array'
  else if (typeof p == 'string') return 'string'
  else if (p != null && typeof p == 'object') return 'object'
  else return 'other'
}