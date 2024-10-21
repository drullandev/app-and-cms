import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

import { AuthResponseStrapi, UserLoginStrapi } from '../../../classes/strapi/models';
import { RestOutput, LoggerUtils } from '../../../classes/utils/index';
import { IFormComponent, ISubmitForm } from '../../../components/main/Form/types';
import { useUserStore, addToast, setIUserState, addModal } from '../../../integrations/stores';
import { identifierValidation, passwordValidation } from '../../../classes/strapi/validations';

const loginFormData = (): IFormComponent => {
  const debug = false;
  const logger = LoggerUtils.getInstance('loginFormData', debug);
  const { t } = useTranslation();
  const history = useHistory();

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
    onSubmit: (data: UserLoginStrapi): ISubmitForm => {
      return {
        data: data,
        onSuccess: (res: AuthResponseStrapi) => {
          const resUser = res?.data?.user;

          if (!resUser || typeof resUser !== 'object') {
            return addToast(RestOutput.danger({
              header: t('Error!'),
              message: t('Invalid user data received from the server'),
            }));
          }

          if (!resUser.confirmed) {
            return addToast(RestOutput.warning({
              header: t('Not confirmed yet!'),
              message: t('This user is not confirmed')
            }));
          }

          if (resUser.blocked) {
            return addToast(RestOutput.danger({
              header: t('Blocked user!'),
              message: t('This user is blocked')
            }));
          }

          const logged = true;
          addModal(RestOutput.success({
            header: t('Welcome to the app!'),
            message: t('You logged in successfully'),
          }));

          const userState = setIUserState(res, resUser, logged);
          const { setUserStore } = useUserStore();
          setUserStore(userState);

          logger.info('User connected!', userState);
          if (logged && resUser && !resUser.blocked && resUser.confirmed) {
            history.push('/home');
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
    },
  };
};

export default loginFormData;
