import { useIonToast } from '@ionic/react';
import { useHistory } from 'react-router';
import { AxiosResponse, AxiosError, Method } from 'axios';
import { useTranslation } from 'react-i18next';

import Logger from '../../../../classes/utils/LoggerUtils';
import RestOutput from '../../../../classes/utils/RestOutput';
import { AuthResponse } from '../../../../classes/strapi/models/AuthResponse';
import useAppStore from '../../../../classes/stores/app.store'; // For loading
import useAppRest from '../../../../integrations/RestIntegration'; // To do the call to the api in this case!!
import { IFormData } from '../types'; // Asegúrate de importar todo correctamente

export interface SubmitForm {
  data: any;
  customSuccessMessage: { header?: string; message?: string }; // TODO: Externalize or make reusable
  customErrorMessage: { header?: string, message?: string }; // TODO: Externalize or make reusable
}

// Clase base para el manejo de formularios
class FormHandler {

  logger: Logger;
  history: any;
  presentToast: any;
  setUserStore: any;
  setLoading: any;
  t: any;
  formData: IFormData; // Store formData
  url: string;
  method: Method;

  constructor(formData: IFormData) {
    this.formData = formData; // Store formData from constructor
    this.url = formData.url;
    this.method = formData.method ?? 'POST'; // Default to POST if method is not specified

    const debug = false;
    this.logger = Logger.getInstance(debug, 'FormHandler');

    this.history = useHistory();
    const [toast] = useIonToast();
    this.presentToast = toast;
    const { setLoading } = useAppStore();
    this.setLoading = setLoading;

    const { t } = useTranslation();
    this.t = t;
  }

  // Método común para manejar el envío del formulario
  async handleSubmit(submitData: SubmitForm) {

    const { data, customSuccessMessage, customErrorMessage } = submitData; // Desestructuramos los datos del submitData

    try {
      // Make the API call using the stored URL and method
      await useAppRest.makeRequest({
        url: this.url, // Use formData URL
        method: this.method, // Use formData method or default to POST
        data: data // Data to be sent
      })
      .then((res: AxiosResponse<AuthResponse>) => {

        // Success output
        const output = RestOutput.success({
          header: customSuccessMessage.header || this.t('Greetings!'),
          message: customSuccessMessage.message || this.t('The form was sent!'),
        });
  
        this.logger.info(output);

        // Display success toast and call the success handler
        this.presentToast(output)
          .then(() => {
            this.formData.onSuccess(res); // Call formData onSuccess handler
          });

      })
      .catch((err: AxiosError) => {
        // Error output
        const output = RestOutput.danger({ 
          header: customErrorMessage.header || this.t('So sorry!'),
          message: customErrorMessage.message || this.t('Form send error'),
        });
  
        this.logger.error(err, output);

        // Display error toast and call the error handler
        this.presentToast(output)
          .then(() => {
            this.formData.onError(output); // Call formData onError handler
          });

      });

    } catch (err) {
      // Catch any unexpected errors
      const output = RestOutput.danger({ 
        header: customErrorMessage.header || this.t('Form error'),
        message: customErrorMessage.message || this.t('Was an error'), 
      });

      this.logger.error(err, output);

      // Display error toast and call error handler
      this.presentToast(output)
        .then(() => {
          this.formData.onError(output); // Call formData onError handler
        });

    } finally {
      this.setLoading(false); // Always set loading to false at the end
    }
  }

}

export default FormHandler;
