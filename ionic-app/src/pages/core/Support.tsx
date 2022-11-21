import React, { useState } from 'react'
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonText, IonTextarea, IonToast } from '@ionic/react'
import '../../pages/Styles.scss'
import { connect } from '../../data/connect'

interface OwnProps { }

interface DispatchProps { }

interface SupportProps extends OwnProps, DispatchProps { }

const Support: React.FC<SupportProps> = () => {

  const [message, setMessage] = useState('')
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [messageError, setMessageError] = useState(false)
  const [showToast, setShowToast] = useState(false)

  const send = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
    if (!message) {
      setMessageError(true)
    }
    if (message) {
      setMessage('')
      setShowToast(true)
    }
  }

  return (
    <IonPage id="support-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Support</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        <div className="login-logo">
          <img src="assets/img/appicon.svg" alt="Ionic logo" />
        </div>

        <form noValidate onSubmit={send}>
          <IonList>
            <IonItem>
              <IonLabel position="stacked" color="primary">Enter your support message below</IonLabel>
              <IonTextarea name="message" value={message} spellCheck={false} autocapitalize="off" rows={6} onIonChange={e => setMessage(e.detail.value!)}
                required>
              </IonTextarea>
            </IonItem>

            {formSubmitted && messageError && <IonText color="danger">
              <p className="ion-padding-start">
                Support message is required
              </p>
            </IonText>}
          </IonList>

          <IonRow>
            <IonCol>
              <IonButton type="submit" expand="block">Submit</IonButton>
            </IonCol>
          </IonRow>
        </form>
       
      </IonContent>
     
      <IonToast
        isOpen={showToast}
        duration={3000}
        message="Your support request has been sent"
        onDidDismiss={() => setShowToast(false)} />
    </IonPage>
  )



  const { t } = useTranslation()
  const [presentToast] = useIonToast()

  const pageSettings: PageProps = {
    id: 'login-page',
    header: ()=> <Header label={'Login'} loading={false}/>,
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
          {
            cols:[
              {
                name: 'wanna.redirect',
                component: <IonItem>
                  <a onClick={()=> history.push('/recover', { direction: 'none' }) }>{t("You don't remember your account?")}</a>
                </IonItem>
              }
            ]
          },          
          {
            cols: [
              {
                name: 'login-submit',
                type: 'button',
                fieldType: 'submit',
                label: t('Login'),
                icon: icon.logIn
              },
              {
                name: 'login-cancel',
                type: 'button',
                fieldType: 'link',
                label: t('Cancel'),
                fill: 'outline',
                icon: icon.close,
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
                    duration: 1000,
                    color: 'success'
                  }
    
                  presentToast(loginOutput)
                    .then(()=> history.push('/tabs/schedule', { direction: 'none' }))

                  return true
                }         
              },
              onError: {
  
                default: (err: any)=> {

                  let errorOutput = {
                    icon: icon.closeCircleOutline,
                    message: '',
                    duration: 1000,
                    color: 'warning'
                  }

                  switch(err.response?.status){
                    case 400:
                      errorOutput.message = t(err.response.data.error.message)
                    break
                    default:
                      errorOutput.message = t(err.response.data.message[0].messages[0].message)
                  }

                  presentToast(errorOutput)
                  return false    
                }      
              }
            })

          },
    
          onCancel: ()=> history.push('/home', { direction: 'none' })      
    
        },
    
        validation: ()=> {
          return yup.object().shape({
            identifier: yup.string().email().required().min(3),
            password: yup.string().required().min(6).max(64)
          })
        },
    
      }
    }
  }

  return <Page {...pageSettings}/>




}

export default connect<OwnProps, {}, DispatchProps>({
  component: Support
})