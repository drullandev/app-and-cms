import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput, IonText, useIonToast } from '@ionic/react';
import './Login.scss';
import { setData, setisLoggedIn, setUsername, setDarkMode } from '../data/user/user.actions';
import { connect } from '../data/connect';
import { RouteComponentProps } from 'react-router';
import { restCallAsync } from '../classes/core/axios';
import { globe } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
export interface LoginFormProps  {
  input: {
    identifier: string
    password: string
  }
  onSuccess: Function
  onError: Function
}

export interface StrapiAuthProps {
  user: {
    id?: string
    username?: string
    email?: string
    blocked?: boolean
    confirmed?: boolean
    createdAt?: string
    updatedAt?: string
    provider?: string
    darkMode?: boolean
  },
  jwt?: string
}

let testing = true

interface OwnProps extends RouteComponentProps {}

interface DispatchProps {
  setisLoggedIn: typeof setisLoggedIn;
  setUsername: typeof setUsername;
  setData: typeof setData;
  setDarkMode: typeof setDarkMode
}

interface LoginProps extends OwnProps,  DispatchProps { }

const Login: React.FC<LoginProps> = ({
  setisLoggedIn,
  history,
  setUsername: setUsernameAction,
  setData
}) => {

  const [username, setUsername] = useState(testing ? process.env.REACT_APP_DEFAULT_USER : '')
  const [password, setPassword] = useState(testing ? process.env.REACT_APP_DEFAULT_PASS : '')
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [usernameError, setUsernameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)


  const { t, i18n } = useTranslation();



  const [setToast, dismissToast] = useIonToast()

  const launchToast = async (data: any, setToast: Function) => {
    let dur = data.duration ?? 2000
    await setToast({
      message: data.message,
      duration: dur ?? 1000,
      position: data.position ?? 'bottom',
      icon: data.icon ?? globe
    })
    setTimeout(()=> dismissToast(), dur + 500)
    return true
  }

  

  const submitLogin = async (e: React.FormEvent) => {

    e.preventDefault()
    setFormSubmitted(true)

    if(!username) setUsernameError(true)    
    if(!password) setPasswordError(true)

    if(username && password) {

      await restCallAsync({
        req: {
          url: 'api/auth/local',
          method: 'POST',
          data: { 
            identifier: username,
            password: password 
          },
        },
        onSuccess: async (ret: any)=> {
          switch (ret.status) {
            case 200:          

              // Set user state
              let user = ret.data.user
              user.jwt = ret.jwt // Attaching the JWT to the user level and state...
              user.isLoggedIn = true
              await setData(user)

              launchToast({ 
                message: t('user-wellcome', { username: ret.data.user.username }) 
              }, setToast)
              .then(()=>
                history.push('/tabs/schedule', { direction: 'none' }
              ))

            break
            default:
          }            
        },
        onError: (err: any)=> {
          switch(err?.response.status){
            case 400: 
              launchToast({ message: t(err.response.data.error.message) }, setToast)
            break
            default:
              launchToast({ message: t(err.response.data.message[0].messages[0].message) }, setToast)
          }
        }
      })
    
    }

  }

  return (
    <IonPage id="login-page">

      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>

        <div className="login-logo">
          <img src="assets/img/appicon.svg" alt="Ionic logo" />
        </div>

        <form noValidate onSubmit={submitLogin}>
          <IonList>
            <IonItem>
              <IonLabel position="stacked" color="primary">Username</IonLabel>
              <IonInput name="username" type="text" value={username} spellCheck={false} autocapitalize="off" onIonChange={e => setUsername(e.detail.value!)}
                required>
              </IonInput>
            </IonItem>

            {formSubmitted && usernameError && <IonText color="danger">
              <p className="ion-padding-start">
                Username is required
              </p>
            </IonText>}

            <IonItem>
              <IonLabel position="stacked" color="primary">Password</IonLabel>
              <IonInput name="password" type="password" value={password} onIonChange={e => setPassword(e.detail.value!)}>
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
              <IonButton type="submit" expand="block">Login</IonButton>
            </IonCol>
            <IonCol>
              <IonButton routerLink="/signup" color="light" expand="block">Signup</IonButton>
            </IonCol>
          </IonRow>
        </form>

      </IonContent>

    </IonPage>
  )

}

export default connect<OwnProps, {}, DispatchProps>({
  mapDispatchToProps: {
    setisLoggedIn,
    setUsername,
    setDarkMode,
    setData
  },
  component: Login
})