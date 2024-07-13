import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { useIonToast } from '@ionic/react'
import * as icon from 'ionicons/icons'

import { HOME, apiUrl } from '../env';
import DebugUtil from '../classes/DebugUtil'
import Logger from '../classes/Logger'

import { FormProps } from '../components/core/Form/types';

import RestAPI from '../classes/RestCall';
import RestOutput from '../classes/RestOutput';

import { setData, setLoading, setisLoggedIn } from '../redux/data/user/user.actions';


export const login = (): FormProps => {

  const { t } = useTranslation();
  const history = useHistory();
  const [presentToast] = useIonToast();
  
  const debug = DebugUtil.setDebug(false);
  
  return {
    id: 'login-page',
    settings: {
      autoSendIfValid: false,
      animations: {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
      },
      afterLoad: ()=>{

      },
      style: {
        borderRadius: '0%'
      }
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
          .min(8, t('Password must be at least 8 characters'))
          .max(16, t('Password must be at max 16 characters')),
        className: 'col-span-12',
        secret: true
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
        style: { borderRadius: '20px',  float: 'left', width: '46%', margin: '2%' },
        icon: icon.starOutline
      },
      {
        name: 'register',
        label: t('Register'),
        type: 'button',
        style: { display: 'inline-block', width: '46%', margin: '2%' },
        onClick: () => {
          history.push('/register');
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
          default: (res: any) => {

            if (res.status === 200) {

              setData(res.data.user);
              setisLoggedIn(true)

              presentToast(RestOutput.catchSuccess(res))
                .then(() => {
                  history.push(HOME);
                });

            } else {

              presentToast(RestOutput.catchSuccess(res));
              
            }
            setLoading(false);
          }
        },
        onError: {
          default: (error: any) => {
            setisLoggedIn(false)
            setLoading(false);
            presentToast(RestOutput.catchDanger(error));
          }
        },
        onFinally: () => {
          setLoading(false);
        }
      });
    },
    onError: (errors: any) => {
      setisLoggedIn(false)
      setLoading(false);
      const output = RestOutput.catchFormError(errors)
      output.header = 'Login error';
      presentToast(output);
    }
  };
};
