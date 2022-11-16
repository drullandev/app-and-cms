// Required
import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, useIonToast } from '@ionic/react'

// Extra required
import { OnSubmit } from 'react-hook-form'
import { FieldValues } from "react-hook-form"
import { useTranslation } from 'react-i18next'

// Reducer settings
import { connect } from '../data/connect'
import { restCallAsync } from '../classes/core/axios'
import { setData } from '../data/user/user.actions'

// My React Dependencies
import Form from '../components/core/Form/Form'
import { FormProps } from '../components/core/Form/FormProps'

// Design Dependencies
import { globe } from 'ionicons/icons'
import './Login.scss'

// Are you testing this tools set && app?
let testingLogin = false
let testing = testingLogin && process.env.REACT_APP_TESTING

// Component Dependencies
interface OwnProps extends RouteComponentProps {}

interface DispatchProps {
  setData: typeof setData;
}

interface LoginProps extends OwnProps, DispatchProps {}

const Login: React.FC<LoginProps> = ({
  history,
  setData
}) => {

  const { t } = useTranslation();

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

  const loginForm : FormProps = {

    rows: [
      /*{
        name: 'login-header',          
        type: 'component',
        //component: ()=>  <Header/>
      },
      {
        name: 'app-icon',
      },*/
      {
        cols: [
          {
            name: 'identifier',
            label: t('User or email'),
            fieldType: 'email',// TODO: Liberate for email and also nickname
            type: 'input',
            value: testing ? process.env.REACT_APP_DEFAULT_USER : undefined,
            required: true,
            onChange: (e:any)=> setUsername(e.detail.value)    
          }
        ]
      },
      {
        cols: [
          {
            name: 'password',
            label: t('Password'),
            type: 'input',
            fieldType: 'password',
            value: testing ? process.env.REACT_APP_DEFAULT_PASS : undefined,
            required: true,
            onChange: (e:any)=> setPassword(e.detail.value)
          }
        ]
      },
      /*
      {
        name: 'terms'
      },*/
      {
        cols: [
          {
            name: 'login-submit',
            label: 'Login',
            type: 'button',
            fieldType: 'submit',
            onSubmit: (e:any) => loginForm.methods.onSubmit(e)
          },
          {
            name: 'login-cancel',
            label: 'Cancel',
            type: 'button',
            fieldType: 'cancel',
            routerLink: '/home',
            onClick: () : any=> loginForm.methods.onCancel()
          }
        ],
      },
    ],

    methods:{

      onSubmit:  async (e: OnSubmit<FieldValues>) => {

        console.log(e)

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
  
              default: async (ret:any)=>{
    
                // Set user state
                let user = ret.data.user
                user.jwt = ret.jwt // Attaching the JWT to the user level and state...
                user.isLoggedIn = true
                await setData(user)
  
                launchToast({ 
                  message: t('user-wellcome', { username: ret.data.user.username }) 
                }, setToast)
                //.then(()=>
                //  history.push('/tabs/schedule', { direction: 'none' }
                //))
                return true
              }         
            },
            onError: {

              default: (err: any)=> {
                let message = err?.response.status 
                  ? t(err.response.data.error.message)
                  : t(err.response.data.message[0].messages[0].message)
                launchToast({ message: message }, setToast)
                return false    
              }      
            }
          })
        
        }
    
      },

      onCancel: ()=> history.push('/home', { direction: 'none' })      

    },

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
        <Form {...loginForm}/>
      </IonContent>

    </IonPage>
  )

}

export default connect<OwnProps, {}, DispatchProps>({
  mapDispatchToProps: {
    setData
  },
  component: Login
})