import React, { useState } from 'react'
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, useIonToast } from '@ionic/react'

import './Login.scss';
import { setData, setisLoggedIn, setUsername, setDarkMode } from '../data/user/user.actions';
import { connect } from '../data/connect';
import { RouteComponentProps } from 'react-router';
import { restCallAsync } from '../classes/core/axios';
import { globe } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';

import FormNew from '../components/core/forms/FormNew'
import { Controller } from 'react-hook-form';

let testingLogin = true
let testing = testingLogin && process.env.REACT_APP_TESTING


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

  const { t, i18n } = useTranslation();

  const [username, setUsername] = useState(testing ? process.env.REACT_APP_DEFAULT_USER : '')
  const [password, setPassword] = useState(testing ? process.env.REACT_APP_DEFAULT_PASS : '')

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

  const loginForm = {

    fields: [
      {
        name: 'identifier',
        label: t('User or email'),
        fieldType: 'email',// TODO: Liberate for email and also nickname
        type: 'input',
        value: testing ? process.env.REACT_APP_DEFAULT_USER : undefined,
        required: true,
        onChange: (e:any)=>{
          setUsername(e.detail.value)
        }
      },{
        name: 'password',
        label: t('Password'),
        type: 'input',
        fieldType: 'password',
        value: testing ? process.env.REACT_APP_DEFAULT_PASS : undefined,
        required: true,
        onChange: (e:any)=>{
          setPassword(e.detail.value)
        }
      }
    ],

    onSubmit: async (e: React.FormEvent) => {

      console.log('asdfasd')

      //e.preventDefault()

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
          onSuccess: {

            200: async (ret:any)=>{
  
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

            }         
          },
          onError: {
            400: (err: any)=> {
              launchToast({ message: err?.response.status ? t(err.response.data.error.message) : t(err.response.data.message[0].messages[0].message) }, setToast)
            }          
          }
        })
      
      }
  
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
        <FormNew {...loginForm}/>
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