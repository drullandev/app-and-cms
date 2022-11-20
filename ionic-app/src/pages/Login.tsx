// Required
import React from 'react'
import { RouteComponentProps } from 'react-router'
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, useIonToast } from '@ionic/react'

// Extra required
import { useTranslation } from 'react-i18next'

// Reducer settings
import { connect } from '../data/connect'
import { restCallAsync } from '../classes/core/axios'
import { setData } from '../data/user/user.actions'

// Form settings
import * as yup from 'yup'
import Form from '../components/core/Form'
import Page from './core/Page'
import { PageProps } from './core/Page/types'

// Design Dependencies
import * as icon from 'ionicons/icons'

// Are you testing this tools set && app?
let testingLogin = true
let testing = testingLogin && process.env.REACT_APP_TESTING

// Component Dependencies
interface OwnProps extends RouteComponentProps {}

interface DispatchProps {
  setData: typeof setData
}

interface LoginProps extends OwnProps, DispatchProps {}

const Login: React.FC<LoginProps> = ({
  history,
  setData
}) => {

  const { t } = useTranslation();

  const [setToast, dismissToast] = useIonToast()
  const launchToast = async (data: any, setToast: Function) => {
    let dur = data.duration ?? 2000
    await setToast({
      message: data.message,
      duration: dur ?? 1000,
      position: data.position ?? 'bottom',
      icon: data.icon ?? icon.globe
    })
    setTimeout(()=> dismissToast(), dur + 500)
    return true
  }

  const pageSettings: PageProps = {
    id: 'login-page',
    header: ()=>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Login</IonTitle>
        </IonToolbar>    
      </IonHeader>,
    content: ()=> <Form {...pageSettings.methods.loginForm}/>,
    methods: {
      loginForm: {

        id: 'login-form',
    
        title: {
          label: t('Login form')
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
                name: 'identifier',
                fieldType: 'email',// TODO: Liberate for email and also nickname
                label: t('User or email'),
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

            await restCallAsync({
              req: {
                url: 'api/auth/local',
                method: 'POST',
                data: { 
                  identifier: testing ? process.env.REACT_APP_DEFAULT_USER : data.identifier,
                  password: testing ? process.env.REACT_APP_DEFAULT_PASS : data.password,
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
                  .then(()=>
                    history.push('/tabs/schedule', { direction: 'none' }
                  ))
                  return true
                }         
              },
              onError: {
  
                default: (err: any)=> {
                  let message = err?.response.status 
                    ? t(err.response.data.error.message)
                    : t(err.response.data.message[0].messages[0].message)
                  //launchToast({ message: message }, setToast)
                  return false    
                }      
              }
            })

          },
    
          onCancel: ()=> history.push('/home', { direction: 'none' })      
    
        },
    
        validation: ()=> {
          return yup.object().shape({
            identifier: yup.string().required().min(3),
            password: yup.string().required().min(6).max(64)
          })
        },
    
      }
    }
  }

  return <Page {...pageSettings}/>
  
}

export default connect<OwnProps, {}, DispatchProps>({
  mapDispatchToProps: {
    setData
  },
  component: Login
})