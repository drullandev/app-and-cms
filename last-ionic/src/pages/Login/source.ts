import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { useIonToast } from '@ionic/react'
import * as icon from 'ionicons/icons';

import { HOME_PATH, apiUrl } from '../../app/config/env';
import DebugUtils from '../../classes/utils/DebugUtils';
import RestOutput from '../../classes/utils/RestOutput';
import RestManager from '../../classes/managers/RestManager';

import { FormDataProps } from '../../components/Form/types';

import useUserStore from '../../classes/stores/user.store';
import Logger from '../../classes/utils/LoggerUtils';

export const loginFormData = ({}): FormDataProps => {

  const { t } = useTranslation();
  const history = useHistory();
  const [presentToast] = useIonToast();
  const { setData } = useUserStore();
  const debug = DebugUtils.setDebug(false);
  
  return {
    id: 'login-page',
    captcha: true,
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
      }
    ],
    buttons:[      
      { 
        name: 'submit',
        label: t('Submit'),
        type: 'submit',
        style: { borderRadius: '20px', float: 'left', width: '46%', margin: '2%'},
        icon: icon.starOutline
      },
      {
        name: 'register',
        label: t('Register'),
        type: 'button',
        style: { display: 'inline-block', width: '46%', margin: '2%' },
        onClick: () => {
          history.push('/sign-up');
        }
      }
    ],
    onSuccess: async (data: any) => {

      const loginSuccess = (res: any)=>{
        setData(res.data.user)
        var newRes = res;
        newRes.header = t('Wellcome to the app!');
        newRes.message = 'Hello '+res.data.user.username+'!';
        var toastProps = RestOutput.catchSuccess(res, newRes);
        if (debug) Logger.log(toastProps)
        presentToast(toastProps)
          .then(() => {
            history.push(HOME_PATH);
          });
      }

      const loginError = (res: any) => {
        var newRes = res;
        newRes.header = t('Login error!');
        newRes.showInnerMessage = true;
        newRes.message = 'Was an error!', res;
        var toastProps = RestOutput.catchDanger(res, newRes)
        if (debug) Logger.log(toastProps)
        presentToast(toastProps)
      }

      await RestManager.RestCallAsync({
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
            switch(res.status){
              case 200:
                loginSuccess(res);
                break;
              case 400:
              default:
                loginError(res);
            }
          }
        },
        onError: {
          default: (error: any) => {
            loginError(error);
          }
        },
        onFinally: () => {

        }
      });
    },
    onError: (errors: any) => {
      const output = RestOutput.catchFormError(errors);
      output.header = 'Login error';
      presentToast(output);
    }
  };
};
