import { useTranslation } from 'react-i18next';
import { IFormComponent } from '../../../components/main/Form/types';
import { useUserStore, addToast } from '../../../integrations/stores';
import { usernameValidation, emailValidation } from '../../../classes/strapi/validations';
import { RestOutput, LoggerUtils } from '../../../classes/utils';

// Función genérica para manejar los formularios de todos los campos
const generateFormData = (fieldName: string, label: string, validationSchema: any, defaultValue: string): IFormComponent => {
  const debug = true;
  const logger = LoggerUtils.getInstance(`${fieldName}FormData`, debug);
  const { t } = useTranslation();
  const { setUserStore } = useUserStore();

  return {
    id: `${fieldName}-form`,
    url: '/users/me', // Ruta para actualizar el usuario en Strapi
    fields: [
      {
        name: fieldName,
        label: t(label),
        type: 'text',
        defaultValue: defaultValue,
        className: 'col-span-12',
        validationSchema: validationSchema,
      },
    ],
    onSuccess: (res: any) => {
      const updatedUser = res?.data;
      if (!updatedUser) {
        return addToast(RestOutput.danger({
          header: t('Error!'),
          message: t('Unexpected server response')
        }));
      }

      setUserStore({ [fieldName]: updatedUser[fieldName] });

      addToast(RestOutput.success({
        header: t('Success'),
        message: t(`${label} updated successfully`),
      }));

      logger.info(`${label} updated successfully!`, updatedUser);
    },
    onError: (err: any) => {
      logger.error(`Error updating ${label}`, err);
      addToast(RestOutput.danger({
        header: t('Update error'),
        message: t(`There was an error updating your ${label.toLowerCase()}`),
      }));
    },
  };
};

// Formularios específicos
export const usernameFormData = (): IFormComponent => {
  const { username } = useUserStore();
  return generateFormData('username', 'Username', usernameValidation(), username || '');
};

export const emailFormData = (): IFormComponent => {
  const { email } = useUserStore();
  return generateFormData('email', 'Email', emailValidation(), email || '');
};

export const providerFormData = (): IFormComponent => {
  const { provider } = useUserStore();
  return generateFormData('provider', 'Provider', null, provider || '');
};

export const darkModeFormData = (): IFormComponent => {
  const { darkMode } = useUserStore();
  return generateFormData('darkMode', 'Dark Mode', null, darkMode ? 'Enabled' : 'Disabled');
};

export const hasSeenTutorialFormData = (): IFormComponent => {
  const { hasSeenTutorial } = useUserStore();
  return generateFormData('hasSeenTutorial', 'Has Seen Tutorial', null, hasSeenTutorial);
};
