import * as icon from 'ionicons/icons';
import i18n from 'i18next';
import { MyExtraOutputOptions } from '../interfaces/ModalToastProps';
import Logger from './LoggerClass';
import { AxiosError, AxiosResponse } from 'axios';
import DebugUtil from './DebugUtil';

class RestOutput {

  private debug = DebugUtil.setDebug(false);

  private defaultMessages = {
    success: {
      icon: icon.checkboxOutline,
      color: 'success',
      header: i18n.t('Greetings!'),
      message: i18n.t('The operation was correct!'),
    },
    warning: {
      icon: icon.warningOutline,
      color: 'warning',
      header: i18n.t('Pay attention!'),
      message: i18n.t('The operation has some conflict!'),
    },
    danger: {
      icon: icon.skullOutline,
      color: 'danger',
      header: i18n.t('Caution!'),
      message: i18n.t('The operation resulted in error!'),
    },
    formDanger: {
      icon: icon.warningOutline,
      color: 'warning',
      header: i18n.t('Form error!'),
      message: i18n.t('Something was wrong sending the form!'),
    },

  };

  private default = {
    duration: 3000,
    color: 'success',
    header: i18n.t('Greetings!')
  }

  /**
   * Handles successful responses and returns a structured output.
   * @param response The response object to process.
   * @param props Optional custom properties to override the default output.
   * @returns Structured output options for displaying success.
   */
  public catchSuccess(response: AxiosResponse, props?: MyExtraOutputOptions, debug? :boolean): MyExtraOutputOptions {
    const output = this.setOutputMessage(
      response,
      this.setOutput(props, this.defaultMessages.success as MyExtraOutputOptions),
      props
    );
    if (this.debug || debug) Logger.log(' • CatchWarning::error::output', response, output)
    return output
  }

  /**
   * Handles warnings and returns a structured output.
   * @param error The error object to process.
   * @param props Optional custom properties to override the default output.
   * @returns Structured output options for displaying warnings.
   */
  public catchWarning(error: AxiosError, props?: MyExtraOutputOptions, debug?: boolean): MyExtraOutputOptions {
    const output = this.setOutputMessage(
      error,
      this.setOutput(props, this.defaultMessages.warning as MyExtraOutputOptions),
      props
    );
    if (this.debug || debug) Logger.log(' • CatchWarning::error::output', error, output)
    return output;
  }

  /**
   * Handles errors and returns a structured output.
   * @param error The error object to process.
   * @param props Optional custom properties to override the default output.
   * @returns Structured output options for displaying errors.
   */
  public catchDanger(error: AxiosError, props?: MyExtraOutputOptions, debug?: boolean): MyExtraOutputOptions {
    const output = this.setOutputMessage(
      error,
      this.setOutput(props, this.defaultMessages.danger as MyExtraOutputOptions),
      props
    );
    if (this.debug || debug) Logger.log(' • CatchDanger::error::output', error, output)
    return output
  }

  /**
   * Handles form validation errors and returns a structured output.
   * @param errors The error object containing form validation errors.
   * @param props Optional custom properties to override the default output.
   * @returns Structured output options for displaying form errors.
   */
  public catchFormError(errors: any, props?: MyExtraOutputOptions, debug?: boolean): MyExtraOutputOptions {

    let error = this.catchDanger(errors, this.defaultMessages.formDanger as MyExtraOutputOptions);

    error.header = props?.header || this.defaultMessages.formDanger.header;

    error = this.setMessage(errors, error, props)
    
    if (this.debug || debug) Logger.log(' • CatchWarning::error::output', errors, error)

    return error;
  }

  private setMessage( errors: any, error: any, props?: MyExtraOutputOptions){

    if (props?.message) {

      error.message = props.message;
    } else if (props?.setInnerMessage) {

      error.message = this.findMessage(errors)
    } else if (errors) {

      Object.keys(errors).forEach((errorKey: string) => {
        if (errors[errorKey]?.message) {
          let errorMessage = errors[errorKey].message || '';
          error.message += (errorMessage ? `\n- ${errorMessage}` : '');
        }
      });

    } else {
      error.message = this.defaultMessages.formDanger.message;
    }

    return error;
  }

  private setHEader(){

  }

  /**
   * Recursively finds a 'message' property in an object.
   * This function is useful for extracting error messages from nested objects.
   * @param obj The object to search for a 'message' property.
   * @returns The found message or null if no message is found.
   */
  private findMessage(obj: any): any {
    if (obj && typeof obj === 'object') {
      if (obj.hasOwnProperty('message')) {
        return obj['message'];
      }
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          const message = this.findMessage(obj[key]);
          if (message !== undefined) {
            return message;
          }
        }
      }
    }
    return null; // Return null if no 'message' is found
  }

  /**
   * Sets the output message based on the response and props.
   * @param response The response object to process.
   * @param output The output options to set.
   * @param props Additional properties to set for the output.
   * @returns Structured output options for displaying messages.
   */
  private setOutputMessage(response: any, output: MyExtraOutputOptions, props?: MyExtraOutputOptions): MyExtraOutputOptions {
    if (props?.setInnerMessage) {
      output.message = this.findMessage(response);
    }
    if (output.message !== '' && props?.message) {
      output.message = props.message;
    }
    return output;
  }

  /**
   * Obtains the outline icon corresponding to a filled icon.
   * @param filledIcon The filled icon.
   * @returns The corresponding outline icon.
   */
  private getOutlineIcon = (filledIcon: any): any => {
    const iconName = Object.keys(icon).find(key => icon[key] === filledIcon);
    if (iconName) {
      const outlineIconName = `${iconName}Outline`;
      return icon[outlineIconName];
    }
    return filledIcon; // Return the original icon if no 'outline' icon is found
  };

  /**
   * Sets output options for displaying messages.
   * @param options The options to set for the output.
   * @param merge Additional properties to merge with the options.
   * @returns Structured output options for displaying messages.
   */
  private setOutput = (options?: MyExtraOutputOptions, merge?: MyExtraOutputOptions): MyExtraOutputOptions => {
    let output = {
      message: options?.message || merge?.message || '',
      icon: this.getOutlineIcon(options?.icon) || this.getOutlineIcon(merge?.icon) || this.getOutlineIcon(icon.closeCircle),
      duration: options?.duration || merge?.duration || this.default.duration,
      color: options?.color || merge?.color || this.default.color,
      header: options?.header || merge?.header || this.default.header,
      buttons: options?.buttons || merge?.buttons || [],
      position: options?.position || merge?.position || 'bottom',
      positionAnchor: options?.positionAnchor || merge?.positionAnchor || undefined,
      swipeGesture: options?.swipeGesture || merge?.swipeGesture || undefined,
      translucent: options?.translucent || merge?.translucent || false,
      layout: options?.layout || merge?.layout || undefined,
      mode: options?.mode || merge?.mode || 'ios',
      keyboardClose: options?.keyboardClose || merge?.keyboardClose || true,
      setInnerMessage: options?.setInnerMessage || merge?.setInnerMessage || true
    };
    return output;
  }

}

export default new RestOutput();
