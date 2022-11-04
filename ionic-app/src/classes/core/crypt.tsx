const textToChars = (text:string) => text.split('').map((c) => c.charCodeAt(0))

const byteHex = (n:any) => ('0' + Number(n).toString(16)).substr(-2)    

export const crypt = (salt: string, text: string) => {
  return text
    .split('')
    .map(textToChars)
    .map((code: any) => textToChars(salt).reduce((a, b) => a ^ b, code))
    .map(byteHex)
    .join('')
}
  
export  const decrypt = (salt: string, encoded: any) => {
  return encoded
    .match(/.{1,2}/g)
    .map((hex: string) => parseInt(hex, 16))
    .map((code: any) => textToChars(salt).reduce((a, b) => a ^ b, code))
    .map((charCode: any) => String.fromCharCode(charCode))
    .join('')
}