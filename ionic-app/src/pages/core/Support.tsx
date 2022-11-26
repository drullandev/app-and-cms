import React, { useEffect } from 'react'
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, useIonToast } from '@ionic/react'
import { RouteComponentProps } from 'react-router'

import { useTranslation } from 'react-i18next'
import * as icon from 'ionicons/icons'
import * as yup from 'yup'

import { restCallAsync } from '../../classes/core/axios'

import { connect } from '../../data/connect'
import { setisLoggedIn, setLoading } from '../../data/user/user.actions'

import Page from '../../components/core/Page'
import { PageProps } from '../../components/core/Page/types'
import Form from '../../components/core/Form'

let testingFeature = true
let testing = testingFeature && process.env.REACT_APP_TESTING

interface OwnProps extends RouteComponentProps {}

interface StateProps {}

interface DispatchProps {
  setLoading: typeof setLoading
  setisLoggedIn: typeof setisLoggedIn
}

interface LoginProps extends OwnProps, StateProps, DispatchProps {}

const Support: React.FC<LoginProps> = ({
  setisLoggedIn,
  setLoading,
  history
}) => {

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
    footer: ()=> <></>,
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
                icon: icon.scan,
                label: t('Recover'),
              },
              {
                name: 'recover-cancel',
                type: 'button',
                fieldType: 'link',
                label: t('Cancel'),
                fill: 'outline',
                icon: icon.close,
                onClick: () : any=> pageSettings.methods.recoverForm.methods.onCancel()
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
                default: presentToast
              }
            })
            setLoading(false)
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

  useEffect(pageSettings.methods.onLoad,[])
  return <Page {...pageSettings}/>

}

export default connect<StateProps,{}, DispatchProps>({
  mapStateToProps: (state) => ({}),
  mapDispatchToProps: {
    setisLoggedIn,
    setLoading
  },
  component: Support
})  