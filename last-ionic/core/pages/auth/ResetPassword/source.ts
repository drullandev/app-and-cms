// General dependencies
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { useIonToast } from '@ionic/react'

// Fully imported dependencies
import * as yup from 'yup';
import * as icon from 'ionicons/icons';

// Used classes
import DebugUtils from '../../../classes/utils/DebugUtils';
import RestManager from '../../../classes/managers/RestManager';

// Local dependencies
import { IFormData } from '../../../components/main/Form/types';

// Reducer dependencies
import useUserStore from '../../../classes/stores/user.store';
import useAppRest from '../../../integrations/RestIntegration';

/**
 * This is the information for the reset page main form
 * @returns {IFormData}
 */
export const resetFormData = (): IFormData => {

  const { t } = useTranslation();
  const history = useHistory();
  const [presentToast] = useIonToast();
  const debug = DebugUtils.setDebug(false);
  
  const resetForm: IFormData = {
    id: 'reset-page',
    url: '/auth/reset-password',
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
      },
      { 
        name: 'repeat-password',
        label: t('Repeat the password'),
        type: 'password',
        defaultValue: '', 
        validationSchema: yup.string()
          .required(t('Password is required'))
          .oneOf([yup.ref('password'), ''], 'Passwords must match with previoous one')
          .min(8, t('Password must be at least 8 characters'))
          .max(16, t('Password must be at max 16 characters')),
        className: 'col-span-12',
        secret: true,
        options: []
      },
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

      await useAppRest.post( resetForm.url, {
        "code": data.code,
        "password": data.password,
        "passwordConfirmation": data.password
      });
    },

    onError: (errors:any) =>{
      presentToast({
        message: 'Reset error!',
        duration: 2000,
        color: 'warning',
      });
    }
  };

  return resetForm;

};

export default resetFormData;
