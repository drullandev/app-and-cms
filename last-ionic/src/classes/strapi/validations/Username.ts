import * as yup from 'yup';
import i18n from '../../../components/main/i18n';

export const usernameRules = yup.string()
  .required(i18n.t('Username is required'))
  .min(7, i18n.t('Username must be at least 7 characters'));

export const usernameValidation = () => {
  return usernameRules
}

export default usernameValidation;