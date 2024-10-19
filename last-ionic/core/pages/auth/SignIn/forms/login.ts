import { useTranslation } from 'react-i18next';
import { AuthResponseStrapi, UserLoginStrapi } from '../../../../classes/strapi/models';
import { RestOutput, LoggerUtils } from '../../../classes/utils/index';
import { IFormComponent, ISubmitForm } from '../../../../components/main/Form/types';
import { useUserStore, addToast, setIUserState } from '../../../../integrations/stores';
import { identifierValidation, passwordValidation } from '../../../../classes/strapi/validations';

const loginFormData = (): IFormComponent => {
  const debug = true
  const logger = LoggerUtils.getInstance('loginFomData', debug);
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
    onSubmit: (data: UserLoginStrapi): ISubmitForm => {
      return {
        data: data,
        onSuccess: (res: AuthResponseStrapi) => {

          const resUser = res?.data?.user;

          if (!resUser) {

            addToast(RestOutput.danger({
              header: t('Error!'),
              message: t('Unexpected server response')
            }));

          } else {

            let logged = false;

            if (!resUser.confirmed) {
  
              addToast(RestOutput.warning({
                header: t('Not confirmed jet!'),
                message: t('This user is not confirmed')
              }));
  
            } else if (resUser.blocked) {
  
              addToast(RestOutput.danger({
                header: t('Blocked user!!'),
                message: t('This user is blocked')
              }));
  
            } else {
  
              logged = true;
  
              addToast(RestOutput.success({
                header: t('Welcome to the app!'),
                message: t('You logged successfully'),
              }));
  
            }
  
            const userState = setIUserState(res, resUser, logged);
            const { setUserStore } = useUserStore();
            setUserStore(userState);
  
            logged ? logger.info('You have connected!', userState) : logger.error('You have NOT connected!', userState);

          }

        },

        onError: (err: any) => {

          addToast(RestOutput.danger({
            header: t('Login error!'),
            message: t('There was an error logging in'),
          }));

        },

      }

    }

  };

};

export default loginFormData;