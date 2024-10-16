import { useTranslation } from 'react-i18next';
import { useIonToast } from '@ionic/react';

import LoggerUtils from '../../../../classes/utils/LoggerUtils';
import { ILogin } from '../../../../classes/strapi/models/User';
import RestOutput from '../../../../classes/utils/RestOutput';
import { IFormComponent, ISubmitForm } from '../../../../components/main/Form/types';
import useUserStore, { setIUserState } from '../../../../integrations/stores/user.store';
import { identifierValidation } from '../../../../classes/strapi/validations/Identifier';
import { passwordValidation } from '../../../../classes/strapi/validations/Password';

export const loginFormData = (): IFormComponent => {

  const debug = true;
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
        validationSchema: identifierValidation(),
      },
      {
        name: 'password',
        label: t('Password'),
        type: 'password',
        defaultValue: '',
        className: 'col-span-12',
        secret: true,
        validationSchema: passwordValidation()
      }
    ],
    onSubmit: (data: ILogin) : ISubmitForm => {

      const submitActions : ISubmitForm  = {
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
            show: true,
          },
        },

        /*
        onSuccess: (res: any) => {

          const resUser = res.data.user;

          let logged = false;

          if (!resUser.confirmed) {

            return RestOutput.warning({
              header: t('Not confirmed jet!'),
              message: t('This user is not confirmed')
            });

          } else if (resUser.blocked) {

            return RestOutput.danger({
              header: t('Blocked user!!'),
              message: t('This user is blocked')
            });

          } else {

            logged = true;
          }

          const userState = setIUserState(res.data, resUser, logged);

          setUserStore(userState);

          logger.info('You have connected!', userState);

        },

        onError: (err: any) => {

          return RestOutput.danger({
            header: t('Some error!!'),
            message: t('You find some error')
          });

        }
        */
        
      }

      return submitActions;
      
    }

  };

  return formData;

};
