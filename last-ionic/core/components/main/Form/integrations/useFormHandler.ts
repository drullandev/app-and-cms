// useFormHandler.ts
import { useIonToast } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { AxiosError, AxiosResponse, Method } from 'axios';
import { useTranslation } from 'react-i18next';

import LoggerUtils from '../../../../classes/utils/LoggerUtils';
import RestOutput from '../../../../classes/utils/RestOutput';
import { IFormData, ISubmitForm } from '../types';
import useAppRest from '../../../../integrations/useAppRest';
import useAppStore from '../../../../integrations/stores/app.store';

const useFormHandler = (formData: IFormData) => {

  const debug = false;
  const logger = LoggerUtils.getInstance('FormHandler', debug);

  const { t } = useTranslation();
  const history = useHistory();
  const [presentToast] = useIonToast();
  const setLoading = useAppStore((state) => state.setLoading);

  const url = formData.url;
  const method: Method = formData.method ?? 'POST'; // Default to POST if not specified

  const handleSubmit = async (submitData: ISubmitForm) => {
    const { data, onSuccess, onError, settings } = submitData;
  
    try {
      const response: AxiosResponse = await useAppRest.makeRequest<AxiosResponse>({
        url,
        method,
        data,
      });
  
      // Puedes acceder a response.data, response.status, etc.
      if (onSuccess) {
        onSuccess(response);
      }
  
    } catch (err) {
      const error = err as AxiosError;

      // Call onError callback if defined
      if (onError) {
        onError(error);
      }

      // Show error toast if 'show' is true in customErrorMessage
      if (settings?.customErrorMessage?.show) {
        const output = RestOutput.danger({
          header: settings?.customErrorMessage?.header || t('¡Error!'),
          message: settings?.customErrorMessage?.message || t('Error al enviar el formulario'),
        });

        logger.error(error);

        presentToast(output);
      }

    } finally {
      setLoading(false);
    }
  };

  return {
    handleSubmit,
  };

};

export default useFormHandler;
