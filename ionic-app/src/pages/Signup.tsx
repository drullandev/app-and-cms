import React from 'react'
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, useIonToast } from '@ionic/react'
import './Login.scss'
import { setisLoggedIn, setUsername } from '../data/user/user.actions'
import { connect } from '../data/connect'
import { RouteComponentProps } from 'react-router'
import { restCallAsync } from '../classes/core/axios'
import { random } from '../classes/common'
import { globe } from 'ionicons/icons'
import { useTranslation } from 'react-i18next'
import { PageProps } from './core/Page/types'

import * as yup from 'yup'
import Form from '../components/core/Form'
import Page from './core/Page'

// Testing this module?
let testingSignup = true
let testing = testingSignup && process.env.REACT_APP_TESTING

interface OwnProps extends RouteComponentProps {}

interface DispatchProps {
  setisLoggedIn: typeof setisLoggedIn
  setUsername: typeof setUsername
}

interface SignupProps extends OwnProps,  DispatchProps { }

const Signup: React.FC<SignupProps> = ({
  setisLoggedIn,
  history,
  setUsername: setUsernameAction
}) => {

  const {t} = useTranslation()

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

  const pageSettings: PageProps = {
    id: 'signup-page',
    header: ()=>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Signup</IonTitle>
        </IonToolbar>    
      </IonHeader>,
    content: ()=> <Form {...pageSettings.methods.signupForm}/>,
    methods: {
      signupForm: {

        id: 'signup-form',
    
        title: {
          label: t('Signup form')
        },
    
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
                type: 'input',
                name: 'username',
                fieldType: 'text',// TODO: Liberate for email and also nickname
                label: t('Nickname'),
                //value: testing ? process.env.REACT_APP_DEFAULT_USER : undefined,
                required: true,
                //onChange: (e:any)=> setValue('identifier',e.detail.value)    
              }
            ]
          },
          {
            cols: [
              {
                type: 'input',
                name: 'email',
                fieldType: 'email',
                label: t('Email'),
                //value: testing ? process.env.REACT_APP_DEFAULT_PASS : undefined,
                required: true,
                //onChange: (e:any)=> setPassword(e.detail.value)
              }
            ]
          },
          {
            cols: [
              {
                type: 'input',
                name: 'password',
                fieldType: 'password',
                label: t('Password'),
                //value: testing ? process.env.REACT_APP_DEFAULT_PASS : undefined,
                required: true,
                //onChange: (e:any)=> setPassword(e.detail.value)
              }
            ]
          },
          /*
          {
            name: 'terms'
          },
          */
          {
            cols: [
              {
                name: 'login-submit',
                type: 'button',
                fieldType: 'submit',
                label: t('Login'),
              },
              {
                name: 'login-cancel',
                type: 'button',
                fieldType: 'link',
                label: t('Cancel'),
                onClick: () : any=> pageSettings.methods.loginForm.methods.onCancel()
              }
            ],
          },
        ],
    
        methods:{
    
          onSubmit: async (data: any) => {
        
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
                    username: data.username,
                    password: data.password,
                    email: data.email
                  }
                ,
              },
              onSuccess: { 
                default: async (ret: any)=>{
                  await onSignupSuccess(ret.data)
                    .then((ret: any)=>{
                      switch (ret.status) {
                        case 200:
                          setisLoggedIn(true)
                          launchToast({ 
                            message: t('user-wellcome', { username: ret.data.user.username }) 
                          }, setToast)
                            .then(()=> history.push('/tabs/schedule', { direction: 'none' }))                            
                      }            
                    })
                }
              },
              onError: {
                default: (err: any)=> {
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
        
          },
    
          onCancel: ()=> history.push('/home', { direction: 'none' })      
    
        },
    
        validation: ()=> {
          return yup.object().shape({
            username: yup.string().required().min(3),
            email: yup.string().email().min(8),
            password: yup.string().required().min(6).max(64),//64 was arbitrary...
          })
        },
    
      }
    }
  }

  return <Page {...pageSettings}/>
  
}

export default connect<OwnProps, {}, DispatchProps>({
  mapDispatchToProps: {
    setisLoggedIn,
    setUsername
  },
  component: Signup
})