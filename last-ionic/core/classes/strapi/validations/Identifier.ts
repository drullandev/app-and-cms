import * as yup from 'yup';
import i18n from '../../../components/main/i18n';

export const identifierValidation = () => {

  const test = {
    key: 'email-or-username',
    message: i18n.t('Enter a valid email or username (3-30 chars)'),
    onValidation: function (value: string | undefined, context: yup.TestContext) {

      const { path, createError } = context;
      const isValidEmail = yup.string().email().isValidSync(value);
      const isValidUsername = yup.string()
        .matches(/^[a-zA-Z0-9_.-]{3,30}$/)
        .isValidSync(value);

      // Si no es válido, usamos createError para devolver un mensaje personalizado
      if (!isValidEmail && !isValidUsername) {
        return createError({ path, message: i18n.t('Enter a valid email or username (3-30 chars)') });
      }

      return true; // Devuelve true si es válido
    }
  };

  return yup.string()
    .required(i18n.t('An email or username is required')) // Mensaje de requerido
    .test(test.key, test.message, test.onValidation); // Validación personalizada
};

export default identifierValidation;