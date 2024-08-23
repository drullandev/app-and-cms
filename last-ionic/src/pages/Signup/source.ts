import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { useIonToast } from '@ionic/react'
import * as icon from 'ionicons/icons';

import { LOGIN_PATH, SIGNUP_PATH, apiUrl } from '../../config/env';
import DebugUtil from '../../classes/utils/DebugUtils';
import RestAPI from '../../classes/utils/RestUtils';
import RestOutput from '../../classes/RestOutput';

import useUserStore from '../../stores/user.store';
import Logger from '../../classes/utils/LoggerUtils';
import { FormDataProps } from '../../components/Form/types';

export const signupForm = ({
    setIsLogged
  }: {
    setLoading: (loading: boolean) => void;
    setData: (data: any) => void;
    setIsLogged: (isLoggedIn: boolean) => void;
  }): FormDataProps => {

  const { t } = useTranslation();
  const history = useHistory();
  const [presentToast] = useIonToast();
  const { setData, setLoading } = useUserStore();
  const debug = DebugUtil.setDebug(false);
  
  return {
    id: 'signup-page',
    captcha: true,
    agreement: true,
    settings: {
      autoSendIfValid: false,
      animations: {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
      },
      afterLoad: () => {},
      style: {
        borderRadius: '0%'
      }
    },
    fields: [
      {   
        name: 'username',
        label: t('User name'),
        type: 'text',
        defaultValue: '',
        className: 'col-span-12',
        validationSchema: yup.string()
          .required(t('Username is required'))
          .min(7, t('Username must be at least 7 characters')),
      },
      {
        name: 'email',
        label: t('Email'),
        type: 'email',
        defaultValue: '',
        className: 'col-span-12',
        validationSchema: yup.string()
          .required(t('Email is required'))
          .email(t('This email is invalid...')),
      },
      { 
        name: 'password',
        label: t('Password'),
        type: 'password',
        defaultValue: '', 
        className: 'col-span-12',
        secret: true,
        validationSchema: yup.string()
          .required(t('Password is required'))
          .min(8, t('Password must be at least 8 characters'))
          .max(16, t('Password must be at max 16 characters')),
      },
      { 
        name: 'repeat-password',
        label: t('Please, repeat the password'),
        type: 'password',
        defaultValue: '', 
        className: 'col-span-12',
        secret: true,
        validationSchema: yup.string()
          .required(t('Password is required'))
          .min(8, t('Password must be at least 8 characters'))
          .max(16, t('Password must be at max 16 characters'))
          .oneOf([yup.ref('password')], 'Passwords must match with previoous one!'),
      }
    ],
    buttons:[      
      { 
        name: 'submit',
        label: t('Submit'),
        type: 'submit',
        style: { borderRadius: '20px', float: 'left', width: '46%', margin: '2%' },
        icon: icon.starOutline
      },
      {
        name: 'register',
        label: t('Register'),
        type: 'button',
        style: { display: 'inline-block', width: '46%', margin: '2%' },
        onClick: () => {
          history.push(SIGNUP_PATH);
        }
      }
    ],
    onSuccess: async (data: any) => {
      
      setLoading(true);

      const signupSuccess = (res: any)=>{
        setIsLogged(true);
        var newRes = res;
        setData(res.data.user);
        newRes.header = t('Greate! Now validate on emaii!');
        newRes.message = t('Now you are a new honor guest!');
        var toastProps = RestOutput.catchSuccess(res, newRes);
        if (debug) Logger.log(toastProps)
        presentToast(toastProps)
          .then(() => {
            history.push(LOGIN_PATH);
          });
      }

      const signupError = (res:any)=>{
        setIsLogged(false);
        var newRes = res;
        newRes.header = t('Sign-up warning!');
        newRes.message = t('Error trying to sing-up!');
        newRes.showInnerMessage = true;
        var toastProps = RestOutput.catchDanger(res, newRes);
        if (debug) Logger.log(toastProps)
        presentToast(toastProps);
      }

      await RestAPI.restCallAsync({
        req: {
          method: 'POST',
          url: `${apiUrl}/auth/local/register`,
          data: () => {
            return {
              name: data.name,
              password: data.password,
              email: data.email,
              username: data.username,
            };
          },
        },
        onSuccess: {
          default: (res: any) => {
            switch(res.status){
              case 200:
                signupSuccess(res);
                break;
              case 400:
              default:
                signupError(res);
                break;
            }
          }
        },
        onError: {
          default: (error: any) => {
            signupError(error);
          }
        },
        onFinally: () => {
          setLoading(false);
        }
      });
    },
    onError: (errors: any) => {
      setIsLogged(false);
      const output = RestOutput.catchFormError(errors);
      output.header = 'Login error';
      presentToast(output);
      setLoading(false);
    }
  };
};
