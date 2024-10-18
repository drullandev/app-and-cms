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
import LoggerUtils from '../../../classes/utils/LoggerUtils';
import { passwordValidation, repeatPasswordValidation } from '../../../classes/strapi/validations/all.validations';
import RestOutput from '../../../classes/utils/RestOutput';

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

  const debug = DebugUtils.setDebug(false);
  const logger = LoggerUtils.getInstance('resetFormData', debug);

  const { t } = useTranslation();
  const history = useHistory();
  const [presentToast] = useIonToast();
  
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
    onSubmit: (data: IResetPassword) : ISubmitForm => {
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
  
            //const userState = setIUserState(res.data, resUser, logged);
  
            //setUserStore(userState);
  
            //logger.info('You have connected!', userState);
  
          }
        },
        onError: {
          header: t('Login error!'),
          message: t('There was an error logging in'),
          show: false,
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
