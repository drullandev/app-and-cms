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
  IonText
} from '@ionic/react'
import {
  setIsLoggedIn,
  setUsername,
  setJwt,
  setBlocked,
  setConfirmed,
  setEmail,
  setCreatedAt,
  setUpdatedAt,
  setProvider,
  setId
} from '../data/user/user.actions'

import { connect } from '../data/connect'
import { RouteComponentProps } from 'react-router'
import { restCallAsync } from '../calls/axios'

import './Login.scss'

interface OwnProps extends RouteComponentProps {}

interface DispatchProps {
  setIsLoggedIn: typeof setIsLoggedIn
  setUsername: typeof setUsername
  setJwt: typeof setJwt
  setBlocked: typeof setBlocked
  setConfirmed: typeof setConfirmed
  setEmail: typeof setEmail
  setCreatedAt: typeof setCreatedAt
  setUpdatedAt: typeof setUpdatedAt
  setProvider: typeof setProvider
  setId: typeof setId
}

interface LoginProps extends OwnProps,  DispatchProps { }

export interface StrapiAuthProps {
  user: {
    username?: string
    blocked?: boolean
    confirmed?: boolean
    email?: string
    createdAt?: string
    updatedAt?: string
    provider?: string
    id?: string
  },
  jwt?: string
}

const Login: React.FC<LoginProps> = ({
  history, 
  setIsLoggedIn, 
  setUsername: setUsernameAction,
  setJwt: setJwtAction,
  setBlocked: setBlockedAction,
  setConfirmed: setConfirmedAction,
  setEmail: setEmailAction,
  setCreatedAt: setCreatedAtAction,
  setUpdatedAt: setUpdatedAtAction,
  setProvider: setProviderAction,
  setId: setIdAction
}) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [formSubmitted, setFormSubmitted] = useState(false)
  const [usernameError, setUsernameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  const tmpLoginData = {

  }

  const onLoginSuccess = (ret: StrapiAuthProps) => {
    setIsLoggedIn(true)
    setUsernameAction(ret.user.username)
    setBlockedAction(ret.user.blocked)
    setConfirmedAction(ret.user.confirmed)
    setCreatedAtAction(ret.user.createdAt)
    setUpdatedAtAction(ret.user.updatedAt)
    setProviderAction(ret.user.provider)
    setEmailAction(ret.user.email)
    setIdAction(ret.user.id)
    setJwtAction(ret.jwt)
  }

  const login = async (e: React.FormEvent) => {

    e.preventDefault()
    setFormSubmitted(true)
    
    if(!username) {
      setUsernameError(true)
    }
    if(!password) {
      setPasswordError(true)
    }

    if(username && password) {

      await restCallAsync({
        req: {
          url: 'auth/local',
          data:
            { 
              identifier: 'bunny@gmail.com',
              password: 'Qwer1234' 
            }          
          ,
          method: 'post'
        },
        onSuccess: (ret: StrapiAuthProps)=>{
          onLoginSuccess(ret)
        },
        onError: (err: Error)=> {
          console.log('estoy aquí', err)
        }
      
      })

      history.push('/tabs/schedule', {direction: 'none'})

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

        <form noValidate onSubmit={login}>
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
    setIsLoggedIn,
    setUsername,
    setJwt,
    setBlocked, 
    setConfirmed,
    setEmail,
    setCreatedAt,
    setUpdatedAt,
    setProvider,
    setId
  },
  component: Login
})