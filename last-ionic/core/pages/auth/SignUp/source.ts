import * as yup from 'yup';
import * as icon from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { useIonToast } from '@ionic/react'

import DebugUtils from '../../../classes/utils/DebugUtils';
import RestOutput from '../../../classes/utils/RestOutput';

import useUserStore, { setIUserState } from '../../../integrations/stores/user.store';
import LoggerUtils from '../../../classes/utils/LoggerUtils';
import { IFormComponent, IFormData, ISubmitForm } from '../../../components/main/Form/types';
import useAppRest from '../../../integrations/useAppRest';
import { IRegister } from '../../../classes/strapi/models/User';
import { AuthResponse } from '../../../classes/strapi/models/AuthResponse';
import { AxiosResponse, AxiosError } from 'axios';
import useAppStore from '../../../integrations/stores/app.store';

export const signupForm = (): IFormComponent => {
  const debug = DebugUtils.setDebug(false);
  const logger = LoggerUtils.getInstance('loginFomData');

  const { t } = useTranslation();
  const history = useHistory();
  const [presentToast] = useIonToast();
  const { setUserStore } = useUserStore();
  const { setLoading } = useAppStore();
  
  const formData: IFormComponent = {
    id: 'signup-page',
    url: '/auth/local/register',
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
      /*{ 
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
      }*/
    ],
    buttons:[
      { 
        name: 'submit',
        label: t('Submit'),
        type: 'submit',
        style: { borderRadius: '20px', float: 'left', width: '100%', margin: '2%' },
        icon: icon.starOutline,
        options: []
      }
    ],

    onSuccess: (data: IRegister) => {
      const successAcctions : ISubmitForm  = {
        data: data,
        settings: {
          customSuccessMessage: {
            header: t('Welcome to the app!'),
            message: t('You logged successfully'),
            show: true,
          },
          customErrorMessage: {
            header: t('Login error!'),
            message: t('There was an error logging in'),
            show: false,
          },
        },

        onSuccess: (res: any) => {

          const resUser = res.data.user;

          let logged = false;

          if (!resUser.confirmed) {

            presentToast(RestOutput.warning({
              header: t('Not confirmed jet!'),
              message: t('This user is not confirmed')
            }));

          } else if (resUser.blocked) {

            presentToast(RestOutput.danger({
              header: t('Blocked user!!'),
              message: t('This user is blocked')
            }));

          } else {

            logged = true;
          }

          const userState = setIUserState(res.data, resUser, logged);

          setUserStore(userState);

          logger.info('You have connected!', userState);

        },

        onError: (err: any) => {
          logger.error('You not have connected!', err );
        }
        
      }

      return successAcctions;

    },
    onError: (err: any) => {
      logger.error(err);
    },

  };

  return formData;

};
