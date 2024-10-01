import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { useIonToast } from '@ionic/react'
import * as icon from 'ionicons/icons';

import DebugUtils from '../../../classes/utils/DebugUtils';

import { FormDataProps } from '../../../components/main/Form/types';

import useUserStore from '../../../classes/stores/user.store';
import Logger from '../../../classes/utils/LoggerUtils';
import useAppRest from '../../../integrations/RestIntegration';
import { ILogin, User } from '../../../classes/models/strapi/User';
import { AxiosResponse } from 'axios';
import useAppStore from '../../../classes/stores/app.store'
import RestOutput from '../../../classes/utils/RestOutput';

export const loginFormData = ({}): FormDataProps => {

  const { t } = useTranslation();
  const history = useHistory();
  const [presentToast] = useIonToast();
  const { setData } = useUserStore();
  const debug = DebugUtils.setDebug(false);
  const logger = Logger.getInstance(debug, 'loginFomData');
  const { setLoading } = useAppStore()
  return {
    id: 'login-page',
    captcha: false,
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
        name: 'identifier',
        label: t('Nickname or Email'),
        type: 'text',
        defaultValue: '',
        validationSchema: yup.string()
        .required(t('The email or username is required'))
        .test('email-or-username',

          t('Enter a valid email or username (3-30 chars)'),
          function (value) {
            const { path, createError } = this;
      
            // Verifica si es un correo electrónico válido
            const isValidEmail = yup.string().email().isValidSync(value);
      
            // Verifica si es un nombre de usuario válido
            const isValidUsername = yup.string()
              .matches(/^[a-zA-Z0-9_.-]{3,30}$/)
              .isValidSync(value);
      
            if (isValidEmail || isValidUsername) {
              return true;
            }
      
            return createError({
              path,
              message: t('Enter a valid email or username (3-30 chars)'),
            });
          }
        ),
        className: 'col-span-12',
        options: []
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
        secret: true,
        options: []
      }
    ],
    buttons:[
      { 
        name: 'submit',
        label: t('Submit'),
        type: 'submit',
        style: { borderRadius: '20px', float: 'left', width: '46%', margin: '2%'},
        icon: icon.starOutline,
        options: []
      },
      {
        name: 'register',
        label: t('Register'),
        type: 'button',
        style: { display: 'inline-block', width: '46%', margin: '2%' },
        onClick: () => {
          history.push('/sign-up');
        },
        options: []
      }
    ],
    onSuccess: async (data: ILogin) => {

      const success = (res: any) => {

        const resUser = res.user; 

        // Evaluate status::
        // 0.- Is not confirmed?
        if (!resUser.confirmed) {
          presentToast(RestOutput.warning({message: t('The user is not confirmed')}))
        }

        // 1.- Is bloqued?
        if (resUser.bloqued) {
          presentToast(RestOutput.danger({message: t('The user is blocked')}))
        }

        presentToast(RestOutput.success({message: t('You logged successfully"')}))

        //const user: User = res.data.user;

console.log(resUser)

/*{
  "id": 25,
  "username": "bunny",
  "email": "bunny@gmail.com",
  "provider": "local",
  "confirmed": true,
  "blocked": false,
  "createdAt": "2024-09-27T00:35:40.116Z",
  "updatedAt": "2024-09-30T02:29:35.655Z",
  "darkMode": true,
  "hasSeenTutorial": "true"
}
*/
        const user: User = {
          id: resUser.id,
          username: resUser.username,
          email: resUser.email,
          provider: resUser.provider,
          confirmed: resUser.confirmed,
          blocked: resUser.blocked,
          createdAt: '',
          updatedAt: '',
          darkMode: resUser.darkMode,
          hasSeenTutorial: resUser.hasSeenTutorial.toString(),
        };
        console.log('user', user)
        
        setData(user)
        //var newRes = res;
        //newRes.header = t('Wellcome to the app!');
        //newRes.message = 'Hello '+res.data.user.username+'!';
        //logger.log('success::ok', res)
        //var toastProps = RestOutput.catchSuccess(res, newRes);
        //Logger.log(toastProps)
        //presentToast(toastProps)
        //  .then(() => {
        //    history.push(HOME_PATH);
        //  });
      }

      const error = (err: any) => {
        presentToast(RestOutput.danger({message: t('Login error')}))
      }

      if (!useAppRest || typeof useAppRest.post !== 'function') {
        logger.error('useAppRest is not properly initialized');
        return;
      }

      await useAppRest.post('/auth/local', {
        identifier: data.identifier,
        password: data.password,
      }).then((res: AxiosResponse) => {
        success(res);
      }).catch((err)=>{
        error(err);
      }).finally(()=>{
        setLoading(false)
      });

    },
    onError: (errors: any) => {
      logger.error(errors)
      //const output = RestOutput.catchFormError(errors);
      //output.header = 'Login error';
      //presentToast(output);
    }
  };
};

/*
export const recoverFormData = (): FormDataProps => {
  const { t } = useTranslation();
  const history = useHistory();
  const [ presentToast ] = useIonToast();
  const debug = DebugUtils.setDebug(false);

  return {
    id: 'recover-page',
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
    captcha: false,
    fields: [
      {
        name: 'email',
        label: t('Email'),
        type: 'email',
        validationSchema: yup.string()
          .required(t('Email is required'))
          .email(t('This email is invalid...')),
        className: 'col-span-12',
        options: []
      }
    ],
    buttons: [
      {
        name: 'submit',
        label: t('Submit'),
        type: 'submit',
        style: { borderRadius: '20px', float: 'left', width: '46%', margin: '2%' },
        icon: icon.starOutline,
        options: []
      },
      {
        name: 'goToLogin',
        label: t('Login'),
        type: 'button',
        style: { display: 'inline-block', width: '46%', margin: '2%' },
        onClick: () => {
          history.push('/login');
        },
        options: []
      }
    ],
    onSuccess: async (data: any) => {
      try {
        await useAppRest.post('/auth/forgot-password', { email: data.email })
          .then((res)=>{
            console.log('yes')
            const user = res.user;
            user.jwt = res.jwt;

            presentToast({
              message: t('user-welcome', { username: user.username }),
              duration: 2000
            }).then(() => {
              history.push('/tabs/schedule', { direction: 'none' });
            });
          })
          .catch((err: any)=>{
            presentToast({
              message: t(err.response?.data?.error?.message || 'Error during recovery process'),
              duration: 2000,
              color: 'danger'
            });
          });

      } catch (error) {

        presentToast({
          message: t('Error during recovery process'),
          duration: 2000,
          color: 'danger',
        });

      }
    },

    onError: (errors: any) => {
      presentToast({
        message: t('Login error!'),
        duration: 2000,
        color: 'warning',
      });
    }
  };
};
*/