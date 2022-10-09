import React, { useState } from 'react'
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
} from '@ionic/react'

import {
  setId,
  setJwt,
  setUsername,
  setEmail,
  setBlocked,
  setConfirmed,
  setCreatedAt,
  setUpdatedAt,
  setProvider,
  setIsLoggedIn,
} from '../data/user/user.actions'

import { connect } from '../data/connect'
import { RouteComponentProps } from 'react-router'

import { StrapiAuthProps } from '../classes/strapi/models/StrapiAuthProps'
import { sendLoginForm } from '../classes/strapi/login'

import './Login.scss'

interface DispatchProps {
  // Common
  setId:          typeof setId
  setJwt:         typeof setJwt
  setUsername:    typeof setUsername
  setEmail:       typeof setEmail
  setBlocked:     typeof setBlocked
  setConfirmed:   typeof setConfirmed
  setCreatedAt:   typeof setCreatedAt
  setUpdatedAt:   typeof setUpdatedAt
  setProvider:    typeof setProvider
  // Extra
  setIsLoggedIn:  typeof setIsLoggedIn
}

interface OwnProps extends RouteComponentProps {}

interface LoginProps extends OwnProps, DispatchProps { }

const Login: React.FC<LoginProps> = ({
  history, 
  setId:        setIdAction,
  setJwt:       setJwtAction,
  setUsername:  setUsernameAction,
  setEmail:     setEmailAction,
  setBlocked:   setBlockedAction,
  setConfirmed: setConfirmedAction,
  setCreatedAt: setCreatedAtAction,
  setUpdatedAt: setUpdatedAtAction,
  setProvider:  setProviderAction,
  setIsLoggedIn, 
}) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [formSubmitted, setFormSubmitted] = useState(false)
  const [usernameError, setUsernameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  const [setToast, dismissToast] = useIonToast()

  const submitLogin = async (e: React.FormEvent) => {

    e.preventDefault()
    setFormSubmitted(true)
    
    if(!username) {
      setUsernameError(true)
    }
    if(!password) {
      setPasswordError(true)
    }

    if(username && password) {

      const onLoginSuccess = async (ret: StrapiAuthProps) => {
        setIdAction(ret.user.id)
        setJwtAction(ret.jwt)
        setUsernameAction(ret.user.username)
        setEmailAction(ret.user.email)
        setBlockedAction(ret.user.blocked)
        setConfirmedAction(ret.user.confirmed)
        setCreatedAtAction(ret.user.createdAt)
        setUpdatedAtAction(ret.user.updatedAt)
        setProviderAction(ret.user.provider)
        setIsLoggedIn(true)
      }
      

      await sendLoginForm({
        data: { 
          identifier: 'bunny@gmail.com',
          password: 'Qwer1234' 
        },
        onSuccess: (ret: StrapiAuthProps)=>{
          onLoginSuccess(ret)
            .then(()=>{
              setToast({
                message: 'Has logrado logearte',
                duration: 1500,
                position: 'top'
              })
                .then(()=> history.push('/tabs/schedule', {direction: 'none'}))            
            })
        },
        onError: (err: Error)=> console.log('error', err)        
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
    setId,
    setJwt,
    setUsername,
    setEmail,
    setBlocked, 
    setConfirmed,
    setCreatedAt,
    setUpdatedAt,
    setProvider,
    setIsLoggedIn,
  },
  component: Login
})