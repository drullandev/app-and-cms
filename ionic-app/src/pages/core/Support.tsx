import React from 'react'
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, useIonToast, IonItem } from '@ionic/react'
import '../../pages/Styles.scss'
import { setisLoggedIn, setUsername } from '../../data/user/user.actions'
import { connect } from '../../data/connect'
import { RouteComponentProps } from 'react-router'
import { restCallAsync } from '../../classes/core/axios'
import { globe } from 'ionicons/icons'
import { useTranslation } from 'react-i18next'
import { PageProps } from './Page/types'

import Form from '../../components/core/Form'
import * as yup from 'yup'
import Page from './Page'

let testingRecover = true
let testing = testingRecover && process.env.REACT_APP_TESTING


interface OwnProps extends RouteComponentProps {}

interface DispatchProps {
  setisLoggedIn: typeof setisLoggedIn
  setUsername: typeof setUsername
}

interface LoginProps extends OwnProps,  DispatchProps { }

const Support: React.FC<LoginProps> = ({
  setisLoggedIn,
  history}) => {

  const { t } = useTranslation()
  const [presentToast] = useIonToast()
 
  const pageSettings: PageProps = {
    id: 'recover-page',
    header: ()=>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Recover</IonTitle>
        </IonToolbar>    
      </IonHeader>,
    content: ()=> <Form {...pageSettings.methods.recoverForm}/>,
    methods: {
      recoverForm: {

        id: 'recover-form',
    
        title: {
          label: t('Recover your account...')
        },
    
        rows: [
          {
            cols:[
              {
                component: <div className="login-logo">
                  <img src="assets/img/appicon.svg" alt="Ionic logo" />
                </div>
              }
            ]
          }, 
          {
            cols: [
              {
                type: 'input',
                name: 'email',
                fieldType: 'textarea',// TODO: Liberate for email and also nickname
                label: t('Set your question'),
                //value: testing ? process.env.REACT_APP_DEFAULT_USER : undefined,
                required: true,
                //onChange: (e:any)=> setValue('identifier',e.detail.value)    
              }
            ]
          },

          {
            cols: [
              {
                name: 'recover-submit',
                type: 'button',
                fieldType: 'submit',
                label: t('Recover'),
              },
              {
                name: 'recover-cancel',
                type: 'button',
                fieldType: 'link',
                label: t('Cancel'),
                onClick: () : any=> pageSettings.methods.recoverForm.methods.onCancel()
              }
            ],
          },
        ],
    
        methods:{
    
          onSubmit: async (data: any) => {

            const onRecoverSuccess = async (ret: any) => {
              let user = ret.user
              user.jwt = ret.jwt // Attaching the JWT to the user level and state...
              await setisLoggedIn(true)
              return user
            }  
      
            await restCallAsync({
              req: {
                url: 'api/auth/forgot-password',
                method: 'POST',
                data: { email: testing ? process.env.REACT_APP_DEFAULT_EMAIL : data.email }
              },
              onSuccess: {
                default: async (ret: any)=>{
                  await onRecoverSuccess(ret.data)
                    .then((ret: any)=>{
                      switch (ret.status) {
                        case 200:
                          presentToast({ 
                            message: t('user-wellcome', { username: ret.data.user.username }) 
                          }).then(()=> history.push('/tabs/schedule', { direction: 'none' }))
                            
                      }            
                    })
                }
              },
              onError:{
                default: (err: any)=> {
                  presentToast({ 
                    message: t(err.response.data.error.message) ?? t(err.response.data.message[0].messages[0].message)
                  })
                }
              }
            })
            
          },
    
          onCancel: ()=> historyPush(process.env.REACT_APP_HOME_PATH)     
    
        },
    
        validation: ()=> {
          return yup.object().shape({
            email: yup.string().required().email().min(8),
          })
        },
    
      }
    }
  }

  const historyPush = (par?: string) => {
    if(par) history.push(par, { direction: 'none' }) 
  }

  return <Page {...pageSettings}/>

}

export default connect<OwnProps, {}, DispatchProps>({
  mapDispatchToProps: {
    setisLoggedIn,
    setUsername
  },
  component: Support
})  