import * as yup from 'yup';
import i18n from '../../../components/main/i18n';

const repeatPasswordValidation = () => {
  return yup.string()
    .required(i18n.t('Password is required'))
    .min(8, i18n.t('Password must be at least 8 characters'))
    .max(16, i18n.t('Password must be at max 16 characters'))
    .oneOf([yup.ref('password')], 'Passwords must match with previoous one!');
}

export default repeatPasswordValidation;