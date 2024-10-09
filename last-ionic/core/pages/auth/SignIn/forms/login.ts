import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useIonToast } from '@ionic/react';

import LoggerUtils from '../../../../classes/utils/LoggerUtils';
import { ILogin } from '../../../../classes/strapi/models/User';
import RestOutput from '../../../../classes/utils/RestOutput';
import { IFormComponent, IFormData, ISubmitForm } from '../../../../components/main/Form/types';
import useUserStore, { setIUserState } from '../../../../integrations/stores/user.store';

export const loginFormData = (): IFormComponent => {

  const debug = false;
  const logger = LoggerUtils.getInstance('loginFomData', debug);
  const { t } = useTranslation();
  const [presentToast] = useIonToast();
  const { setUserStore } = useUserStore();

  const formData: IFormComponent = {
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
      afterLoad: () => { },
      style: { borderRadius: '0%' },
    },
    fields: [
      {
        name: 'identifier',
        label: t('Nickname or Email'),
        type: 'text',
        defaultValue: '',
        className: 'col-span-12',
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
      }
    ],
    onSuccess: (data: ILogin) :  ISubmitForm => {

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
