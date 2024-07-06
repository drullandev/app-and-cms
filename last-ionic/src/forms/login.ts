import * as yup from 'yup';
import { FormProps } from '../components/core/Form/types';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { HOME, apiUrl } from '../env';
import RestAPI from '../classes/RestCall';
import RestOutput from '../classes/RestOutput';
import * as icon from 'ionicons/icons';
import { setData, setLoading, setisLoggedIn } from '../data/user/user.actions';
import { useIonToast } from '@ionic/react';
import DebugUtil from '../classes/DebugUtil';

export const login = (
  setLoading: typeof setLoading,
  setData: typeof setData,
  setisLoggedIn: typeof setisLoggedIn,
): FormProps => {

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
        style: { width: '50%'}
      },
      {
        name: 'register',
        label: t('Register'),
        type: 'button',
        style: { width: '50%'},
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
              presentToast({
                icon: icon.checkmarkCircle,
                color: 'success',
                message: t('Login successfull!'),
                duration: 2000,
              }).then(() => {
                history.push(HOME);
              });
            } else {
              presentToast(RestOutput.getOutput(res));
            }
          }
        },
        onError: {
          default: (errors: any) => {
            if (debug) console.log('la data', errors.response.data.data[0].messages[0].message)
            if (debug) console.log('los errores', errors, RestOutput.catchError(errors))
            setisLoggedIn(false)
            presentToast(RestOutput.catchError(errors));
          }
        },
        onFinally: () => {
          setLoading(false);
        }
      });
    },
    onError: (errors: { [key: string]: any }) => {
      setisLoggedIn(false)
      presentToast(RestOutput.getOutput(errors));
    }
  };
};
