import * as icon from 'ionicons/icons'
import { setOutput } from '../../classes/core/output'

interface ErrorDesignProps {
  duration?: number
  icon?: any
  color?: string
}

const onSubmit = async (form: any) => {

  return {

    emailConfirmation: ()=> {

      /*axios
        .get(AppConst.RestAPI + '/auth/email-confirmation')
        .then((res: any) => {
          dismissLoadingAlert()
          switch (res.status) {
            case 200:
              setTheUserData(res.data)
              launchToast('Welcome ${form.identifier}, you was registered!!!', 'success')
              launchHistory(AppConst.HOME, 2000, { direction: 'none' })
            break;
            default:
              console.log('case', res.status)
              setisLoggedIn(false)
              launchToast('Status:' + res.status + ',' + res.response.data.message[0].messages[0].message, 'warning')
            
        }
        }).catch((res: any) => {
        setisLoggedIn(false)
        launchToast(res.response.data.message[0].messages[0].message, 'danger')
        })
        */
    },

    sendEmailConfirmation: ()=> {
      /*
      axios
        .post(AppConst.RestAPI + '/auth/send-email-confirmation')
        .then((res: any) => {
        dismissLoadingAlert()
        switch (res.status) {
            200:
            setTheUserData(res.data)
            launchToast('Welcome ${form.identifier}, you was registered!!!', 'success')
            launchHistory(AppConst.HOME, 2000, { direction: 'none' })
            ,
            default:
            console.log('case', res.status)
            setisLoggedIn(false)
            launchToast('Status:' + res.status + ',' + res.response.data.message[0].messages[0].message, 'warning')
            ,
        }
        }).catch((res: any) => {
        setisLoggedIn(false)
        launchToast(res.response.data.message[0].messages[0].message, 'danger')
        })
        */
    },

  }

}

export const output = (err: any, errorDesign?: ErrorDesignProps) => {

  let errorOutput = setOutput({ message: 'Error calling Strapi service' })

  if (err.response) {
    // The client was given an error response (5xx, 4xx)
    //return call.onError.default(err) 

    switch(err.response?.status){
      case 400:
        errorOutput.message = err.response.data.error.message
      break
      case 500:
        if(err.search('SMTP')){
          errorOutput.color = 'error'
          errorOutput.message = 'Something is wrong with the email...'
        }
  
        break;
      default:
        errorOutput.message = err.response.data.message[0].messages[0].message
    }

  } else if (err.request) {
    // The client never received a response, and the request was never left
    errorOutput.color = 'error'
    errorOutput.icon = icon.skullOutline
    errorOutput.message = 'Sorry What???'

  } else {
    // Anything else
    errorOutput.color = 'error'
    errorOutput.icon = icon.skullOutline
    errorOutput.message = 'Anithing else??? o.o'
    
  }

  return errorOutput

} 