import {
  checkboxOutline,
  warningOutline,
  skullOutline,
  closeCircle,
  informationCircleOutline,
} from 'ionicons/icons';

import i18n from 'i18next';
import LoggerUtils from './LoggerUtils';
import DebugUtils from './DebugUtils';
import { ToastOptions, ModalOptions, Color } from '@ionic/core';
type ToastColorKeys = 'primary' | 'success' | 'warning' | 'danger';

export interface IRestOutput {
  info(options?: Partial<ToastOptions>, faultMessage?: string): ToastOptions;
  success(options?: Partial<ToastOptions>, faultMessage?: string): ToastOptions;
  warning(options?: Partial<ToastOptions>, faultMessage?: string): ToastOptions;
  danger(options?: Partial<ToastOptions>, faultMessage?: string): ToastOptions;
  showOutput(
    type: Color,
    options?: Partial<ToastOptions | ModalOptions>,
    outputType?: 'toast' | 'modal',
    component?: any,
    faultMessage?: string
  ): ToastOptions | ModalOptions;
}

enum ToastPosition {
  Top = 'top',
  Bottom = 'bottom',
  Middle = 'middle',
}

enum ToastColor {
  Primary = 'primary',
  Success = 'success',
  Warning = 'warning',
  Danger = 'danger',
}

class RestOutput implements IRestOutput {
  private static instance: RestOutput;
  private debug: boolean;
  private logger: LoggerUtils;

  private constructor() {
    this.debug = DebugUtils.setDebug(false);
    this.logger = this.useLogger();
  }

  public static getInstance(): RestOutput {
    if (!RestOutput.instance) {
      RestOutput.instance = new RestOutput();
    }
    return RestOutput.instance;
  }

  private useLogger(): LoggerUtils {
    return LoggerUtils.getInstance(this.constructor.name);
  }

  private getDefaultMessages() {
    return {
      primary: {
        icon: informationCircleOutline,
        color: ToastColor.Primary,
        header: i18n.t('Primary'),
        message: i18n.t('Primary message'),
        faultMessage: i18n.t('There was an issue with the primary action.')
      },
      success: {
        icon: checkboxOutline,
        color: ToastColor.Success,
        header: i18n.t('Success'),
        message: i18n.t('The operation was successful!'),
        faultMessage: i18n.t('The operation could not be completed successfully.')
      },
      warning: {
        icon: warningOutline,
        color: ToastColor.Warning,
        header: i18n.t('Warning'),
        message: i18n.t('The operation encountered a conflict!'),
        faultMessage: i18n.t('There was an issue with the operation.')
      },
      danger: {
        icon: skullOutline,
        color: ToastColor.Danger,
        header: i18n.t('Error'),
        message: i18n.t('The operation resulted in an error!'),
        faultMessage: i18n.t('A critical error occurred during the operation.')
      }
    };
  }

  private mapColorToMessageType(color: ToastColorKeys): keyof ReturnType<typeof this.getDefaultMessages> {
    return color;
  }
  

  public showOutput(
    type: Color,
    options: Partial<ToastOptions | ModalOptions> = {},
    outputType: 'toast' | 'modal' = 'toast',
    component?: any,
    faultMessage?: string
  ): ToastOptions | ModalOptions {
    const messageType = this.mapColorToMessageType(type as ToastColorKeys);
    const defaultMessage = this.getDefaultMessages()[messageType];
  
    const finalMessage = faultMessage ? faultMessage : defaultMessage.faultMessage;
  
    if (outputType === 'toast') {
      return this.createToast({ ...options, message: finalMessage }, defaultMessage);
    } else if (outputType === 'modal') {
      if (!component) {
        this.logger.error('Component must be provided for modal output.');
        throw new Error('Component must be provided for modal output.');
      }
  
      // Verifica que `options` sea de tipo `ModalOptions` antes de acceder a `componentProps`
      const modalOptions: Partial<ModalOptions> = {
        ...options,
        componentProps: {
          ...(options as ModalOptions).componentProps,  // Aseguramos que solo accedemos a `componentProps` si es ModalOptions
          header: defaultMessage.header,
          icon: closeCircle,
          message: finalMessage, // El mensaje en componentProps
        }
      };
  
      return this.createModal(component, modalOptions, defaultMessage);
    } else {
      this.logger.error(`Invalid output type: ${outputType}`);
      throw new Error(`Invalid output type: ${outputType}`);
    }
  }
  
  private createToast(
    customOptions: Partial<ToastOptions>,
    defaultMessage: any
  ): ToastOptions {
    const defaultToastOptions: ToastOptions = {
      message: defaultMessage.message,
      icon: defaultMessage.icon,
      color: defaultMessage.color,
      duration: 3000,
      position: ToastPosition.Bottom,
      header: defaultMessage.header,
      mode: 'ios',
      keyboardClose: true,
    };

    return { ...defaultToastOptions, ...customOptions };
  }

  private createModal(
    component: any,
    customOptions: Partial<ModalOptions>,
    defaultMessage: any
  ): ModalOptions {
    const defaultModalOptions: ModalOptions = {
      component,
      componentProps: {
        header: defaultMessage.header,
        message: defaultMessage.message,
        icon: closeCircle, // Default close icon
      },
      backdropDismiss: true,
      cssClass: 'custom-modal-class',
      mode: 'ios',
    };

    return { ...defaultModalOptions, ...customOptions };
  }

  public info(options: Partial<ToastOptions> = {}, faultMessage?: string): ToastOptions {
    return this.showOutput('primary', options, 'toast', undefined, faultMessage) as ToastOptions;
  }

  public success(options: Partial<ToastOptions> = {}, faultMessage?: string): ToastOptions {
    return this.showOutput('success', options, 'toast', undefined, faultMessage) as ToastOptions;
  }

  public warning(options: Partial<ToastOptions> = {}, faultMessage?: string): ToastOptions {
    return this.showOutput('warning', options, 'toast', undefined, faultMessage) as ToastOptions;
  }

  public danger(options: Partial<ToastOptions> = {}, faultMessage?: string): ToastOptions {
    return this.showOutput('danger', options, 'toast', undefined, faultMessage) as ToastOptions;
  }

}

export default RestOutput.getInstance();
