import * as icon from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

import DebugUtils from '../../../classes/utils/DebugUtils';
import RestOutput from '../../../classes/utils/RestOutput';

import useUserStore, { setIUserState } from '../../../integrations/stores/user.store';
import LoggerUtils from '../../../classes/utils/LoggerUtils';
import { IFormComponent, ISubmitForm } from '../../../components/main/Form/types';
import { IRegister } from '../../../classes/strapi/models/User';

import { emailValidation, passwordValidation, repeatPasswordValidation, usernameValidation } from '../../../classes/strapi/validations';
import { addToast } from '../../../integrations/stores/index';

export const signupForm = (): IFormComponent => {

  const debug = DebugUtils.setDebug(false);
  const logger = LoggerUtils.getInstance('loginFomData');
  const { t } = useTranslation();
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
        borderRadius: '0%',
      },
    },
    fields: [
      {   
        name: 'username',
        label: t('User name'),
        type: 'text',
        defaultValue: '',
        className: 'col-span-12',
        validationSchema: usernameValidation(),
      },
      {
        name: 'email',
        label: t('Email'),
        type: 'email',
        defaultValue: '',
        className: 'col-span-12',
        validationSchema: emailValidation(),
      },
      { 
        name: 'password',
        label: t('Password'),
        type: 'password',
        defaultValue: '', 
        className: 'col-span-12',
        secret: true,
        validationSchema: passwordValidation(),
      },
      { 
        name: 'repeat-password',
        label: t('Please, repeat the password'),
        type: 'password',
        defaultValue: '', 
        className: 'col-span-12',
        secret: true,
        validationSchema: repeatPasswordValidation(),
      },
    ],

    onSuccess: (data: IRegister): ISubmitForm => {
      return {
        data: data,
        onSuccess: (res: any) => {
          const resUser = res?.data?.user;

          if (!resUser) {
            addToast(RestOutput.danger({
              header: t('Error!'),
              message: t('Unexpected server response'),
            }));
          } else {
            let logged = false;

            if (!resUser.confirmed) {
              addToast(RestOutput.warning({
                header: t('Not confirmed yet!'),
                message: t('This user is not confirmed'),
              }));
            } else if (resUser.blocked) {
              addToast(RestOutput.danger({
                header: t('Blocked user!!'),
                message: t('This user is blocked'),
              }));
            } else {
              logged = true;
              addToast(RestOutput.success({
                header: t('Welcome to the app!'),
                message: t('You logged successfully'),
              }));
            }

            const userState = setIUserState(res.data.user, resUser, logged);
            setUserStore(userState);

            logged ? logger.info('You have connected!', userState) : logger.error('You have NOT connected!', userState);
          }
        },
        onError: () => {
          addToast(RestOutput.danger({
            header: t('Signup error!'),
            message: t('There was an error during registration'),
          }));
        },
      };
    },
    onError: (err: any) => {
      logger.error(err);
    },
  };
};
