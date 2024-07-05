import React from 'react'
import { IonContent, useIonToast } from '@ionic/react'
import { RouteComponentProps } from 'react-router'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import * as icon from 'ionicons/icons'

import { setisLoggedIn, setUsername } from '../../../data/user/user.actions'
import { connect } from '../../../data/connect'

import '../../../styles/index.scss'
import RestAPI from '../../../classes/RestCall'
import { PageProps } from '../../../components/core/Page/types'
import Form from '../../../components/core/Form/Form'
import Page from '../../../components/core/Page'
import Header from '../../../components/core/main/Header'
import { FormProps } from '../../../components/core/Form/types'
import { DeepMap, FieldError } from 'react-hook-form'

let testingRecover = true
let testing = testingRecover && import.meta.env.REACT_APP_TESTING

interface OwnProps extends RouteComponentProps {}

interface DispatchProps {
  setisLoggedIn: typeof setisLoggedIn
  setUsername: typeof setUsername
}

interface LoginProps extends OwnProps,  DispatchProps { }

const Recover: React.FC<LoginProps> = ({
  setisLoggedIn,
  history
}) => {

  const { t } = useTranslation()
  const [presentToast] = useIonToast()
 
  const pageSettings: PageProps = {

    id: 'recover-page',
    header: ()=> <Header label={"Recover"} slot="start"/>,
    content: ()=>{

      const formData: FormProps = {

        id: 'recover-form',

        settings: {

        },
    
        //title: {
        //  label: t('Recover your account...')
        //},
        rows: [ 
          /*{
            component: <div className="login-logo">
              <img src="assets/img/appicon.svg" alt="Ionic logo" />
            </div>
          }, */
          {
              type: 'input',
              name: 'email',
              //fieldType: 'email',// TODO: Liberate for email and also nickname
              label: t('Email'),
              //value: testing ? import.meta.env.REACT_APP_DEFAULT_USER : undefined,
              required: true,
              //onChange: (e:any)=> setValue('identifier',e.detail.value)    
              validationSchema: yup.string().required().email().min(8),
          },
          {
            name: 'recover-submit',
            type: 'button',
            //fieldType: 'submit',
            label: t('Recover'),
            icon: icon.person
          },
          {
            name: 'recover-cancel',
            type: 'button',
            label: t('Cancel'),
            fill: 'outline',
            icon: icon.close,
            onClick: () : any=> pageSettings.methods.recoverForm.methods.onCancel()
          },
          {
            name: 'login-submit',
            type: 'button',
            label: t("Do you remember your account?"),
            color: 'clear',
            icon: icon.logIn,
            onClick: ()=>history.push('/login', { direction: 'none' })
          },
        ],

        onSuccess: async (data: any) => {

          const onRecoverSuccess = async (ret: any) => {
            let user = ret.user
            user.jwt = ret.jwt // Attaching the JWT to the user level and state...
            await setisLoggedIn(true)
            return user
          }  
    
          await RestAPI.restCallAsync({
            req: {
              url: '/auth/forgot-password',
              method: 'POST',
              data: { email: data.email }
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

        onError: (errors: DeepMap<Record<string, any>, FieldError>) =>{
          presentToast({
            message: 'Login error!',
            duration: 2000,
            color: 'warning',
          });
        }
        
      };

      return <IonContent>
        <Form {...formData}/>
      </IonContent>

    },
    footer: ()=>{
      return <></>
    }

  }

  return <Page {...pageSettings}/>

}

export default connect<OwnProps, {}, DispatchProps>({
  mapDispatchToProps: {
    setisLoggedIn,
    setUsername
  },
  component: Recover
})