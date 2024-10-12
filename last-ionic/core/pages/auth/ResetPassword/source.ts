// General dependencies
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { useIonToast } from '@ionic/react'

// Fully imported dependencies
import * as yup from 'yup';
import * as icon from 'ionicons/icons';

// Used classes
import DebugUtils from '../../../classes/utils/DebugUtils';
import { IRestManager } from '../../../classes/managers/RestManager';

// Local dependencies
import { IFormComponent, IFormData, ISubmitForm } from '../../../components/main/Form/types';

// Reducer dependencies
import useUserStore from '../../../integrations/stores/user.store';
import useAppRest from '../../../integrations/useAppRest';
import LoggerUtils from 'core/classes/utils/LoggerUtils';

export interface IResetPassword {
  code: string;
  password: string;
  passwordConfirmation: string;
}

/**
 * This is the information for the reset page main form
 * @returns {IFormData}
 */
export const resetFormData = (): IFormComponent => {

  const { t } = useTranslation();
  const history = useHistory();
  const [presentToast] = useIonToast();
  const debug = DebugUtils.setDebug(false);
  const logger = LoggerUtils.getInstance('resetFormData', debug);
  
  const resetForm: IFormComponent = {
    id: 'reset-password-page',
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
    onSuccess: (data: IResetPassword): ISubmitForm => {
      return {
        data,
        onSuccess: (res)=>{
          logger.log('success', res)
        },
        onError: (err)=>{
          logger.log('error', err)
        },
        settings:{
          customSuccessMessage: {
            header: t('PasswordReseted!'),
            message: t('Your password was reseted'),
          },
          customErrorMessage: {
            header: t('Recover error'),
            message: t('There was an error reseting the password'),
          }
        }
      }
    },

    onError: (err: any) =>{
      logger.log('error', err)
    }
  };

  return resetForm;

};

export default resetFormData;
