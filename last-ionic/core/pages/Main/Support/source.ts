import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { useIonToast } from '@ionic/react';
import * as icon from 'ionicons/icons';

import DebugUtils from '../../../classes/utils/DebugUtils';
import RestOutput from '../../../classes/utils/RestOutput';

import { FormDataProps } from '../../../components/Form/types';
import useUserStore from '../../../classes/stores/user.store';  // Importa el store
import RestManager from '../../../classes/managers/RestManager';
import useAppRest from '../../../integrations/RestIntegration';

export const loginFormData = (): FormDataProps => {

  const { t } = useTranslation();
  const history = useHistory();
  const [presentToast] = useIonToast();
  const { setData } = useUserStore();  // Obtén las funciones del store

  const debug = DebugUtils.setDebug(false);

  return {
    id: 'login-page',
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
        name: 'email',
        label: t('Email'),
        type: 'email',
        defaultValue: '',
        validationSchema: yup.string()
          .required(t('Email is required'))
          .email(t('This email is invalid...')),
        className: 'col-span-12',
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
      },
    ],
    buttons: [
      {
        name: 'submit',
        label: t('Submit'),
        type: 'submit',
        style: { borderRadius: '20px', float: 'left', width: '46%', margin: '2%' },
        icon: icon.starOutline,
      },
      {
        name: 'register',
        label: t('Register'),
        type: 'button',
        style: { display: 'inline-block', width: '46%', margin: '2%' },
        onClick: () => {
          history.push('/register');
        },
      },
    ],
    onSuccess: async (data: any) => {
      /*
      await useAppRest.post({
        req: {
          method: 'POST',
          url: `${apiUrl}/auth/local`,
          data: {
            identifier: data.email,
            password: data.password,
          },
        },
        onSuccess: {
          default: (res: any) => {
            if (res.status === 200) {
              setData(res.data.user);
              //presentToast(RestOutput.catchSuccess(res))
              //  .then(() => {
              //    history.push(HOME_PATH);
              //  });
            } else {
              //presentToast(RestOutput.catchSuccess(res));
            }
          },
        },
        onError: {
          default: (error: any) => {

            //RestOutput.catchDanger(error);

            //presentToast(RestOutput.catchDanger(error));
          },
        },
        onFinally: () => {

        },
      });
      */
    },
    onError: (errors: any) => {
      //const output = RestOutput.catchFormError(errors);
      //output.header = 'Login error';
      //presentToast(output);
    },
  };
};
