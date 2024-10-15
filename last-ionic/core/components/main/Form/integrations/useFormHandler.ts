import { AxiosError, AxiosResponse, Method } from 'axios';
import LoggerUtils from '../../../../classes/utils/LoggerUtils';
import RestOutput from '../../../../classes/utils/RestOutput';
import { IFormData, ISubmitForm } from '../types';
import useAppRest from '../../../../integrations/useAppRest';
import i18n from '../../i18n';
import { useState } from 'react';

const useFormHandler = (formData: IFormData) => {

  const debug = false;
  const logger = LoggerUtils.getInstance('FormHandler', debug);

  const url = formData.url;
  const method: Method = formData.method ?? 'POST';

  const displayMessage = (type: 'success' | 'error', settings?: IFormData['settings']) => {
    if (type === 'success' && settings?.customSuccessMessage?.show) {
      RestOutput.success({
        header: settings.customSuccessMessage.header || i18n.t('Success!'),
        message: settings.customSuccessMessage.message || i18n.t('Successfully sent the form'),
      });
    } else if (type === 'error' && settings?.customErrorMessage?.show) {
      RestOutput.danger({
        header: settings.customErrorMessage.header || i18n.t('Error!'),
        message: settings.customErrorMessage.message || i18n.t('Error sending the form'),
      });
    }
  };

  const handleSubmit = async (submitData: ISubmitForm) => {
    const { data, onSuccess, onError, settings } = submitData;

    try {
      const res: AxiosResponse = await useAppRest.makeRequest<AxiosResponse>({
        url,
        method,
        data,
      });

      displayMessage('success', settings);
      onSuccess?.(res);

    } catch (err) {
      const error = err as AxiosError;
      displayMessage('error', settings);
      logger.error(error);
      onError?.(error);

    } finally {

    }
  };

  return {
    handleSubmit,
  };
};

export default useFormHandler;
