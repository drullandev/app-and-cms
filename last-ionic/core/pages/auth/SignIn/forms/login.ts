import { useTranslation } from 'react-i18next';
import { ILogin } from '../../../../classes/strapi/models/User';
import { IFormComponent, ISubmitForm } from '../../../../components/main/Form/types';
import { identifierValidation } from '../../../../classes/strapi/validations/Identifier';
import { passwordValidation } from '../../../../classes/strapi/validations/all.validations';
import RestOutput from '../../../../classes/utils/RestOutput';
import useUserStore, { setIUserState } from '../../../../integrations/stores/user.store';
import LoggerUtils from '../../../../classes/utils/LoggerUtils';
import { addToast } from '../../../../integrations/stores/toast.store';

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
    onSubmit: (data: ILogin) : ISubmitForm => {
      const formData = {
        data: data,
        onSuccess: {
          header: t('Welcome to the app!'),
          message: t('You logged successfully'),
          actions: (res: any): any => {

            const resUser = res.data.user;
  
            let logged = false;
  
            if (!resUser.confirmed) {

              addToast({
                color: 'warning',
                header: t('Not confirmed jet!'),
                message: t('This user is not confirmed')
              });
  
            } else if (resUser.blocked) {

              addToast({
                color: 'danger',
                header: t('Blocked user!!'),
                message: t('This user is blocked')
              });
  
            } else {
  
              logged = true;
            }
  
            const userState = setIUserState(res.data, resUser, logged);
            const { setUserStore } = useUserStore();
            setUserStore(userState);
  
            logged ? logger.info('You have connected!', userState) : logger.error('You have NOT connected!', userState);
  
          },
          
        },
        onError: {
          header: t('Login error!'),
          message: t('There was an error logging in'),
        },
      }
      return formData;
    }

  };

};

export default loginFormData;