import { checkboxOutline, warningOutline, skullOutline, closeCircle } from 'ionicons/icons';
import i18n from 'i18next';

import LoggerUtils from './LoggerUtils';
import { AxiosError, AxiosResponse } from 'axios';
import DebugUtils from './DebugUtils';


import { ComponentRef, ComponentProps, FrameworkDelegate, AnimationBuilder, ModalHandleBehavior, Mode, IonicSafeString, ToastButton, ToastSwipeGestureDirection, ToastLayout, Color } from '@ionic/core';

// Interfaz base para las propiedades comunes
export interface MyOutputOptions {
  message: string;
  cssClass?: string | string[];
  duration?: number;
  animated?: boolean;
  id?: string;
  htmlAttributes?: { [key: string]: any };
  enterAnimation?: AnimationBuilder;
  leaveAnimation?: AnimationBuilder;
}

// Interfaz unificada que extiende las propiedades comunes y las específicas
export interface MyExtraOutputOptions<T extends ComponentRef = ComponentRef> extends MyOutputOptions {

  // Propiedades de ModalOptions
  component?: T;
  componentProps?: ComponentProps<T>;
  presentingElement?: HTMLElement;
  showBackdrop?: boolean;
  backdropDismiss?: boolean;
  delegate?: FrameworkDelegate;
  canDismiss?: boolean | ((data?: any, role?: string) => Promise<boolean>);
  mode?: Mode;
  keyboardClose?: boolean;
  breakpoints?: number[];
  initialBreakpoint?: number;
  backdropBreakpoint?: number;
  handle?: boolean;
  handleBehavior?: ModalHandleBehavior;

  // Propiedades de ToastOptions
  header?: string;
  buttons?: (ToastButton | string)[];
  position?: 'top' | 'bottom' | 'middle';
  positionAnchor?: HTMLElement | string;
  swipeGesture?: ToastSwipeGestureDirection;
  translucent?: boolean;
  icon?: string;
  layout?: ToastLayout;
  color?: Color;

  // Propiedad adicional para manejar mensajes HTML
  isHtmlMessage?: boolean;
  isModal?: boolean;
  setInnerMessage: boolean;
}

export interface MyComponentProps {
  name: string
  slug: string
  content?:{
    slug: string
  }
  params?: {
    label?: string
    slot?: string
  }
  override?: {
    label?: string
    slot?: string
  }
}

/**
 * RestOutput is a utility class that provides standardized output
 * formatting for REST API responses. It handles success, warning,
 * and danger messages, allowing for consistent user feedback throughout
 * the application. This class also integrates logging and debugging features.
 *
 * @author David Rullán - https://github.com/drullandev
 * @date September 3, 2024
 */
class RestOutput {

  private debug: boolean;
  private logger: LoggerUtils;

  // Default messages for different types of responses
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

  // Default settings for output messages
  private default = {
    duration: 3000,
    color: 'success',
    header: i18n.t('Greetings!')
  };

  /**
   * Constructs a new instance of RestOutput.
   * Initializes the logger and debugging utilities.
   */
  constructor() {
    this.debug = DebugUtils.setDebug(false); // Configure debug mode as needed
    this.logger = LoggerUtils.getInstance(this.constructor.name, this.debug, 100);

    if (this.debug) {
      this.logger.info("RestOutput initialized");
    }
  }

  /**
   * Handles successful responses from REST API calls.
   * Logs the response and returns a formatted output object.
   *
   * @param response - The Axios response object.
   * @param props - Optional. Additional output properties.
   * @param debug - Optional. Enables debugging for this operation.
   * @returns Formatted output options.
   */
  public catchSuccess(response: AxiosResponse, props?: MyExtraOutputOptions, debug?: boolean): MyExtraOutputOptions {
    const output = this.setOutputMessage(
      response,
      this.setOutput(props, this.defaultMessages.success as MyExtraOutputOptions),
      props
    );
    if (this.debug || debug) this.logger.info('CatchSuccess::response::output', { response, output });
    return output;
  }

  /**
   * Handles warning responses from REST API calls.
   * Logs the warning and returns a formatted output object.
   *
   * @param error - The Axios error object.
   * @param props - Optional. Additional output properties.
   * @param debug - Optional. Enables debugging for this operation.
   * @returns Formatted output options.
   */
  public catchWarning(error: AxiosError, props?: MyExtraOutputOptions, debug?: boolean): MyExtraOutputOptions {
    const output = this.setOutputMessage(
      error,
      this.setOutput(props, this.defaultMessages.warning as MyExtraOutputOptions),
      props
    );
    if (this.debug || debug) this.logger.warn('CatchWarning::error::output', { error, output });
    return output;
  }

  /**
   * Handles danger/error responses from REST API calls.
   * Logs the error and returns a formatted output object.
   *
   * @param error - The Axios error object.
   * @param props - Optional. Additional output properties.
   * @param debug - Optional. Enables debugging for this operation.
   * @returns Formatted output options.
   */
  public catchDanger(error: AxiosError, props?: MyExtraOutputOptions, debug?: boolean): MyExtraOutputOptions {
    const output = this.setOutputMessage(
      error,
      this.setOutput(props, this.defaultMessages.danger as MyExtraOutputOptions),
      props
    );
    if (this.debug || debug) this.logger.error('CatchDanger::error::output', { error, output });
    return output;
  }

  /**
   * Handles form submission errors.
   * Logs the error and returns a formatted output object with specific form error messaging.
   *
   * @param errors - The errors object from form submission.
   * @param props - Optional. Additional output properties.
   * @param debug - Optional. Enables debugging for this operation.
   * @returns Formatted output options with form-specific error messages.
   */
  public catchFormError(errors: any, props?: MyExtraOutputOptions, debug?: boolean): MyExtraOutputOptions {
    let error = this.catchDanger(errors, this.defaultMessages.formDanger as MyExtraOutputOptions);
    error.header = props?.header || this.defaultMessages.formDanger.header;
    error = this.setMessage(errors, error, props);
    if (this.debug || debug) this.logger.error('CatchFormError::error::output', { errors, error });
    return error;
  }

  /**
   * Sets the error message in the output object based on provided properties or existing error messages.
   *
   * @param errors - The errors object.
   * @param error - The current error output object.
   * @param props - Optional. Additional output properties.
   * @returns The updated error output object.
   */
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

  /**
   * Recursively finds the first message property in an object.
   *
   * @param obj - The object to search for a message.
   * @returns The message string if found, otherwise null.
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
    return null;
  }

  /**
   * Updates the output message based on the response and provided properties.
   *
   * @param response - The response object.
   * @param output - The current output object.
   * @param props - Optional. Additional output properties.
   * @returns The updated output object.
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
   * Retrieves the outline version of an icon, if available.
   *
   * @param filledIcon - The filled icon string.
   * @returns The corresponding outline icon string, or the filled icon if not found.
   */
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

  /**
   * Merges provided options with default options to produce the final output configuration.
   *
   * @param options - Optional. Custom output options.
   * @param merge - Optional. Additional options to merge.
   * @returns The final output configuration object.
   */
  private setOutput = (options?: MyExtraOutputOptions, merge?: MyExtraOutputOptions): any => {
    const defaultOptions = {
      message: 'Undefined message!',
      icon: closeCircle, // Default value
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
