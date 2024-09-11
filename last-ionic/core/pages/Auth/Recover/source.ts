import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { useIonToast } from '@ionic/react';
import * as icon from 'ionicons/icons';

import DebugUtils from '../../../classes/utils/DebugUtils';
import { FormDataProps } from '../../../components/Form/types';

import useAppRest from '../../../integrations/RestIntegration';

export const recoverFormData = (): FormDataProps => {
  const { t } = useTranslation();
  const history = useHistory();
  const [presentToast] = useIonToast();
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
        className: 'col-span-12'
      }
    ],
    buttons: [
      {
        name: 'submit',
        label: t('Submit'),
        type: 'submit',
        style: { borderRadius: '20px', float: 'left', width: '46%', margin: '2%' },
        icon: icon.starOutline
      },
      {
        name: 'goToLogin',
        label: t('Login'),
        type: 'button',
        style: { display: 'inline-block', width: '46%', margin: '2%' },
        onClick: () => {
          history.push('/login');
        }
      }
    ],
    onSuccess: async (data: any) => {
      try {
        await useAppRest.makeAsyncCall({
          req: {
            url: '/auth/forgot-password',
            method: 'POST',
            data: { email: data.email }
          },
          onSuccess: {
            default: async (ret: any) => {
              const user = ret.user;
              user.jwt = ret.jwt;

              presentToast({
                message: t('user-welcome', { username: user.username }),
                duration: 2000
              }).then(() => {
                history.push('/tabs/schedule', { direction: 'none' });
              });
            }
          },
          onError: {
            default: (err: any) => {
              presentToast({
                message: t(err.response?.data?.error?.message || 'Error during recovery process'),
                duration: 2000,
                color: 'danger'
              });
            }
          }
        });
      } catch (error) {
        presentToast({
          message: 'Error during recovery process',
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
