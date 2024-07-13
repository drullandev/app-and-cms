import React from 'react'
import { RouteComponentProps } from 'react-router'
import { IonInput, useIonToast } from '@ionic/react'

// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// https://firebase.google.com/docs/auth/web/start#web-version-9
// https://github.com/aaronksaunders/ionic-react-auth-firebase

import '../../../styles/index.scss'

// Extra
import { useTranslation } from 'react-i18next'

// Reducer settings
import { connect } from '../../../redux/connect'
import RestAPI from '../../../classes/RestCall'
import { setData, setLoading } from '../../../redux/data/user/user.actions'

// Page dependencies
import Page from '../../../components/core/Page'
import { PageProps } from '../../../components/core/Page/types'

// Form settings
import * as yup from 'yup'
import Form from '../../../components/core/Form'
import { FormProps } from '../../../components/core/Form/types'

// Design Dependencies
import * as icon from 'ionicons/icons'
import Header from '../../../components/core/main/Header'
import { UserState } from '../../../redux/data/user/user.state'

// Are you testing this tools set && app?
let testingLogin = true
let testing = testingLogin && import.meta.env.REACT_APP_TESTING
let useFirebase = false
// - The main testing user will be used under testing


// Component Dependencies
interface OwnProps extends RouteComponentProps {}

interface StateProps {}

interface DispatchProps {
  setData: typeof setData
  setLoading: typeof setLoading
}

interface LoginProps extends OwnProps, StateProps, DispatchProps {}

const TestForm: React.FC<LoginProps> = ({
  history,
  setData,
  setLoading,
}) => {

  const { t } = useTranslation()
  const [presentToast] = useIonToast()
  //const auth = getAuth()

  const formData = {
    rows: [
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
      { name: 'submit', label: 'Submit', type: 'button', defaultValue: '' },
    ],
    onSuccess: (data: any)=>{
      console.log('When success!!', data)
    },
    onError: (errors: any) => {
      console.error('Error al validar los datos del formulario:', errors);
    }
  };
  
  const pageSettings: PageProps = {
    id: 'login-page',
    header: () => <Header label={t('Login')} slot={'start'}/>,
    content: () => (<>
        <Form {...formData}/>
      </>
    ),
    footer: ()=>{
      
    }
  }

  return <Page {...pageSettings}/>
  
}

export default connect<StateProps,{}, DispatchProps>({
  mapStateToProps: (state) => ({}),
  mapDispatchToProps: {
    setData,
    setLoading
  },
  component: TestForm
})