import { AxiosError, AxiosResponse, Method } from 'axios';
import i18n from '../../i18n';
import DOMPurify from 'dompurify';
import LoggerUtils from '../../../../classes/utils/LoggerUtils';
import useAppRest from '../../../../integrations/useAppRest';
import { addToast } from '../../../../integrations/stores/toast.store';
import { IFormData, ISubmitForm } from '../types';
import RestOutput from '../../../../classes/utils/RestOutput';

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

    try {

      const request = {
        url: url,
        method: method,
        data: sanitizedData,
      }

      const res: AxiosResponse = await useAppRest.makeRequest<AxiosResponse>(request);
      logger.info('Submited request:', request);


      if (onSuccess) {
        await onSuccess(res);
      }

    } catch (error: any) {

      const err = error as AxiosError;
      logger.error('Error during request:', err);

      let errorHeader = i18n.t('Form error!');
      let errorMessage = i18n.t('Error sending the form');

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

      addToast(RestOutput.danger({
        header: errorHeader,
        message: errorMessage,
      }));

      if (onError) {
        await onError(err);
      }

    }

  };

  return {
    handleSubmit,
  };
};

export default useFormHandler;
