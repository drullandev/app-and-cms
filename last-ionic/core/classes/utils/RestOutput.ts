import { ToastOptions, ModalOptions } from '@ionic/core';
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

/**
 * Enumeration for Toast positions.
 */
enum ToastPosition {
  Top = 'top',
  Bottom = 'bottom',
  Middle = 'middle',
}

/**
 * Enumeration for Toast colors.
 */
enum ToastColor {
  Success = 'success',
  Warning = 'warning',
  Danger = 'danger',
}

/**
 * RestOutput is a utility class that provides standardized output
 * formatting for REST API responses. It handles success, warning,
 * and danger messages, allowing for consistent user feedback throughout
 * the application. This class also integrates logging and debugging features.
 *
 * @class RestOutput
 */
class RestOutput {
  private static instance: RestOutput;
  private debug: boolean;
  private logger: LoggerUtils;

  /**
   * Private constructor to prevent direct instantiation.
   * Initializes the logger and debugging utilities.
   */
  private constructor() {
    this.debug = DebugUtils.setDebug(false); // Configure debug mode as needed
    this.logger = this.initLogger();
  }

  /**
   * Returns the singleton instance of RestOutput, creating it if necessary.
   *
   * @returns RestOutput instance.
   */
  public static getInstance(): RestOutput {
    if (!RestOutput.instance) {
      RestOutput.instance = new RestOutput();
    }
    return RestOutput.instance;
  }

  /**
   * Initializes and returns a LoggerUtils instance.
   *
   * @returns LoggerUtils instance.
   */
  private initLogger(): LoggerUtils {
    return LoggerUtils.getInstance(this.debug, this.constructor.name);
  }

  /**
   * Generates default messages for different response types.
   *
   * @returns Object containing default messages for various response categories.
   */
  private getDefaultMessages() {
    return {
      info: {
        icon: informationCircleOutline, // Information icon
        color: ToastColor.Success, // Success color
        header: i18n.t('Info'),
        message: i18n.t('Information'),
      },
      success: {
        icon: checkboxOutline, // Success icon
        color: ToastColor.Success, // Success color
        header: i18n.t('Success'),
        message: i18n.t('The operation was successful!'),
      },
      warning: {
        icon: warningOutline, // Warning icon
        color: ToastColor.Warning, // Warning color
        header: i18n.t('Warning'),
        message: i18n.t('The operation encountered a conflict!'),
      },
      danger: {
        icon: skullOutline, // Danger icon
        color: ToastColor.Danger, // Danger color
        header: i18n.t('Error'),
        message: i18n.t('The operation resulted in an error!'),
      },
      formError: {
        icon: warningOutline, // Warning icon
        color: ToastColor.Warning, // Warning color
        header: i18n.t('Form Error'),
        message: i18n.t('There was an issue submitting the form!'),
      },
    };
  }

  /**
   * Displays a toast or modal based on the specified type.
   *
   * @param type - The type of message ('info', 'success', 'warning', 'danger', 'formError').
   * @param options - Optional custom properties for the toast or modal.
   * @param outputType - The output type ('toast' | 'modal'). Defaults to 'toast'.
   * @returns ToastOptions | ModalOptions formatted for the respective controllers.
   */
  public showOutput(
    type: keyof ReturnType<typeof this.getDefaultMessages>,
    options: Partial<ToastOptions | ModalOptions> = {},
    outputType: 'toast' | 'modal' = 'toast',
    component?: any // Required only for modal
  ): ToastOptions | ModalOptions {
    const defaultMessage = this.getDefaultMessages()[type];

    if (outputType === 'toast') {
      return this.createToast(options, defaultMessage);
    } else if (outputType === 'modal') {
      if (!component) {
        this.logger.error('Component must be provided for modal output.');
        throw new Error('Component must be provided for modal output.');
      }
      return this.createModal(component, options, defaultMessage);
    } else {
      this.logger.error(`Invalid output type: ${outputType}`);
      throw new Error(`Invalid output type: ${outputType}`);
    }
  }

  /**
   * Creates a ToastOptions object by merging default and custom options.
   *
   * @param customOptions - Custom properties for the toast.
   * @param defaultMessage - The default message configuration.
   * @returns Merged ToastOptions object.
   */
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

    // Merge default options with custom options
    return { ...defaultToastOptions, ...customOptions };
  }

  /**
   * Creates a ModalOptions object by merging default and custom options.
   *
   * @param component - The component to render inside the modal.
   * @param customOptions - Custom properties for the modal.
   * @param defaultMessage - The default message configuration.
   * @returns Merged ModalOptions object.
   */
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

    // Merge default options with custom options
    return { ...defaultModalOptions, ...customOptions };
  }

  /**
   * Convenience method to display an info toast.
   *
   * @param options - Optional custom properties for the toast.
   * @returns ToastOptions formatted for the toast controller.
   */
  public info(options: Partial<ToastOptions> = {}): ToastOptions {
    return this.showOutput('info', options, 'toast') as ToastOptions;
  }

  /**
   * Convenience method to display a success toast.
   *
   * @param options - Optional custom properties for the toast.
   * @returns ToastOptions formatted for the toast controller.
   */
  public success(options: Partial<ToastOptions> = {}): ToastOptions {
    return this.showOutput('success', options, 'toast') as ToastOptions;
  }

  /**
   * Convenience method to display a warning toast.
   *
   * @param options - Optional custom properties for the toast.
   * @returns ToastOptions formatted for the toast controller.
   */
  public warning(options: Partial<ToastOptions> = {}): ToastOptions {
    return this.showOutput('warning', options, 'toast') as ToastOptions;
  }

  /**
   * Convenience method to display a danger toast.
   *
   * @param options - Optional custom properties for the toast.
   * @returns ToastOptions formatted for the toast controller.
   */
  public danger(options: Partial<ToastOptions> = {}): ToastOptions {
    return this.showOutput('danger', options, 'toast') as ToastOptions;
  }

  /**
   * Convenience method to display a form error modal.
   *
   * @param component - The component to render inside the modal.
   * @param options - Optional custom properties for the modal.
   * @returns ModalOptions formatted for the modal controller.
   */
  public formError(
    component: any,
    options: Partial<ModalOptions> = {}
  ): ModalOptions {
    return this.showOutput('formError', options, 'modal', component) as ModalOptions;
  }
}

/**
 * Export the singleton instance of RestOutput.
 */
export default RestOutput.getInstance();
