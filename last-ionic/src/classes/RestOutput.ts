import { checkboxOutline, warningOutline, skullOutline, closeCircle } from 'ionicons/icons';
import i18n from 'i18next';
import { MyExtraOutputOptions } from '../interfaces/ModalToastProps';
import Logger from './LoggerClass';
import { AxiosError, AxiosResponse } from 'axios';
import DebugUtil from './utils/DebugUtil';

class RestOutput {

  private debug = DebugUtil.setDebug(false);

  private defaultMessages = {
    success: {
      icon: checkboxOutline,
      color: 'success',
      header: i18n.t('Greetings!'),
      message: i18n.t('The operation was correct!'),
    },
    warning: {
      icon: warningOutline,
      color: 'warning',
      header: i18n.t('Pay attention!'),
      message: i18n.t('The operation has some conflict!'),
    },
    danger: {
      icon: skullOutline,
      color: 'danger',
      header: i18n.t('Caution!'),
      message: i18n.t('The operation resulted in error!'),
    },
    formDanger: {
      icon: warningOutline,
      color: 'warning',
      header: i18n.t('Form error!'),
      message: i18n.t('Something was wrong sending the form!'),
    },
  };

  private default = {
    duration: 3000,
    color: 'success',
    header: i18n.t('Greetings!')
  };

  public catchSuccess(response: AxiosResponse, props?: MyExtraOutputOptions, debug?: boolean): MyExtraOutputOptions {
    const output = this.setOutputMessage(
      response,
      this.setOutput(props, this.defaultMessages.success as MyExtraOutputOptions),
      props
    );
    if (this.debug || debug) Logger.log(' • CatchSuccess::error::output', response, output);
    return output;
  }

  public catchWarning(error: AxiosError, props?: MyExtraOutputOptions, debug?: boolean): MyExtraOutputOptions {
    const output = this.setOutputMessage(
      error,
      this.setOutput(props, this.defaultMessages.warning as MyExtraOutputOptions),
      props
    );
    if (this.debug || debug) Logger.log(' • CatchWarning::error::output', error, output);
    return output;
  }

  public catchDanger(error: AxiosError, props?: MyExtraOutputOptions, debug?: boolean): MyExtraOutputOptions {
    const output = this.setOutputMessage(
      error,
      this.setOutput(props, this.defaultMessages.danger as MyExtraOutputOptions),
      props
    );
    if (this.debug || debug) Logger.log(' • CatchDanger::error::output', error, output);
    return output;
  }

  public catchFormError(errors: any, props?: MyExtraOutputOptions, debug?: boolean): MyExtraOutputOptions {
    let error = this.catchDanger(errors, this.defaultMessages.formDanger as MyExtraOutputOptions);
    error.header = props?.header || this.defaultMessages.formDanger.header;
    error = this.setMessage(errors, error, props);
    if (this.debug || debug) Logger.log(' • CatchFormError::error::output', errors, error);
    return error;
  }

  private setMessage(errors: any, error: any, props?: MyExtraOutputOptions) {
    if (props?.message) {
      error.message = props.message;
    } else if (props?.setInnerMessage) {
      error.message = this.findMessage(errors);
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
    return null;
  }

  private setOutputMessage(response: any, output: MyExtraOutputOptions, props?: MyExtraOutputOptions): MyExtraOutputOptions {
    if (props?.setInnerMessage) {
      output.message = this.findMessage(response);
    }
    if (output.message !== '' && props?.message) {
      output.message = props.message;
    }
    return output;
  }

  private getOutlineIcon = (filledIcon: string): string => {
    const iconsMap: { [key: string]: string } = {
        checkboxOutline,
        warningOutline,
        skullOutline,
        closeCircle
    };

    const iconName = Object.keys(iconsMap).find(key => iconsMap[key as keyof typeof iconsMap] === filledIcon);

    if (iconName) {
        const outlineIconName = `${iconName}Outline`;
        return iconsMap[outlineIconName] || filledIcon;
    }

    return filledIcon;
};


  private setOutput = (options?: MyExtraOutputOptions, merge?: MyExtraOutputOptions): any => {
    const defaultOptions = {
      message: 'Undefined message!',
      icon: closeCircle, // Valor por defecto
      duration: this.default.duration,
      color: this.default.color,
      header: this.default.header,
      buttons: [],
      position: 'bottom',
      positionAnchor: undefined,
      swipeGesture: undefined,
      translucent: false,
      layout: undefined,
      mode: 'ios',
      keyboardClose: true,
      setInnerMessage: true
    };

    const output = {
      ...defaultOptions,
      ...merge,
      ...options
    };

    output.icon = options?.icon || merge?.icon || defaultOptions.icon;

    return output;
  }

}

export default new RestOutput();
