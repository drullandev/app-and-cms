import { useTranslation } from 'react-i18next';
import { ILogin } from '../../../../classes/strapi/models/User';
import { IFormComponent, ISubmitForm } from '../../../../components/main/Form/types';
import { identifierValidation } from '../../../../classes/strapi/validations/Identifier';
import { passwordValidation } from '../../../../classes/strapi/validations/all.validations';

export const loginFormData = (): IFormComponent => {
  const { t } = useTranslation();
  return {
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

      return {
        data: data,
        messages: {
          onSuccess: {
            header: t('Welcome to the app!'),
            message: t('You logged successfully'),
            show: true,
          },
          onError: {
            header: t('Login error!'),
            message: t('There was an error logging in'),
            show: true,
          },
        },

      }
      
    }

  };

};
