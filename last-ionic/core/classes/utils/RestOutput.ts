import { ToastOptions } from '@ionic/core';
import { ModalOptions } from '@ionic/core';
import { checkboxOutline, warningOutline, skullOutline, closeCircle, informationCircleOutline } from 'ionicons/icons';
import i18n from 'i18next';
import LoggerUtils from './LoggerUtils';
import DebugUtils from './DebugUtils';

enum ToastPosition {
  Top = 'top',
  Bottom = 'bottom',
  Middle = 'middle',
}

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
 * @author David Rullán - https://github.com/drullandev
 * @date September 3, 2024
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
   * Returns the single instance of RestOutput, creating it if necessary.
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
    return LoggerUtils.getInstance( this.debug, this.constructor.name);
  }

  /**
   * Generates default messages for success, warning, danger, and form error responses.
   * 
   * @returns Object containing default messages for different response types.
   */
  private getDefaultMessages() {
    return {
      info: {
        icon: informationCircleOutline,  // Usamos un icono de información
        color: ToastColor.Success,           // Puedes cambiar el color si lo prefieres
        header: i18n.t('Info'),
        message: i18n.t('Information'),
      },
      success: {
        icon: checkboxOutline,
        color: ToastColor.Success,
        header: i18n.t('Greetings!'),
        message: i18n.t('The operation was correct!'),
      },
      warning: {
        icon: warningOutline,
        color: ToastColor.Warning,
        header: i18n.t('Pay attention!'),
        message: i18n.t('The operation has some conflict!'),
      },
      danger: {
        icon: skullOutline,
        color: ToastColor.Danger,
        header: i18n.t('Caution!'),
        message: i18n.t('The operation resulted in error!'),
      },
      formDanger: {
        icon: warningOutline,
        color: ToastColor.Warning,
        header: i18n.t('Form error!'),
        message: i18n.t('Something went wrong sending the form!'),
      },
    };
  }

  /**
   * Generates a Toast output based on a successful operation.
   * 
   * @param props - Optional custom properties for the toast.
   * @returns ToastOptions formatted for the toast controller.
   */
  public catchSuccessToast(props: Partial<ToastOptions> = {}): ToastOptions {
    return this.setToastOutput(props, this.getDefaultMessages().success);
  }

  /**
   * Generates a Toast output based on a warning operation.
   * 
   * @param props - Optional custom properties for the toast.
   * @returns ToastOptions formatted for the toast controller.
   */
  public catchWarningToast(props: Partial<ToastOptions> = {}): ToastOptions {
    return this.setToastOutput(props, this.getDefaultMessages().warning);
  }

  /**
   * Generates a Toast output based on an error/danger operation.
   * 
   * @param props - Optional custom properties for the toast.
   * @returns ToastOptions formatted for the toast controller.
   */
  public catchDangerToast(props: Partial<ToastOptions> = {}): ToastOptions {
    return this.setToastOutput(props, this.getDefaultMessages().danger);
  }

  /**
   * Merges provided options with default toast options to produce the final output configuration.
   * 
   * @param props - Custom toast properties.
   * @param defaultMessage - The default message to merge with the props.
   * @returns The final ToastOptions object.
   */
  private setToastOutput(props: Partial<ToastOptions>, defaultMessage: any): ToastOptions {
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

    return { ...defaultToastOptions, ...props };
  }

  /**
  * Generates a Modal output for form errors.
  * 
  * @param component - The component to render in the modal.
  * @param props - Optional custom properties for the modal.
  * @returns ModalOptions formatted for the modal controller.
  */
  public catchFormErrorModal(component: any, props: Partial<ModalOptions> = {}): ModalOptions {
    const defaultMessage = this.getDefaultMessages().formDanger;
    // Añadimos el ícono `closeCircle` como predeterminado si no se proporciona uno.
    return this.setModalOutput(component, { ...props, componentProps: { ...props.componentProps, icon: closeCircle } }, defaultMessage);
  }

  /**
   * Merges provided options with default modal options to produce the final output configuration.
   * 
   * @param component - The component to render in the modal.
   * @param props - Custom modal properties.
   * @param defaultMessage - The default message to merge with the props.
   * @returns The final ModalOptions object.
   */
  private setModalOutput(component: any, props: Partial<ModalOptions>, defaultMessage: any): ModalOptions {
    const defaultModalOptions: ModalOptions = {
      component,
      componentProps: {
        header: defaultMessage.header,
        message: defaultMessage.message,
        icon: closeCircle,  // Ícono predeterminado de cierre
      },
      backdropDismiss: true,
      cssClass: 'custom-modal-class',
      mode: 'ios',
    };

    // Fusionamos el defaultModalOptions con cualquier `props` proporcionado.
    return { ...defaultModalOptions, ...props };
  }

};

// Export the singleton via the getInstance method
export default RestOutput.getInstance();
