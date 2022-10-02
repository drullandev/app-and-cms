import { restCall } from '../clases/axios';

export interface LoginProps {
  identifier: string
  password: string
}

export const login = (data: LoginProps)=> {
  return restCall({
    req : {
      url: 'auth/local',
      method: 'post',
      data: data
    },
    onSuccess: (ret: JSON)=>{
      /*
{
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY0NTY4NjA1LCJleHAiOjE2NjcxNjA2MDV9.lAUwTwd7HlG1i5gF7fQbjRnqsz6vzggUCPrFjx-OqpI",
    "user": {
        "id": 1,
        "username": "White Bunny",
        "email": "bunny@gmail.com",
        "provider": "local",
        "confirmed": true,
        "blocked": false,
        "createdAt": "2022-09-30T20:02:59.863Z",
        "updatedAt": "2022-09-30T20:02:59.863Z"
    }
}
      */
      console.log('ret', ret)
    },
    onError: (ret: JSON)=>{
      console.log('ret', ret)
    }
  })
  
}
