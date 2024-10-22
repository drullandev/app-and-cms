import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

import { RestOutput, LoggerUtils } from '../../../classes/utils/index';
import { IFormComponent } from '../../../components/main/Form/types';
import { useUserStore, addToast, setIUserState, addModal } from '../../../integrations/stores';
import { identifierValidation, passwordValidation } from '../../../classes/strapi/validations';

const loginFormData = (): IFormComponent => {
  const debug = false;
  const logger = LoggerUtils.getInstance('loginFormData', debug);
  const { t } = useTranslation();
  const history = useHistory();
  const { setUserStore } = useUserStore();
  return {
    id: 'login-page',
    captcha: false,
    url: '/auth/local',
    fields: [
      {
        name: 'identifier',
        label: t('Nickname or Email'),
        type: 'text',
        className: 'col-span-12',
        validationSchema: identifierValidation(),
      },
      {
        name: 'password',
        label: t('Password'),
        type: 'password',
        className: 'col-span-12',
        secret: true,
        validationSchema: passwordValidation(),
      },
    ],

    onSuccess: async (res: any) => {

      const resUser = res.user;


      if (!resUser || typeof resUser !== 'object') {
        return addToast(RestOutput.danger({
          header: t('Error!'),
          message: t('Invalid user data received from the server'),
        }));
      }



      if (!resUser.confirmed) {
        return addToast(RestOutput.warning({
          header: t('Not confirmed yet!'),
          message: t('This user is not confirmed'),
        }));
      }

      if (resUser.blocked) {
        return addToast(RestOutput.danger({
          header: t('Blocked user!'),
          message: t('This user is blocked'),
        }));
      }

      const logged = true;
    
      const userState = setIUserState(res, resUser, logged);
      console.log('5', resUser)

      setUserStore(userState);

      if (logged && resUser && !resUser.blocked && resUser.confirmed) {
        logger.info('User connected!', userState);
        
        await addToast(RestOutput.success({
          header: t('Welcome to the app!'),
          message: t('You logged in successfully'),
        }));
    
        // Redireccionar después de un breve retraso
        setTimeout(() => {
          history.push('/home');
        }, 2000); // Espera de 2 segundos antes del redireccionamiento
      }

    },
    onError: (err: any) => {
      logger.error('Login error', err);
      addToast(RestOutput.danger({
        header: t('Login error!'),
        message: t('There was an error logging in'),
      }));
    },
  };
};

export default loginFormData;
