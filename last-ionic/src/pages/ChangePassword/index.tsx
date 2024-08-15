import React from 'react'
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, useIonToast } from '@ionic/react'
import '../../styles/index.scss'

import { setisLogged, setUsername } from '../../reducer/data/user/user.actions'
import { connect } from '../../reducer/src/connect'
import { RouteComponentProps } from 'react-router'
import RestAPI from '../../classes/Rest'
import StringUtil from '../../classes/StringUtil'
import { useTranslation } from 'react-i18next'
import PagePropsData from '../../components/Page/types'
import Page from '../../components/Page'
import Form from '../../components/Form'
import * as yup from 'yup'
import * as icon from 'ionicons/icons'
import Icon from '../../components/_main/Icon'
import { OwnProps, ComponentProps, StateProps, DispatchProps, mapStateToProps, mapDispatchToProps } from './reducer'
import DebugUtil from '../../classes/DebugUtil'

const ChangePassword: React.FC<ComponentProps> = ({
  setisLogged,
  history,
  setUsername: setUsernameAction
}) => {

  const debug = DebugUtil.setDebug(false)

  const { t } = useTranslation();
  const [presentToast] = useIonToast()

  const pageSettings: PagePropsData = {
    settings: {
      id: 'reset-page'
    },
    header: ()=>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>{t('Reset account')}</IonTitle>
        </IonToolbar>    
      </IonHeader>,
    content: ()=> <Form {...pageSettings.methods.resetForm}/>,
    footer: ()=> <></>,
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
                //value: testing ? import.meta.env.REACT_APP_DEFAULT_USER : undefined,
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
                icon: icon.person,
              },
              {
                name: 'reset-cancel',
                type: 'button',
                fieldType: 'link',
                label: t('Cancel'),
                fill: 'outline',
                icon: icon.close,
                onClick: () : any=> pageSettings.methods.resetForm.methods.onCancel()
              }
            ],
          },
          {
            cols: [
              {
                name: 'wanna-reset',
                type: 'button',
                label: t("Do you remember your account?"),
                color: 'clear',
                icon: icon.logIn,
                onClick: ()=>history.push('/login', { direction: 'none' })
              },
            ]
          },    
        ],
    
        methods:{
    
          onSubmit: async (data: any) => {

            const onResetSuccess = async (ret: any) => {
              let user = ret.user
              user.jwt = ret.jwt // Attaching the JWT to the user level and state...
              await setisLogged(true)
              return user
            }  
      
            await RestAPI.restCallAsync({
              req: {
                url: 'api/auth/reset-password',
                method: 'POST',
                data: { 
                  email: debug ? StringUtil.random(12)+'@gmail.com' :  data.email
                }
              },
              onSuccess: {
                default: async (ret: any) => {
                  await onResetSuccess(ret.data)
                    .then((ret: any) => {
                      switch (ret.status) {
                        case 200:
                          //setisLogged(true)
                          presentToast({ 
                            message: t('user-wellcome', { username: ret.data.user.username }) 
                          })
                            .then(()=> history.push('/tabs/schedule', { direction: 'none' }))
                            
                      }            
                    })
                }
              },
              onError: {
                default: (err: any)=> { 
                  presentToast({ message: t(err.response.data.error.message ?? err.response.data.message[0].messages[0].message) })
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

export default connect<OwnProps, StateProps, DispatchProps>({ mapStateToProps, mapDispatchToProps, component: ChangePassword });