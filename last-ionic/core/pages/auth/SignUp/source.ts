import * as icon from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { useIonToast } from '@ionic/react'

import DebugUtils from '../../../classes/utils/DebugUtils';
import RestOutput from '../../../classes/utils/RestOutput';

import useUserStore, { setIUserState } from '../../../integrations/stores/user.store';
import LoggerUtils from '../../../classes/utils/LoggerUtils';
import { IFormComponent, ISubmitForm } from '../../../components/main/Form/types';
import { IRegister } from '../../../classes/strapi/models/User';
import useAppStore from '../../../integrations/stores/app.store';

import { emailValidation, passwordValidation, repeatPasswordValidation, usernameValidation } from '../../../classes/strapi/validations/all.validations';

export const signupForm = () : IFormComponent => {
  const debug = DebugUtils.setDebug(false);
  const logger = LoggerUtils.getInstance('loginFomData');

  const { t } = useTranslation();
  const history = useHistory();
  const [presentToast] = useIonToast();
  const { setUserStore } = useUserStore();

  
  return {
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
        validationSchema: usernameValidation(),
        options: []
      },
      {
        name: 'email',
        label: t('Email'),
        type: 'email',
        defaultValue: '',
        className: 'col-span-12',
        validationSchema: emailValidation(),
        options: []
      },
      { 
        name: 'password',
        label: t('Password'),
        type: 'password',
        defaultValue: '', 
        className: 'col-span-12',
        secret: true,
        validationSchema: passwordValidation()
      },
      { 
        name: 'repeat-password',
        label: t('Please, repeat the password'),
        type: 'password',
        defaultValue: '', 
        className: 'col-span-12',
        secret: true,
        validationSchema: repeatPasswordValidation()
      }
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

    onSubmit: (data: IRegister) : ISubmitForm => {
      return {
        data: data,
        onSuccess: {
          header: t('Welcome to the app!'),
          message: t('You logged successfully'),
          show: true,
          actions: (res: any) => {

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
  
          }
        },
        onError: {
          header: t('Login error!'),
          message: t('There was an error logging in'),
          show: false,
        }
      }
    },
    onError: (err: any) => {
      logger.error(err);
    },

  };

};
