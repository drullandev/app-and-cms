import { restCall } from '../clases/axios';

export interface LoginProps {
  identifier: string
  password: string
}

export const login = (data: LoginProps)=> {
  let action = {
    req : {
      url: 'auth/local',
      method: 'post',
      data: data
    },
    onSuccess: (ret: JSON)=>{
      console.log('ret', ret)
    },
    onError: (ret: JSON)=>{
      console.log('ret', ret)
    }
  }
  return restCall(action)
  
}
