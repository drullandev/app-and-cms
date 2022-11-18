// Required
import React from 'react'
import { RouteComponentProps } from 'react-router'
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, useIonToast } from '@ionic/react'

// Extra required
import { useTranslation } from 'react-i18next'

// Reducer settings
import { connect } from '../data/connect'
import { restCallAsync } from '../classes/core/axios'
import { setData } from '../data/user/user.actions'

// Form settings
import * as yup from 'yup'
import Form from '../components/core/Form'
import { FormProps } from '../components/core/Form/types'

// Design Dependencies
import { globe } from 'ionicons/icons'

// Are you testing this tools set && app?
let testingLogin = true
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

  const loginForm: FormProps = {

    id: 'login-form',

    title: {
      label: 'Login form'
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
            label: t('Login'),
            type: 'button',
            fieldType: 'submit',
            //onSubmit: (e:any) => loginForm.methods.onSubmit(e)
          },
          {
            name: 'login-cancel',
            label: t('Cancel'),
            type: 'button',
            fieldType: 'link',
            routerLink: '/home',
            //onClick: () : any=> loginForm.methods.onCancel()
          }
        ],
      },
    ],

    methods:{

      onSubmit:  async (data: any) => {

        if(data.identifier && data.password) {
    
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
        
        }
      },

      onCancel: ()=> console.log('sdfsd')//history.push('/home', { direction: 'none' })      

    },

    validation: ()=> {
      return yup.object().shape({
        identifier: yup.string().required(),
        password: yup.string().required()
      })
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