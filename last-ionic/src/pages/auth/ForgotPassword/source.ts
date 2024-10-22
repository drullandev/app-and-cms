import { useIonToast } from '@ionic/react';
import * as yup from 'yup';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';

import LoggerUtils from '../../../classes/utils/LoggerUtils';

import useAppStore from '../../../integrations/stores/app.store';

import { IForgot } from '../../../classes/strapi/models/User';
import useUserStore from '../../../integrations/stores/user.store';
import { IFormComponent, ISubmitForm } from '../../../components/main/Form/types';

export const forgotPasswordForm = (): IFormComponent => {

  const debug = false;
  const logger = LoggerUtils.getInstance('forgotForm', debug);

  const { t } = useTranslation();
  const history = useHistory();
  const [ presentToast ] = useIonToast();
  const { setLoading } = useAppStore();
  const { setUserStore } = useUserStore();

  return {
    captcha: false,
    id: 'recover-page',
    url: '/auth/forgot-password',
    settings: {
      autoSendIfValid: false,
      animations: {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
      },
      afterLoad: () => {},
      style: { borderRadius: '0%' },
    },
    fields: [
      {
        name: 'email',
        label: t('Email'),
        type: 'email',
        validationSchema: yup.string().required(t('Email is required')).email(t('This email is invalid...')),
        className: 'col-span-12',
      }
    ],
    onSuccess: (res:any)=>{
      logger.log('success')
    },
    onError: ()=>{
      logger.error('error')
    }
  };
};

export default forgotPasswordForm;