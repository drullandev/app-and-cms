import { restCall } from '../calls/axios'


export const crud = (
    operation: string,
    model:string,
    data: any
  ) => {
    const op = (operation: string) => {
      switch(operation){
        case 'update': {
          return restCall({
            req: {
              url: model,
              method: 'POST',
              data: data
            }
          })
        } break;
        case 'insert': {
          return restCall({
            req: {
              url: model,
              method: 'PUT',
              data: data
            }
          })
        } break;
        default:
  
          break;
      }
    }
  
  }