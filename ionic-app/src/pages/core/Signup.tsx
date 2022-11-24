import React, { useEffect } from 'react'
import { useIonToast } from '@ionic/react'
import '../../pages/Styles.scss'
import { setisLoggedIn, setUsername, setLoading } from '../../data/user/user.actions'
import { connect } from '../../data/connect'
import { RouteComponentProps } from 'react-router'
import { restCallAsync } from '../../classes/core/axios'
import { random } from '../../classes/common'
import { useTranslation } from 'react-i18next'
import { PageProps } from '../../components/core/Page/types'

import * as yup from 'yup'
import * as icon from 'ionicons/icons'
import Form from '../../components/core/Form'
import Page from '../../components/core/Page'
import Header from '../../components/core/main/Header'
import { output } from '../../classes/strapi/CommonOperations'

// Testing this module?
let testingSignup = true
let testing = testingSignup && process.env.REACT_APP_TESTING

interface OwnProps extends RouteComponentProps {}

interface DispatchProps {
  setisLoggedIn: typeof setisLoggedIn
  setUsername: typeof setUsername
  setLoading: typeof setLoading
}

interface SignupProps extends OwnProps,  DispatchProps { }

const Signup: React.FC<SignupProps> = ({
  history,
  setUsername: setUsernameAction,
  setisLoggedIn,
  setLoading,
}) => {

  const {t} = useTranslation()
  const [presentToast] = useIonToast()

  //SMTP code:550 msg:550-5.1.1 The email account that you tried to reach does not exist. Please try 550-5.1.1 double-checking the recipient's email address for typos or 550-5.1.1 unnecessary spaces. Learn more at 550 5.1.1 https://support.google.com/mail/?p=NoSuchUser q16-20020a2e9690000000b0027744b28539si4283378lji.72 - gsmtp 

  const pageSettings: PageProps = {
    id: 'signup-page',
    header: ()=> <Header label={"Sign up"} slot="start"/>,
    content: ()=> <Form {...pageSettings.methods.signupForm}/>,
    methods: {
      onLoad: ()=>{
        setLoading(false)
      },
      signupForm: {

        id: 'signup-form',
    
        title: {
          label: t('Add your data in the form...')
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
                name: 'username',
                fieldType: 'text',// TODO: Liberate for email and also nickname
                label: t('Nickname'),
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
                name: 'email',
                fieldType: 'email',
                label: t('Email'),
                //value: testing ? process.env.REACT_APP_DEFAULT_PASS : undefined,
                required: true,
                //onChange: (e:any)=> setPassword(e.detail.value)
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
            cols: [
              {
                type: 'input',
                name: 'repeatPassword',
                fieldType: 'password',
                label: t('Repeat the password'),
                //value: testing ? process.env.REACT_APP_DEFAULT_PASS : undefined,
                required: true,
                //onChange: (e:any)=> setPassword(e.detail.value)
              }
            ]
          },
          {
            cols:[
              {
                name: 'wanna-reset',
                type: 'button',
                label: t("You don't remember your account?"),
                color: 'clear',
                icon: icon.logIn
              },
            ]
          },    
          {
            cols: [
              {
                name: 'login-submit',
                type: 'button',
                fieldType: 'submit',
                label: t('Signup'),
                icon: icon.personAdd
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

            setLoading(true)
            if(data.password !== data.repeatPassword){
              presentToast(output())
              setLoading(false)
            }

            setLoading(true)
            const onSignupSuccess = async (ret: any) => {
              let user = ret.user
              user.jwt = ret.jwt // Attaching the JWT to the user level and state...
              await setisLoggedIn(true)
              return user
            }  
      
            await restCallAsync({
              req: {
                url: 'api/auth/local/register',
                method: 'POST',
                data: {
                  // BE AWARE OF TESTING PARAMS... Anyway, in production will be banned but yeah... 
                  username: testing ? data.username : random(12),
                  password: testing ? data.password : random(12),
                  email: testing ? random(12)+'@gmail.com' : data.email
                }                
              },
              onSuccess: { 
                default: async (ret: any)=>{
                  await onSignupSuccess(ret.data)
                    .then((ret: any)=>{
                      switch (ret.status) {
                        case 200:
                          setisLoggedIn(true)
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
                  switch(err?.response.status){
                    case 400: 
                      presentToast({ message: t(err.response.data.error.message) })
                    break
                    default:
                      presentToast({ message: t(err.response.data.message[0].messages[0].message) })
                  }
                }
              }
              
            })
            setLoading(false)
          },
    
          onCancel: ()=> history.push('/home', { direction: 'none' })      
    
        },
    
        validation: ()=> {
          return yup.object().shape({
            username: yup.string().required().min(3),
            email: yup.string().email().min(8),
            password: yup.string().required().min(6).max(64),//64 was arbitrary...
            repeatPassword: yup.string().required().min(6).max(64),//64 was arbitrary...
          })
        },
    
      }
    }
  }

  useEffect(()=>{
    pageSettings.methods.onLoad()
  },[])

  return <Page {...pageSettings}/>
  
}

export default connect<OwnProps, {}, DispatchProps>({
  mapDispatchToProps: {
    setisLoggedIn,
    setUsername,
    setLoading
  },
  component: Signup
})