import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router'
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonButtons,
  IonMenuButton,
  IonRow,
  IonCol,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonText,
  useIonToast,
  IonRippleEffect
} from '@ionic/react'
import { connect } from '../data/connect'
import { StrapiAuthProps } from '../classes/strapi/sendLoginForm'


import './Login.scss'
import { globe } from 'ionicons/icons'
import { setIsLoggedInData, setUserData } from '../data/dataApi'
import { restCallAsync } from '../classes/core/axios'
import { useTranslation } from 'react-i18next'
import { setIsLoggedIn, setData } from '../data/user/user.actions'
import { State } from 'ionicons/dist/types/stencil-public-runtime'
//import i18next from 'i18next'

let testing = true && process.env.REACT_APP_TESTING

interface OwnProps extends RouteComponentProps {}

interface DispatchProps {
  setIsLoggedIn: typeof setIsLoggedIn
  setData: typeof setData
}


interface LoginProps extends OwnProps, DispatchProps {}

const Login: React.FC<LoginProps> = ({
  history,
  setData
}) => {

  const { t } = useTranslation()  

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [formSubmitted, setFormSubmitted] = useState(false)
  const [usernameError, setUsernameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  const [setToast, dismissToast] = useIonToast()

  const launchToast = async (data: any, setToast: Function) => {
    await setToast({
      message: data.message,
      duration: data.duration ?? 1000,
      position: data.position ?? 'bottom',
      icon: data.icon ?? globe
    })
    setTimeout(()=>{
      dismissToast()
    },data.duration ?? 1500)
  }

 const onLoginSuccess = async (ret: any) => {
    let user = ret.user
    user.jwt = ret.jwt // Attaching the JWT to the user level and state...
    await setData(user)
    await setIsLoggedIn(true)
    return user
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
          data: { 
            identifier: testing ? 'bunny@gmail.com' : username,
            password: testing ? 'Qwer1234' : password 
          },
          method: 'POST'
        },
        onSuccess: async (ret: StrapiAuthProps)=>{
          await onLoginSuccess(ret)
            .then((user: any)=>{
              launchToast({ 
                message: t("user-wellcome",{ username: user.username }) 
              }, setToast)
                .then(()=> history.push('/login', {direction: 'none'}))            
            })
        },
        onError: (err: Error)=> {
          launchToast({ message: t('No tienes permisos de acceso') }, setToast)
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
              <IonButton className={'ion-activatable ripple-parent'} routerLink="/signup" color="light" expand="block">Signup<IonRippleEffect></IonRippleEffect></IonButton>
            </IonCol>
          </IonRow>
        </form>

      </IonContent>

    </IonPage>
  )
}

export default connect<OwnProps, {}, DispatchProps>({
  mapDispatchToProps: {
    setIsLoggedIn,
    setData
  },
  component: Login
})