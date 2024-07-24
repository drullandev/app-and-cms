import React, { useEffect } from 'react';
import { ToastOptions, ModalOptions } from '@ionic/react';
import { MyExtraOutputOptions } from '../../interfaces/ModalToastProps';

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
