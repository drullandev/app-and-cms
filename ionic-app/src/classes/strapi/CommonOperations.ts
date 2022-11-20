import axios from 'axios'
import * as AppConst from '../../data/static/constants'

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

const output = (err:any) =>{

} 