import React, { useEffect } from 'react';
import { ToastOptions, ModalOptions } from '@ionic/react';
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


const ModalToast: React.FC<MyExtraOutputOptions> = (props) => {

  useEffect(() => {
    if (props.isModal) {
      presentModal(props as ModalOptions);
    } else {
      presentToast(props as ToastOptions);
    }
  }, [props]);

  const presentToast = async (options: ToastOptions) => {
    const toast = document.createElement('ion-toast');
    Object.assign(toast, options);
    document.body.appendChild(toast);
    await toast.present();
  };

  const presentModal = async (options: ModalOptions) => {
    const modal = document.createElement('ion-modal');
    Object.assign(modal, options);
    document.body.appendChild(modal);
    await modal.present();
  };

  return null;
};

export default ModalToast;
