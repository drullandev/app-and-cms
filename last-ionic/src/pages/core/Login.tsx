import React from 'react';
import { RouteComponentProps } from 'react-router';
import { useIonToast } from '@ionic/react';
import { useTranslation } from 'react-i18next';
import { connect } from '../../data/connect';
import RestAPI from '../../classes/core/axios';
import { setData, setLoading } from '../../data/user/user.actions';
import Page from '../../components/core/Page';
import { PageProps } from '../../components/core/Page/types';
import * as yup from 'yup';
import Form from '../../components/core/Form/Form';
import { FormProps } from '../../components/core/Form/types';
import Header from '../../components/core/main/Header';
import { DeepMap, FieldError } from 'react-hook-form';

interface OwnProps extends RouteComponentProps {}

interface StateProps {}

interface DispatchProps {
  setData: typeof setData;
  setLoading: typeof setLoading;
}

interface LoginProps extends OwnProps, StateProps, DispatchProps {}

const Login: React.FC<LoginProps> = ({
  history,
  setData,
  setLoading,
}) => {

  const { t } = useTranslation();
  const [presentToast] = useIonToast();

  const formData: FormProps = {
    settings: {
      autoSendIfValid: false //
    },
    rows: [
      {
        name: 'email',
        label: 'Email',
        type: 'email',
        defaultValue: '',
        validationSchema: yup.string()
          .required('Email is required')
          .email('This email is invalid...')
      },
      { 
        name: 'password',
        label: 'Password',
        type: 'password',
        defaultValue: '', 
        validationSchema: yup.string()
          .required('Password is required')
          .min(8, 'Password must be at least 8 characters')  // Added minimum characters
          //.matches(/^(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')  // Added at least one uppercase letter
          //.matches(/^(?=.*[a-z])/, 'Password must contain at least one lowercase letter')  // Added at least one lowercase letter
          //.matches(/^(?=.*[0-9])/, 'Password must contain at least one number')  // Added at least one number
          //.matches(/^(?=.*[!@#$%^&*])/, 'Password must contain at least one special character'),  // Added at least one special character
      },
      {
        name: 'agreement',
        label: 'Accept the publicity agreement',
        type: 'checkbox', defaultValue: false, 
        validationSchema: yup.boolean().oneOf([true], 'You must accept the terms and conditions')
      },
      { name: 'submit', label: 'submit', type: 'submit' },
      { name: 'register', label: 'Register', type: 'button' },
    ],
    onSuccess: async (data: any) => {
      setLoading(true);
      await RestAPI.restCallAsync({
        req: {
          method: 'POST',
          url: `${import.meta.env.VITE_API_URL}/auth/local`,
          data: {
            identifier: data.email,
            password: data.password,
          },
        },
        onSuccess: {
          default: (response:any)=>{
            if (response.status === 200) {
              setData(response.data.user);
              history.push('/home');
              presentToast({
                message: 'Login successful!',
                duration: 2000,
                color: 'success',
              });
            } else {
              presentToast({
                message: 'Login failed, please try again.',
                duration: 2000,
                color: 'danger',
              });
            }
          }
        },//
        onError: {
          default: (error: any)=>{
            presentToast({
              message: 'An error occurred during login, please try again.',
              duration: 2000,
              color: 'danger',
            });
            console.error('Login error:', error);
          }//
        },
        onFinally: ()=>{
          setLoading(false);
        }
      });
    },
    onError: ()=>{
      presentToast({
        message: 'Login error!',
        duration: 2000,
        color: 'warning',
      });
    }
  };

  const handleError = (errors: DeepMap<Record<string, any>, FieldError>) => {
    console.error('Error validating the form:', errors);
    presentToast({
      message: 'Please correct the errors in the form.',
      duration: 2000,
      color: 'danger',
    });
  };

  const pageSettings: PageProps = {
    id: 'login-page',
    header: () => <Header label={t('Login')} slot={'start'} />,
    content: () => (
      <>
        <Form {...formData} onError={handleError} />
      </>
    ),
    footer: () => null,
  };

  return <Page {...pageSettings} />

};

export default connect<StateProps, {}, DispatchProps>({
  mapStateToProps: (state) => ({}),
  mapDispatchToProps: {
    setData,
    setLoading,
  },
  component: Login,
});
