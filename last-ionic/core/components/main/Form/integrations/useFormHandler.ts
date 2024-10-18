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

    console.info('data', sanitizedData)
    try {

      await useAppRest
        .makeRequest<AxiosResponse>({
          url,
          method,
          data: sanitizedData,
        })
        .then((res)=>{

          if (onSuccess?.actions) {
            const result = onSuccess.actions(res);
            if (result){

            }
          }

          if (onSuccess?.show) {
            addToast(
              onSuccess.header || i18n.t('Success!'),
              onSuccess.message || i18n.t('Successfully sent the form'),
              'success'
            );
          }



        })
        .catch(()=>{
          addToast(
            onError?.header || i18n.t('Error!'),
            onError?.message || i18n.t('You have a form error'),
            'error'
          );
        });

    } catch (error) {

      const err = error as AxiosError;
      logger.error('Error during request:', error);

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

      // Mostrar el toast de error
      if (onError?.show) {
        addToast(
          errorHeader,
          errorMessage,
          'error'
        );
      }

      // Ejecutar la acción onError si existe
      if (onError?.actions) {
        onError.actions(error);
      }

    }
  };

  return {
    handleSubmit,
  };
};

export default useFormHandler;
