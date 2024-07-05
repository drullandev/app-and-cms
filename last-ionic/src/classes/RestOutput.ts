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

class RestOutput {
  private err?: any;
  private design?: {
    outline?: boolean;
  };

  private duration?: number;

  public getOutput(props: RestOutputProps) {
    
    this.err = props.err;
    this.design = props.design;
    this.duration = props.duration ?? 2000;

    let errorOutput = setOutput({ message: 'Error calling Strapi service' });

    errorOutput.color = 'error';
    errorOutput.icon = this.design?.outline ? icon.skullOutline : icon.skull;
    errorOutput.message = i18n.t('Unknown error...');

    if (this.err?.response) {
      switch (this.err.response.status) {
        case 400:
          errorOutput.color = 'warning';
          errorOutput.icon = this.design?.outline ? icon.warningOutline : icon.warning;
          errorOutput.message = this.err.response.data.error?.message || errorOutput.message;
          break;

        case 500:
          if (this.err.message.includes('SMTP')) {
            errorOutput.color = 'warning';
            errorOutput.icon = this.design?.outline ? icon.warningOutline : icon.warning;
            errorOutput.message = i18n.t('Something is wrong with the email...');
          } else {
            errorOutput.color = 'error';
            errorOutput.icon = this.design?.outline ? icon.skullOutline : icon.skull;
            errorOutput.message = i18n.t('Internal server error!');
          }
          break;

        default:
          errorOutput.color = 'error';
          errorOutput.icon = this.design?.outline ? icon.skullOutline : icon.skull;
          errorOutput.message = this.err.response.data.message?.[0]?.messages?.[0]?.message || i18n.t('No message...');
      }
    } else if (this.err?.request) {
      errorOutput.color = 'error';
      errorOutput.icon = this.design?.outline ? icon.skullOutline : icon.skull;
      errorOutput.message = i18n.t('Sorry, no response received from server u_u!');
    } else {
      errorOutput.color = 'error';
      errorOutput.icon = this.design?.outline ? icon.skullOutline : icon.skull;
      errorOutput.message = i18n.t('Unexpected error occurred o.o!');
    }
    errorOutput.duration = this.duration
    return errorOutput;
  }
}

export default new RestOutput();
