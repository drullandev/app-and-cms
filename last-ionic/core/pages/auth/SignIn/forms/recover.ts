import * as yup from 'yup';
import { useHistory } from 'react-router';
import { useIonToast } from '@ionic/react';
import { useTranslation } from 'react-i18next';

import LoggerUtils from '../../../../classes/utils/LoggerUtils';

import useAppStore from '../../../../integrations/stores/app.store';

import { IRecover } from '../../../../classes/strapi/models/User';
import useUserStore from '../../../../integrations/stores/user.store';
import { IFormComponent, ISubmitForm } from '../../../../components/main/Form/types';

export const recoverFormData = (): IFormComponent => {

  const debug = false;
  const logger = LoggerUtils.getInstance('recoverFormData', debug);

  const { t } = useTranslation();
  const history = useHistory();
  const [ presentToast ] = useIonToast();
  const { setLoading } = useAppStore();
  const { setUserStore } = useUserStore();

  const formData: IFormComponent = {
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
    onSubmit: (data: IRecover) : ISubmitForm => {

      // Handle form submission with custom success and error handling
      return {
        data,
        onSubmit: ()=>{
          logger.log('success')
        },
        onError: ()=>{
          logger.log('error')
        },
        messages:{
          onSuccess: {
            header: t('Your recovery is working!'),
            message: t('Wait for the recovery email'),
            show: true,
          },
          onError: {
            header: t('Recover error'),
            message: t('There was an error recovering the account'),
            show: true,
          }
        }
      }
      
    },
    onError: (err: any) => {
      logger.error(err);
    },
  };

  return formData;

};
