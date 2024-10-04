import * as yup from 'yup';
import { useHistory } from 'react-router';
import { AxiosError, AxiosResponse } from 'axios';
import { useTranslation } from 'react-i18next';
import { useIonToast } from '@ionic/react';
import * as icon from 'ionicons/icons';

import Logger from '../../../classes/utils/LoggerUtils';
import DebugUtils from '../../../classes/utils/DebugUtils';
import { ILogin, IRecover } from '../../../classes/strapi/models/User';
import useAppStore from '../../../classes/stores/app.store';
import RestOutput from '../../../classes/utils/RestOutput';
import useUserStore, { setIUserState } from '../../../classes/stores/user.store';
import { IFormData } from '../../../components/main/Form/types';
import useAppRest from '../../../integrations/RestIntegration';
import { AuthResponse } from '../../../classes/strapi/models/AuthResponse';

export const loginFormData = (): IFormData => {

  const debug = DebugUtils.setDebug(false);
  const logger = Logger.getInstance(debug, 'loginFomData');
  const { t } = useTranslation();
  const history = useHistory();
  const [presentToast] = useIonToast();
  const { setUserStore } = useUserStore();
  const { setLoading } = useAppStore();

  const formData : IFormData = {
    id: 'login-page',
    captcha: false,
    url: '/auth/local',
    settings: {
      autoSendIfValid: false,
      animations: {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
      },
      afterLoad: () => {},
      style: { borderRadius: '0%' },
    },
    fields: [
      {
        name: 'identifier',
        label: t('Nickname or Email'),
        type: 'text',
        defaultValue: '',
        validationSchema: yup.string()
          .required(t('The email or username is required'))
          .test(
            'email-or-username',
            t('Enter a valid email or username (3-30 chars)'),
            function (value) {
              const { path, createError } = this;
              const isValidEmail = yup.string().email().isValidSync(value);
              const isValidUsername = yup.string()
                .matches(/^[a-zA-Z0-9_.-]{3,30}$/)
                .isValidSync(value);
              return isValidEmail || isValidUsername || createError({ path, message: t('Enter a valid email or username (3-30 chars)') });
            }
          ),
        className: 'col-span-12',
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
      }
    ],
    buttons: [
      {
        name: 'submit',
        label: t('Submit'),
        type: 'submit',
        style: { borderRadius: '20px', float: 'left', width: '46%', margin: '2%' },
        icon: icon.starOutline,
      },
      {
        name: 'register',
        label: t('Register'),
        type: 'button',
        style: { display: 'inline-block', width: '46%', margin: '2%' },
        onClick: () => {
          history.push('/sign-up');
        },
      }
    ],
    onSuccess: async (data: ILogin) => {

      try {

        const success = (res: AxiosResponse<AuthResponse>) => {

          const resUser = res.data.user;
          let logged = false;

          if (!resUser.confirmed) {
            presentToast(RestOutput.warning({ message: t('The user is not confirmed') }));
          } else if (resUser.blocked) {
            presentToast(RestOutput.danger({ message: t('The user is blocked') }));
          } else {
            logged = true;
          }

          const userState = setIUserState(res.data, resUser, logged);
          setUserStore(userState);

          logger.info({ message: 'You have connected!' });

          presentToast(RestOutput.success({
            header: t('You logged successfully!'),
            message: t('Welcome to the app ') + resUser.username,
          })).then(() => {
            history.push('/home');
          });

        };

        const error = (err: AxiosError) => {
          presentToast(RestOutput.danger({ message: t('Login error') }));
          logger.error(err);
        };

        await useAppRest.post(formData.url, data)
          .then(success)
          .catch(error)

      } catch (err) {
        presentToast(RestOutput.danger({ message: t('Login error') }));
        logger.error(err);
      } finally {
        setLoading(false);
      }
    },
    onError: (err: any) => {
      //presentToast(RestOutput.danger({ message: t('Login error') }));
      logger.error(err);
    },
  };

  return formData;

};

export const recoverFormData = (): IFormData => {

  const debug = DebugUtils.setDebug(false);
  const logger = Logger.getInstance(debug, 'recoverFormData');
  const { t } = useTranslation();
  const history = useHistory();
  const [presentToast] = useIonToast();
  const { setLoading } = useAppStore();
  const { setUserStore } = useUserStore();

  const formData = {
    captcha: false,
    id: 'recover-page',
    url: '/auth/forgot-password',
    settings: {
      autoSendIfValid: false,
      animations: {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
      },
      afterLoad: () => {},
      style: { borderRadius: '0%' },
    },
    fields: [
      {
        name: 'email',
        label: t('Email'),
        type: 'email',
        validationSchema: yup.string().required(t('Email is required')).email(t('This email is invalid...')),
        className: 'col-span-12',
      }
    ],
    buttons: [
      {
        name: 'submit',
        label: t('Submit'),
        type: 'submit',
        style: { borderRadius: '20px', float: 'left', width: '46%', margin: '2%' },
        icon: icon.starOutline,
      },
      {
        name: 'goToLogin',
        label: t('Login'),
        type: 'button',
        style: { display: 'inline-block', width: '46%', margin: '2%' },
        onClick: () => {
          history.push('/login');
        },
      }
    ],
    onSuccess: async (data: IRecover) => {

      try {

        const success = (res: AxiosResponse<AuthResponse>) => {

          const resUser = res.data.user;
          var logged = false;

          if (!resUser.confirmed) {

            presentToast(RestOutput.warning({ message: t('The user is not confirmed') }));
          } else if (resUser.blocked) {
            
            presentToast(RestOutput.danger({ message: t('The user is blocked') }));
          } else {

            logger.info({ message: 'You have connected!' });
            logged = true;
          }

          // We set the customers. Maybe we gonna do more actions with him!
          const userState = setIUserState(res.data, resUser, logged);
          setUserStore(userState);

          presentToast(RestOutput.success({
            header: t('Your recovery is working!'),
            message: t('Wait for the recovery email ') + resUser.username,
          })).then(() => {
            history.push('/home');
          });

        };

        const error = (err: AxiosError) => {
          presentToast(RestOutput.danger({ message: t('Recover error') }));
          logger.error(err);
        };

        await useAppRest.post(formData.url, data)
          .then(success)
          .catch(error);

      } catch (err) {
        presentToast(RestOutput.danger({ message: t('Recover error') }));
        logger.error(err);
      } finally {
        setLoading(false);
      }
    },
    onError: (err: any) => {
      //presentToast(RestOutput.danger({ message: t('Recover error') }));
      logger.error(err);
    },
  };

  return formData;

};
