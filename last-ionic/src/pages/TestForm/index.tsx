import React from 'react'
import { RouteComponentProps } from 'react-router'
import { useIonToast } from '@ionic/react'

// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// https://firebase.google.com/docs/auth/web/start#web-version-9
// https://github.com/aaronksaunders/ionic-react-auth-firebase

import '../../styles/index.scss'

// Extra
import { useTranslation } from 'react-i18next'

// Page dependencies
import Page from '../../components/Page'
import { PageProps } from '../../components/Page/types'

// Form settings
import * as yup from 'yup'
import Form from '../../components/Form'

// Design Dependencies
import Header from '../../components/Header'

const TestForm: React.FC = () => {

  const { t } = useTranslation()
  const [presentToast] = useIonToast()
  //const auth = getAuth()

  const formData = {
    id: 'test-form',
    fields: [
      { name: 'password', label: 'Password', type: 'password', defaultValue: '', validationSchema: yup.string().required('Password is required') },
      { name: 'text', label: 'Text', type: 'text', defaultValue: '', validationSchema: yup.string().required('Text is required') },
      { name: 'number', label: 'Number', type: 'number', defaultValue: '', validationSchema: yup.number().required('Number is required').positive('Number must be positive') },
      { name: 'email', label: 'Email', type: 'email', defaultValue: '', validationSchema: yup.string().required('Email is required').email('Invalid email') },
      { name: 'textarea', label: 'Textarea', type: 'text', defaultValue: '', validationSchema: yup.string().required('Textarea is required').max(100, 'Textarea must be at most 100 characters') },
      { 
        name: 'select', 
        label: 'Select', 
        type: 'select', 
        options: [
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
          { value: 'option3', label: 'Option 3' },
        ], 
        defaultValue: '', 
        validationSchema: yup.string().required('Select is required')
      },
      { name: 'date', label: 'Date', type: 'datetime', defaultValue: '', validationSchema: yup.date().required('Date is required') },
    ],
    buttons: [
      { name: 'submit', label: 'Submit', type: 'button', defaultValue: '' },
    ],
    onSuccess: (data: any)=>{
      console.log('When success!!', data)
      return presentToast({ message: 'Success', duration: 2000, position: 'top' })
    },
    onError: (errors: any) => {
      console.error('Error al validar los datos del formulario:', errors);
      return presentToast({ message: 'Error', duration: 2000, position: 'top' })
    }
  };
  
  const pageSettings: PageProps = {
    settings:{
      id: 'login-page',
    },
    header: () => <Header />,
    content: () => (<>
        <Form {...formData}/>
      </>
    ),
    footer: ()=>{
      
    }
  }

  return <Page {...pageSettings}/>
  
}

export default TestForm
