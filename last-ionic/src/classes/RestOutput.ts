import * as icon from 'ionicons/icons';
import { setOutput } from './output';
import i18n from 'i18next';

export interface RestOutputProps {
  err?: any;
  design?: {
    outline?: boolean;
  };
  duration?: number;
}

interface errorOutput {
  err: any;
  design: string,
}

class RestOutput {

  private err?: any;

  private design?: {
    outline?: boolean;
  };

  private duration?: number;

  public getOutput(error: any) {
    return setOutput({ message: error.response.data.data[0].messages[0].message });
  }

  public catchError(error: any) : any {

    var errorOutput = setOutput({ message: error.response.data.data[0].messages[0].message });

    errorOutput.color = 'danger';
    errorOutput.icon = this.design?.outline ? icon.skullOutline : icon.skull;

    if (this.err?.response) {

      switch (error.response.status) {

        case 400:

          errorOutput.color = 'warning';
          errorOutput.icon = this.design?.outline ? icon.warningOutline : icon.warning;
          //errorOutput.message = error.response.data.data[0].messages[0].message || errorOutput.message;

          break;

        case 500:

          if (error.message.includes('SMTP')) {

            errorOutput.color = 'warning';
            errorOutput.icon = this.design?.outline ? icon.warningOutline : icon.warning;
            //errorOutput.message = i18n.t('Something is wrong with the email...');

          } else {

            errorOutput.color = 'danger';
            errorOutput.icon = this.design?.outline ? icon.skullOutline : icon.skull;
            //errorOutput.message = i18n.t('Internal server error!');
            
          }
          break;

        default:
          errorOutput.color = 'danger';
          errorOutput.icon = this.design?.outline ? icon.skullOutline : icon.skull;
          //errorOutput.message = error.response.data.message?.[0]?.messages?.[0]?.message || i18n.t('No message...');
      }

    } else if (this.err?.request) {

      errorOutput.color = 'danger';
      errorOutput.icon = this.design?.outline ? icon.skullOutline : icon.skull;
      errorOutput.message = i18n.t('Sorry, no response received from server u_u!');

    }

    return errorOutput;



  }
}

export default new RestOutput();
