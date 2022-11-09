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
        label: t('User or email'),
        types: ['email', 'string'],
        type: 'input',
        value: testing ? process.env.REACT_APP_DEFAULT_USER : undefined,
        onChange: (e:any)=>{
          setUsername(e.detail.value)
        }
      },{
        label: t('Password'),
        type: 'password',
        types: ['password'],
        value: testing ? process.env.REACT_APP_DEFAULT_PASS : undefined,
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