// useFormHandler.ts

import { useIonToast } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { AxiosResponse, AxiosError, Method } from 'axios';
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
  const method: Method = formData.method ?? 'POST'; // Predeterminado a POST si no se especifica

  const handleSubmit = async (submitData: ISubmitForm) => {

    const { data, onSuccess, onError, settings } = submitData;

    try {

      const config= {};

      setLoading(true); // Iniciar estado de carga

      // Realizamos la llamada a la API utilizando makeRequest
      const response = useAppRest.makeRequest({
        url,
        method,
        config,
        data
      });

      // Mostramos un toast de éxito si 'show' es true en customSuccessMessage
      if (settings?.customSuccessMessage?.show) {
        const output = RestOutput.success({
          header: settings?.customSuccessMessage?.header || t('¡Éxito!'),
          message: settings?.customSuccessMessage?.message || t('Formulario enviado con éxito'),
        });
        presentToast(output);
      }

      if (onSuccess) {
        onSuccess(response);
      }

    } catch (err: any) {

      const error = err as AxiosError;

      // Invocamos el callback de error si está definido
      if (onError) {
        onError(error);
      }

      // Mostramos un toast de error si 'show' es true en customErrorMessage
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
