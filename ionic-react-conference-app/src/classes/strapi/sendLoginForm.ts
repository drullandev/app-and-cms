import { restCallAsync } from '../../calls/axios'
import { StrapiAuthProps } from './models/StrapiAuthProps'
import { LoginFormProps } from './models/SendStrapiAuthProps' 

export const sendLoginForm = async (data: LoginFormProps) => {
  await restCallAsync({
    req: {
      url: 'auth/local',
      data: data.data,
      method: 'post'
    },
    onSuccess: (ret: StrapiAuthProps)=>{
      data.onSuccess(ret)
    },
    onError: (err: Error)=> {
      data.onError(err)
    }
  })


}