import React, { useState } from 'react'
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput, IonText, useIonToast } from '@ionic/react'
import './Login.scss'
import { setisLoggedIn, setUsername } from '../data/user/user.actions'
import { connect } from '../data/connect'
import { RouteComponentProps } from 'react-router'
import { restCallAsync } from '../classes/core/axios'
import { random } from '../classes/common'
import { globe } from 'ionicons/icons'
import { useTranslation } from 'react-i18next'

let testingRecover = true
let testing = testingRecover && process.env.REACT_APP_TESTING


interface OwnProps extends RouteComponentProps {}

interface DispatchProps {
  setisLoggedIn: typeof setisLoggedIn
  setUsername: typeof setUsername
}

interface LoginProps extends OwnProps,  DispatchProps { }

const Recover: React.FC<LoginProps> = ({
  setisLoggedIn,
  history,
  setUsername: setUsernameAction
}) => {

  const { t, i18n } = useTranslation()

  const [email, setEmail] = useState(testing ? process.env.REACT_APP_DEFAULT_EMAIL : '')
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [emailError, setEmailError] = useState(false)

  const [setToast, dismissToast] = useIonToast()

  const launchToast = async (data: any, setToast: Function) => {
    let dur = 20000
    await setToast({
      message: data.message,
      duration: dur ?? 1000,
      position: data.position ?? 'bottom',
      icon: data.icon ?? globe
    })
    setTimeout(()=> dismissToast(), dur + 500)
    return true
  }

  //SMTP code:550 msg:550-5.1.1 The email account that you tried to reach does not exist. Please try 550-5.1.1 double-checking the recipient's email address for typos or 550-5.1.1 unnecessary spaces. Learn more at 550 5.1.1 https://support.google.com/mail/?p=NoSuchUser q16-20020a2e9690000000b0027744b28539si4283378lji.72 - gsmtp 

  const submitRecover = async (e: React.FormEvent) => {

    e.preventDefault()
    setFormSubmitted(true)

    if(!email) setEmailError(true)

    if(email) {

      const onRecoverSuccess = async (ret: any) => {
        let user = ret.user
        user.jwt = ret.jwt // Attaching the JWT to the user level and state...
        await setisLoggedIn(true)
        return user
      }  

      await restCallAsync({
        req: {
          url: 'api/auth/forgot-password',
          method: 'POST',
          data: { email: email }
        },
        onSuccess: {
          default: async (ret: any)=>{
            await onRecoverSuccess(ret.data)
              .then((ret: any)=>{
                switch (ret.status) {
                  case 200:
                    //setisLoggedIn(true)
                    /*launchToast({ 
                      message: t('user-wellcome', { username: ret.data.user.username }) 
                    }, setToast)
                      .then(()=> history.push('/tabs/schedule', { direction: 'none' }))
                      */
                }            
              })
          }
        },
        onError:{
          default: (err: any)=> {
            launchToast({ message: t(err.response.data.error.message) ?? t(err.response.data.message[0].messages[0].message) }, setToast)
          }
        }
      })
    
    }

  }

  return <IonPage id="recover-page">

      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Recover</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>

        <div className="login-logo">
          <img src="assets/img/appicon.svg" alt="Ionic logo" />
        </div>

        <form noValidate onSubmit={submitRecover}>
          <IonList>

            <IonItem>
              <IonLabel position="stacked" color="primary">Email</IonLabel>
              <IonInput name="email" type="email" value={email} onIonChange={e => {
                setEmail(e.detail.value!)
                setEmailError(false)
              }}>
              </IonInput>
            </IonItem>

            {formSubmitted && emailError && <IonText color="danger">
              <p className="ion-padding-start">
                Email is required
              </p>
            </IonText>}

          </IonList>

          <IonRow>
            <IonCol>
              <IonButton type="submit" expand="block">Create</IonButton>
            </IonCol>
          </IonRow>
        </form>

      </IonContent>

    </IonPage>
  
}

export default connect<OwnProps, {}, DispatchProps>({
  mapDispatchToProps: {
    setisLoggedIn,
    setUsername
  },
  component: Recover
})