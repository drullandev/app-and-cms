import { AxiosError, AxiosResponse, Method } from 'axios';
import LoggerUtils from '../../../../classes/utils/LoggerUtils';
import { IFormData, ISubmitForm } from '../types';
import useAppRest from '../../../../integrations/useAppRest';
import i18n from '../../i18n';
import { addToast } from '../../../../integrations/stores/toast.store';
import DOMPurify from 'dompurify';

const useFormHandler = (formData: IFormData) => {

  const debug = true;
  const logger = LoggerUtils.getInstance('FormHandler', debug);
  const avoided = ['privacy', 'publicity', 'submit'];
  
  const url = formData.url;
  const method: Method = formData.method ?? 'POST';

  const handleSubmit = async (submitData: ISubmitForm) => {

    const { data, onSuccess, onError, settings } = submitData;

    const filteredData = Object.keys(data).reduce((acc, key) => {
      if (!key.startsWith('button') && !avoided.includes(key)) {
        acc[key] = data[key];
      }
      return acc;
    }, {} as any);

    const sanitizedData = Object.keys(filteredData).reduce((acc, key) => {
      if (filteredData[key]) {
        acc[key] = DOMPurify.sanitize(filteredData[key]);
      }
      return acc;
    }, {} as any);

    try {

      const res: AxiosResponse = await useAppRest.makeRequest<AxiosResponse>({
        url,
        method,
        data: sanitizedData,
      });

      if (settings?.customSuccessMessage?.show) {
        addToast(
          settings.customSuccessMessage.header || i18n.t('Success!'),
          settings.customSuccessMessage.message || i18n.t('Successfully sent the form'),
          'success'
        );
      }

      onSuccess?.(res);

    } catch (err) {

      const error = err as AxiosError;
      logger.error('Error during request:', error);

      let errorMessage = settings?.customErrorMessage?.message || i18n.t('Error sending the form');
      let errorHeader = settings?.customErrorMessage?.header || i18n.t('Login error!');

      if (error.response) {
        switch (error.response.status) {
          case 400:
            errorMessage = i18n.t('Invalid credentials. Please try again.');
            break;
          case 500:
            errorMessage = i18n.t('Server error. Please try again later.');
            break;
          default:
            // Verificamos si `message` existe dentro de `error.response.data`
            errorMessage = (error.response.data as { message?: string })?.message || errorMessage;
            break;
        }
      }

      // Mostrar el toast de error
      if (settings?.customErrorMessage?.show) {
        addToast(
          errorHeader,
          errorMessage,
          'error'
        );
      }

      // Llamar a la función de manejo de errores
      onError?.(error);
    }
  };

  return {
    handleSubmit,
  };
};

export default useFormHandler;
