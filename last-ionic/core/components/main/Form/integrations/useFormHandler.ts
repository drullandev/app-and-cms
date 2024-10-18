import { AxiosError, AxiosResponse, Method } from 'axios';
import i18n from '../../i18n';
import DOMPurify from 'dompurify';
import LoggerUtils from '../../../../classes/utils/LoggerUtils';
import useAppRest from '../../../../integrations/useAppRest';
import { addToast } from '../../../../integrations/stores/toast.store';
import { IFormData, ISubmitForm } from '../types';

const useFormHandler = (formData: IFormData) => {

  const debug = true;
  const logger = LoggerUtils.getInstance('FormHandler', debug);
  const avoided = ['privacy', 'publicity', 'submit'];
  
  const url = formData.url;
  const method: Method = formData.method ?? 'POST';

  const handleSubmit = async (submitData: ISubmitForm) => {

    const { data, onSuccess, onError } = submitData;

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

    logger.log('sanitizedData', sanitizedData);

    try {
      const res: AxiosResponse = await useAppRest.makeRequest<AxiosResponse>({
        url,
        method,
        data: sanitizedData,
      });

      // Ejecutar las acciones de éxito si están definidas
      if (onSuccess?.actions) {
        onSuccess.actions(res); // Invocamos las acciones
      }

      // Mostrar el toast de éxito si está configurado
      if (onSuccess?.show) {
        addToast(
          onSuccess.header || i18n.t('Success!'),
          onSuccess.message || i18n.t('Successfully sent the form'),
          'success'
        );
      }

    } catch (error: any) {
      const err = error as AxiosError;
      logger.error('Error during request:', err);

      let errorMessage = onError?.message || i18n.t('Error sending the form');
      let errorHeader = onError?.header || i18n.t('Login error!');

      // Manejo de errores según el estado HTTP
      if (err.response) {
        switch (err.response.status) {
          case 400:
            errorMessage = i18n.t('Invalid credentials. Please try again.');
            break;
          case 500:
            errorMessage = i18n.t('Server error. Please try again later.');
            break;
          default:
            errorMessage = (err.response.data as { message?: string })?.message || errorMessage;
            break;
        }
      }

      // Mostrar el toast de error si está configurado
      if (onError?.show) {
        addToast(
          errorHeader,
          errorMessage,
          'error'
        );
      }

      // Ejecutar las acciones de error si están definidas
      if (onError?.actions) {
        onError.actions(err); // Invocamos las acciones
      }
    }
  };

  return {
    handleSubmit,
  };
};

export default useFormHandler;
