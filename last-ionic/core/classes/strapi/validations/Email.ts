import * as yup from 'yup';
import i18n from '../../../components/main/i18n';

export const identifierValidation = () => {

  const test = {
    key: 'email',
    message: i18n.t('Enter a valid email'),
    onValidation: function (value: string | undefined, context: yup.TestContext) {

      const { path, createError } = context;
      const isValidEmail = yup.string().email().isValidSync(value);

      if (!isValidEmail) {
        return createError({ path, message: i18n.t('Enter a valid email') });
      }

      return true; // Devuelve true si es válido
    }
  };

  return yup.string()
    .required(i18n.t('An email is required'))
    .test(test.key, test.message, test.onValidation); // Validación personalizada
};
