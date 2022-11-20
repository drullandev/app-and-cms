import React, { useState } from 'react'
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput, IonText, useIonToast } from '@ionic/react'
import './Login.scss'
import { setisLoggedIn, setUsername } from '../data/user/user.actions'
import { connect } from '../data/connect'
import { RouteComponentProps } from 'react-router'
import { restCallAsync } from '../classes/core/axios'
import { random } from '../classes/common'
import { globe } from 'ionicons/icons'
import { useTranslation } from 'react-i18next'
import { PageProps } from './core/Page/types'
import Page from './core/Page'
import Form from '../components/core/Form'
import * as yup from 'yup'


let testingSignup = true
let testing = testingSignup && process.env.REACT_APP_TESTING

interface OwnProps extends RouteComponentProps {}

interface DispatchProps {
  setisLoggedIn: typeof setisLoggedIn
  setUsername: typeof setUsername
}

interface LoginProps extends OwnProps, DispatchProps {}

const ResetPassword: React.FC<LoginProps> = ({
  setisLoggedIn,
  history,
  setUsername: setUsernameAction
}) => {

  const [email, setEmail] = useState('')
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [emailError, setEmailError] = useState(false)

  const { t } = useTranslation()

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


  const pageSettings: PageProps = {
    id: 'reset-page',
    header: ()=>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Recover</IonTitle>
        </IonToolbar>    
      </IonHeader>,
    content: ()=> <Form {...pageSettings.methods.resetForm}/>,
    methods: {
      resetForm: {

        id: 'reset-form',
    
        title: {
          label: t('Reset your account...')
        },
    
        rows: [
          {
            cols: [
              {
                type: 'input',
                name: 'email',
                fieldType: 'email',// TODO: Liberate for email and also nickname
                label: t('Email'),
                //value: testing ? process.env.REACT_APP_DEFAULT_USER : undefined,
                required: true,
                //onChange: (e:any)=> setValue('identifier',e.detail.value)    
              }
            ]
          },
          {
            cols: [
              {
                name: 'reset-submit',
                type: 'button',
                fieldType: 'submit',
                label: t('Reset'),
              },
              {
                name: 'reset-cancel',
                type: 'button',
                fieldType: 'link',
                label: t('Cancel'),
                onClick: () : any=> pageSettings.methods.resetForm.methods.onCancel()
              }
            ],
          },
        ],
    
        methods:{
    
          onSubmit: async (data: any) => {

            const onResetSuccess = async (ret: any) => {
              let user = ret.user
              user.jwt = ret.jwt // Attaching the JWT to the user level and state...
              await setisLoggedIn(true)
              return user
            }  
      
            await restCallAsync({
              req: {
                url: 'api/auth/reset-password',
                method: 'POST',
                data: testing
                ? { 
                    email: random(12)+'@gmail.com'
                  }
                : { 
                    email: data.email
                  }
                ,
              },
              onSuccess: {
                default: async (ret: any)=>{
                  await onResetSuccess(ret.data)
                    .then((ret: any)=>{
                      switch (ret.status) {
                        case 200:
                          //setisLoggedIn(true)
                          /*launchToast({ 
                            message: t('user-wellcome', { username: ret.data.user.username }) 
                          }, setToast)
                            .then(()=> history.push('/tabs/schedule', { direction: 'none' }))
                            */
                      }            
                    })
                }
              },
              onError: {
                default: (err: any)=> { 
                  launchToast({ message: t(err.response.data.error.message ?? err.response.data.message[0].messages[0].message) }, setToast)
                }
              }
            })
                        
          },
    
          onCancel: ()=> history.push('/home', { direction: 'none' })      
    
        },
    
        validation: ()=> {
          return yup.object().shape({
            email: yup.string().required().email().min(8),
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
  component: ResetPassword
})