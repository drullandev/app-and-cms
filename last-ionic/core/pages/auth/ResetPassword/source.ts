import * as icon from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import DebugUtils from '../../../classes/utils/DebugUtils';
import RestOutput from '../../../classes/utils/RestOutput';
import LoggerUtils from '../../../classes/utils/LoggerUtils';
import { IFormComponent, ISubmitForm } from '../../../components/main/Form/types';
import { IResetPassword } from '../../../classes/strapi/models/User';
import { passwordValidation, repeatPasswordValidation } from '../../../classes/strapi/validations';
import { addToast } from '../../../integrations/stores/index';

export const resetPasswordForm = (resetToken: string): IFormComponent => {
  const debug = DebugUtils.setDebug(false);
  const logger = LoggerUtils.getInstance('resetPasswordForm');
  const { t } = useTranslation();
  const history = useHistory();

  return {
    id: 'reset-password-page',
    url: '/auth/reset-password',  // Endpoint de Strapi para el restablecimiento de contraseña
    captcha: false,
    fields: [
      { 
        name: 'password',
        label: t('New Password'),
        type: 'password',
        defaultValue: '', 
        className: 'col-span-12',
        secret: true,
        validationSchema: passwordValidation(),
      },
      { 
        name: 'repeat-password',
        label: t('Confirm Password'),
        type: 'password',
        defaultValue: '', 
        className: 'col-span-12',
        secret: true,
        validationSchema: repeatPasswordValidation(),
      }
    ],

    onSubmit: (data: IResetPassword): ISubmitForm => {
      return {
        data: { ...data, token: resetToken },
        onSuccess: (res: any) => {
          addToast(RestOutput.success({
            header: t('Success!'),
            message: t('Your password has been reset successfully.'),
          }));
          logger.info('Password reset successfully.');

          // Redirect to login after password reset
          history.push('/login');
        },
        onError: (err: any) => {
          logger.error('Error resetting password', err);
          addToast(RestOutput.danger({
            header: t('Error!'),
            message: t('Failed to reset the password. Please try again.'),
          }));
        },
      };
    },
    onError: (err: any) => {
      logger.error(err);
    },
  };
};

export default resetPasswordForm;
