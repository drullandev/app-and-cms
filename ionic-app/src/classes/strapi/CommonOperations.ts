import axios from 'axios'
import * as AppConst from '../../data/static/constants'

const onSubmit = async (form: any) => {

  return {

    login: ()=> {

      /* axios
        .post(AppConst.RestAPI + '/auth/local', {
        identifier: form.identifier,
        password: form.password
            }).then((res: any) => {
            switch (res.status) {
              case 200:
                setisLoggedIn(true)
                setTheUserData(res.data)
                axios
                  .put(AppConst.RestAPI+'/users/'+res.data.user.id, {
                  acceptedTerms: form.terms,
                  acceptedPrivacyPolicy: form.privacy,
                  //userDarkMode: userDarkMode
                  }).then(()=>{
          
                  })
                launchToast('Welcome '+res.data.user.username+', you was logged!!!', 'success')
                launchLoading('Redirecting to Home page')
                launchHistory(AppConst.HOME)
              break;
              default:
                setisLoggedIn(false)
                launchToast('Status:' + res.status + ',' + res.data.message[0].messages[0].message, 'warning')
                
            }
            }).catch((err:any) => {
            console.log(err)
            setisLoggedIn(false)
            //launchToast(err.response.data.message[0].messages[0].message, 'danger')
            })
        */

    },

    signup:()=> {
      /*
      axios
        .post(AppConst.RestAPI + '/auth/local/register', {
        username: form.identifier,
        password: form.password,
        email: form.useremail
        }).then((res: any) => {
        switch (res.status) {
            200:
            setisLoggedIn(true)
            setTheUserData(res.data)
            axios
                .put(AppConst.RestAPI+'/users/'+res.data.user.id, {
                acceptedTerms: form.terms,
                acceptedPrivacyPolicy: form.privacy,
                //userDarkMode: userDarkMode,
                hasSeenTutorial: false,
                }).then(()=>{
        
                })
            launchToast('Welcome ${form.identifier}, you was registered!!!', 'success')
            launchLoading('Great! Redirection to next step ;)')
            launchHistory(AppConst.ADD_DATA, 2000, { direction: 'none' })
            ,
            default:
            setisLoggedIn(false)
            launchToast('Status:' + res.status + ',' + res.response.data.message[0].messages[0].message, 'warning')
            ,
        }
        }).catch(err => {
        setisLoggedIn(false)
        launchToast(err.response.data.message[0].messages[0].message, 'danger')
        })
        */
    },

    recover: ()=> {
      /*
      axios
        .post(AppConst.RestAPI + '/auth/forgot-password', {
        email: form.email
        }).then((res: any) => {
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

    resetPassword: ()=> {
      /*
      axios
        .post(AppConst.RestAPI + '/auth/reset-password', {
        email: form.email
        }).then((res: any) => {
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
      }
      */
    },

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

    default: ()=> {
      //launchToast('This action not exist...', 'danger')
    }

  }

}
