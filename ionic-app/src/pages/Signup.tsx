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

let testingSignup = true
let testing = testingSignup && process.env.REACT_APP_TESTING


interface OwnProps extends RouteComponentProps {}

interface DispatchProps {
  setisLoggedIn: typeof setisLoggedIn
  setUsername: typeof setUsername
}

interface LoginProps extends OwnProps,  DispatchProps { }

const Signup: React.FC<LoginProps> = ({setisLoggedIn, history, setUsername: setUsernameAction}) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [usernameError, setUsernameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [emailError, setEmailError] = useState(false)

  const { t, i18n } = useTranslation()




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

  const submitSignup = async (e: React.FormEvent) => {

    e.preventDefault()
    setFormSubmitted(true)

    if(!username) setUsernameError(true)    
    if(!password) setPasswordError(true)
    if(!email) setEmailError(true)

    if(username && password) {

      const onSignupSuccess = async (ret: any) => {
        let user = ret.user
        user.jwt = ret.jwt // Attaching the JWT to the user level and state...
        await setisLoggedIn(true)
        return user
      }  

      await restCallAsync({
        req: {
          url: 'api/auth/local/register',
          method: 'POST',
          data: testing
          ? { 
              username: random(12),
              password: random(12),
              email: random(12)+'@gmail.com'
            }
          : { 
              username: username,
              password: password,
              email: email
            }
          ,
        },
        onSuccess: { 
          200: async (ret: any)=>{
            await onSignupSuccess(ret.data)
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
        onError: {
          400: (err: any)=> {
            switch(err?.response.status){
              case 400: 
                launchToast({ message: t(err.response.data.error.message) }, setToast)
              break
              default:
                launchToast({ message: t(err.response.data.message[0].messages[0].message) }, setToast)
            }
          }
        }
        
      })
      
    }

  }

  return <IonPage id="signup-page">

      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Signup</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>

        <div className="login-logo">
          <img src="assets/img/appicon.svg" alt="Ionic logo" />
        </div>

        <form noValidate onSubmit={submitSignup}>
          <IonList>
            <IonItem>
              <IonLabel position="stacked" color="primary">Username</IonLabel>
              <IonInput name="username" type="text" value={username} spellCheck={false} autocapitalize="off" onIonChange={e => {
                setUsername(e.detail.value!)
                setUsernameError(false)
              }}
                required>
              </IonInput>
            </IonItem>

            {formSubmitted && usernameError && <IonText color="danger">
              <p className="ion-padding-start">
                Username is required
              </p>
            </IonText>}

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

            <IonItem>
              <IonLabel position="stacked" color="primary">Password</IonLabel>
              <IonInput name="password" type="password" value={password} onIonChange={e => {
                setPassword(e.detail.value!)
                setPasswordError(false)
              }}>
              </IonInput>
            </IonItem>

            {formSubmitted && passwordError && <IonText color="danger">
              <p className="ion-padding-start">
                Password is required
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
  component: Signup
})