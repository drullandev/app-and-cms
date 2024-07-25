import React, { useEffect } from 'react'
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, useIonToast } from '@ionic/react'
import { RouteComponentProps } from 'react-router'

import RestAPI from '../../classes/Rest'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'

import { setLoading } from '../../reducer/data/sessions/sessions.actions'
import { connect } from '../../reducer/src/connect'

import Form from '../../components/Form'
import Page from '../../components/Page'
import { PageProps } from '../../components/Page/types'
import * as icon from 'ionicons/icons'
import { setisLogged } from '../../reducer/data/user/user.actions'

// Component Reducer
import { OwnProps, ComponentProps, StateProps, DispatchProps, mapStateToProps, mapDispatchToProps } from './reducer'
import DebugUtil from '../../classes/DebugUtil'

const Support: React.FC<ComponentProps> = ({
  setLoading,
  history
}) => {

  const { t } = useTranslation()
  const [presentToast] = useIonToast()
 
  const pageSettings: PageProps = {
    settings: {
      id: 'support-page'
    },
    header: ()=>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>{t('Support')}</IonTitle>
        </IonToolbar>    
      </IonHeader>,
    content: ()=> <Form {...pageSettings.methods.supportForm}/>,
    footer: ()=> <></>,
    methods: {
      onLoad: ()=>{
        
      },
      supportForm: {

        id: 'support-form',
    
        title: {
          label: t('Ask for support...')
        },
    
        rows: [
          {
            cols:[
              {
                component: <div className="login-logo">
                  <img src="assets/img/appicon.svg" alt="Ionic logo"/>
                </div>
              }
            ]
          }, 
          {
            cols: [
              {
                type: 'input',
                name: 'complaint',
                fieldType: 'textarea',// TODO: Liberate for email and also nickname
                label: t('Set your question'),
                required: true,
                //value: testing ? import.meta.env.REACT_APP_DEFAULT_USER : undefined,
                //onChange: (e:any)=> setValue('identifier',e.detail.value)    
              }
            ]
          },

          {
            cols: [
              {
                name: 'support-submit',
                type: 'button',
                fieldType: 'submit',
                label: t('Send'),
                icon: icon.shuffle
              },
              {
                name: 'support-cancel',
                type: 'button',
                fieldType: 'link',
                label: t('Cancel'),
                fill: 'outline',               
                icon: icon.close, 
                onClick: () : any=> pageSettings.methods.supportForm.methods.onCancel()
              }
            ],
          },
        ],
    
        methods:{
          onLoad: ()=>{
            setLoading(false)
          },
          onSubmit: async (data: any) => {
            setLoading(true)
            const onSupportSuccess = async (ret: any) => {

            }  
      
            await RestAPI.restCallAsync({
              req: {
                //url: 'api/auth/forgot-password',
                method: 'POST',
                data: { email: testing ? import.meta.env.REACT_APP_DEFAULT_EMAIL : data.email }
              },
              onSuccess: {
                default: async (ret: any)=>{
                  /*await onSupportSuccess(ret.data)
                    .then((ret: any)=>{
                      switch (ret.status) {
                        case 200:
                          presentToast({ 
                            message: t('user-wellcome', { username: ret.data.user.username }) 
                          }).then(()=> history.push('/tabs/schedule', { direction: 'none' }))
                            
                      }            
                    })*/
                }
              },
              onError:{
                default: presentToast
              }
            })
            setLoading(false)
          },
    
          onCancel: ()=> historyPush(import.meta.env.REACT_APP_HOME_PATH)     
    
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

  useEffect(pageSettings.methods.onLoad,[])
  return <Page {...pageSettings}/>

}

export default connect<OwnProps, StateProps, DispatchProps>({ mapStateToProps, mapDispatchToProps, component: Support });