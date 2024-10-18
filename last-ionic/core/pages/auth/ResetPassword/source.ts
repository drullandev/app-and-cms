// General dependencies
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { useIonToast } from '@ionic/react'

// Fully imported dependencies
import * as yup from 'yup';

// Used classes
import DebugUtils from '../../../classes/utils/DebugUtils';

// Local dependencies
import { IFormComponent, IFormData, ISubmitForm } from '../../../components/main/Form/types';

// Reducer dependencies
import LoggerUtils from 'core/classes/utils/LoggerUtils';
import { passwordValidation, repeatPasswordValidation } from '../../../classes/strapi/validations/all.validations';

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
        validationSchema: passwordValidation(),
        className: 'col-span-12',
        secret: true,
        options: []
      },
      { 
        name: 'repeat-password',
        label: t('Repeat the password'),
        type: 'password',
        defaultValue: '', 
        validationSchema: repeatPasswordValidation(),
        className: 'col-span-12',
        secret: true,
        options: []
      },
    ],
    onSubmit: (data: IResetPassword): ISubmitForm => {
      return {
        data,
        onSubmit: (res)=>{
          logger.log('success', res)
        },
        onError: (err)=>{
          logger.log('error', err)
        },
        messages:{
          onSuccess: {
            header: t('PasswordReseted!'),
            message: t('Your password was reseted'),
          },
          onError: {
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
