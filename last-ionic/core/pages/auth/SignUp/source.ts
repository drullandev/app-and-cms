import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { useIonToast } from '@ionic/react'
import * as icon from 'ionicons/icons';

import DebugUtils from '../../../classes/utils/DebugUtils';
import RestOutput from '../../../classes/utils/RestOutput';

import useUserStore from '../../../classes/stores/user.store';
import Logger from '../../../classes/utils/LoggerUtils';
import { FormDataProps } from '../../../components/main/Form/types';
import RestManager from '../../../classes/managers/RestManager';
import useAppRest from '../../../integrations/RestIntegration';

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
  const { setData } = useUserStore();
  const debug = DebugUtils.setDebug(false);
  
  return {
    id: 'signup-page',
    captcha: false,
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
          options: []
      },
      {
        name: 'email',
        label: t('Email'),
        type: 'email',
        defaultValue: '',
        className: 'col-span-12',
        validationSchema: yup.string()
          .required(t('Email is required'))
          .email(t('This email is invalid')),
          options: []
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
          options: []
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
          options: []
      }
    ],
    buttons:[      
      { 
        name: 'submit',
        label: t('Submit'),
        type: 'submit',
        style: { borderRadius: '20px', float: 'left', width: '46%', margin: '2%' },
        icon: icon.starOutline,
        options: []
      },
      {
        name: 'register',
        label: t('Register'),
        type: 'button',
        style: { display: 'inline-block', width: '46%', margin: '2%' },
        onClick: () => {
          //history.push(SIGNUP_PATH);
        },
        options: []
      }
    ],
    onSuccess: async (data: any) => {
      const signupSuccess = (res: any)=>{
        setIsLogged(true);
        var newRes = res;
        setData(res.data.user);
        newRes.header = t('Greate! Now validate on emaii!');
        newRes.message = t('Now you are a new honor guest!');
        //var toastProps = RestOutput.catchSuccess(res, newRes);
        //Logger.log(toastProps)
        //presentToast(toastProps)
        //  .then(() => {
        //    history.push(LOGIN_PATH);
        //  });
      }

      const signupError = (res:any)=>{
        setIsLogged(false);
        var newRes = res;
        newRes.header = t('Sign-up warning!');
        newRes.message = t('Error trying to sing-up!');
        newRes.showInnerMessage = true;
        //var toastProps = RestOutput.catchDanger(res, newRes);
        //Logger.log(toastProps)
        //presentToast(toastProps);
      }

      /*
      await useAppRest.makeAsyncCall({
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

        }
      });*/
    },
    onError: (errors: any) => {
      setIsLogged(false);
      //const output = RestOutput.catchFormError(errors);
      //output.header = 'Login error';
      //presentToast(output);
    }
  };
};
