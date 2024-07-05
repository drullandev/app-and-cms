import React from 'react';
import { RouteComponentProps } from 'react-router';
import { useIonToast, IonContent, IonFab, IonFabButton, IonFabList, IonIcon } from '@ionic/react';
import { useTranslation } from 'react-i18next';
import * as icon from 'ionicons/icons'
import * as yup from 'yup';
import { HOME } from '../../../env'
import { connect } from '../../../data/connect';

import RestAPI from '../../../classes/RestCall';
import { setData, setLoading } from '../../../data/user/user.actions';

import Page from '../../../components/core/Page';
import { PageProps } from '../../../components/core/Page/types';

import Form from '../../../components/core/Form/Form';
import { FormProps } from '../../../components/core/Form/types';

import Header from '../../../components/core/main/Header';
import i18n from '../../../components/extra/i18n';
import './styles.scss'
import DebugUtil from '../../../classes/DebugUtil';
import { apiUrl } from '../../../env'
import  RestOutput  from '../../../classes/RestOutput';
import { cardOutline, checkmarkCircle } from 'ionicons/icons';

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

  let lang = i18n.language
  const { t } = useTranslation();
  const [presentToast] = useIonToast();

  const debug = DebugUtil.setDebug(true);

  const pageSettings: PageProps = {

    id: 'login-page',

    header: () => <Header label={t('Login')} slot={'start'} />,

    content: () => {

      const formData: FormProps = {
        id: 'login-page',
        settings: {
          autoSendIfValid: false,
          animations: {
            initial: { opacity: 0, y: -20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5 },
          },
        },
        rows: [
          {
            name: 'email',
            label: t('Email'),
            type: 'email',
            defaultValue: '',
            validationSchema: yup.string()
              .required(t('Email is required'))
              .email(t('This email is invalid...')),
            className: 'col-span-12'
          },
          { 
            name: 'password',
            label: t('Password'),
            type: 'password',
            defaultValue: '', 
            validationSchema: yup.string()
              .required(t('Password is required'))
              .min(8, t('Password must be at least 8 characters'))  // Added minimum characters
              .max(16, t('Password must be at max 16 characters')),  // Added minimum characters
              //.matches(/^(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')  // Added at least one uppercase letter
              //.matches(/^(?=.*[a-z])/, 'Password must contain at least one lowercase letter')  // Added at least one lowercase letter
              //.matches(/^(?=.*[0-9])/, 'Password must contain at least one number')  // Added at least one number
              //.matches(/^(?=.*[!@#$%^&*])/, 'Password must contain at least one special character'),  // Added at least one special character
            className: 'col-span-12'
          },
          {
            name: 'agreement',
            label: t('Accept the publicity agreement'),
            type: 'checkbox',
            defaultValue: false, 
            validationSchema: yup.boolean()
              .oneOf([true], t('You must accept the terms and conditions'))
          },
          { 
            name: 'submit',
            label: t('Submit'),
            type: 'submit',
            style: { width: '50%'}
          },
          {
            name: 'register',
            label: t('Register'),
            type: 'button',
            style: { width: '50%'},
            onClick: ()=>{
              history.push('/register')
            }
          },
        ],
        onSuccess: async (data: any) => {
          setLoading(true);
          await RestAPI.restCallAsync({
            req: {
              method: 'POST',
              url: `${apiUrl}/auth/local`,
              data: {
                identifier: data.email,
                password: data.password,
              },
            },
            onSuccess: {
              default: (res: any)=>{
                if (res.status === 200) {
                  setData(res.data.user);
                  presentToast({
                    icon: icon.checkmarkCircle,
                    color: 'success',
                    message: t('Login successfull!'),
                    duration: 2000,
                  }).then(()=>{
                    history.push(HOME);
                  });
                } else {
                  const errors = RestOutput.getOutput(res);
                  presentToast(errors);
                }
              }
            },
            onError: {
              default: (errors: any)=>{
                presentToast(RestOutput.getOutput(errors));
              }
            },
            onFinally: ()=>{
              setLoading(false);
            }
          });
        },
        onError:  (errors: { [key: string]: any }) => {
          presentToast(RestOutput.getOutput(errors));
        }
      };

      return <>
        <IonContent id={pageSettings.id}>
          <Form {...formData} />
        </IonContent>
      </>

    },

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
