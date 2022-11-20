// Required
import React from 'react'
import { RouteComponentProps } from 'react-router'
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, useIonToast } from '@ionic/react'
import '../../pages/Styles.scss'

// Extra required
import { useTranslation } from 'react-i18next'

// Reducer settings
import { connect } from '../../data/connect'
import { restCallAsync } from '../../classes/core/axios'
import { setData } from '../../data/user/user.actions'

// Page dependencies
import Page from './Page'
import { PageProps } from './Page/types'

// Form settings
import * as yup from 'yup'
import Form from '../../components/core/Form'

// Design Dependencies
import * as icon from 'ionicons/icons'
import { ToastOptions } from '@ionic/react/dist/types/components/IonToast'
import Header from '../../components/core/main/Header'

// Are you testing this tools set && app?
let testingLogin = true
let testing = testingLogin && process.env.REACT_APP_TESTING
// - The main testing user will be used under testing

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
  const launchToast = async (data: ToastOptions, setToast: Function) => {
    let dur = data.duration ?? 2000
    let toastSettings: ToastOptions = {
      message: data.message,
      duration: dur ?? 1000,
      position: data.position ?? 'bottom',
      icon: data.icon ?? icon.globe,
      buttons: [
        {
          text: 'Ok',
          role: 'cancel'
        }
      ],
    }
    await setToast(toastSettings)
    setTimeout(()=> dismissToast(), dur + 500)
    return true
  }

  const pageSettings: PageProps = {
    id: 'login-page',
    header: ()=> <Header label={'Login'}/>,
    content: ()=> <Form {...pageSettings.methods.loginForm}/>,
    methods: {
      loginForm: {

        id: 'login-form',
    
        title: {
          label: t('Login to your account...')
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

                  let loginOutput = { 
                    message: t('user-wellcome', { username: ret.data.user.username }),
                    icon: icon.checkmarkCircleOutline,
                    type: 'success'
                  }
    
                  launchToast(loginOutput, setToast)
                    .then(()=> history.push('/tabs/schedule', { direction: 'none' }))
                  return true
                }         
              },
              onError: {
  
                default: (err: any)=> {

                  let errorOutput = {
                    icon: icon.closeCircleOutline,
                    message: '',
                    type: 'warning'
                  }

                  switch(err.response?.status){
                    case 400:
                      errorOutput.message = t(err.response.data.error.message)
                    break
                    default:
                      errorOutput.message = t(err.response.data.message[0].messages[0].message)
                  }

                  launchToast(errorOutput, setToast)
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