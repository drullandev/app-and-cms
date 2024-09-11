import { useEffect } from 'react';
const ModalToast = (props) => {
    useEffect(() => {
        if (props.isModal) {
            presentModal(props);
        }
        else {
            presentToast(props);
        }
    }, [props]);
    const presentToast = async (options) => {
        const toast = document.createElement('ion-toast');
        Object.assign(toast, options);
        document.body.appendChild(toast);
        await toast.present();
    };
    const presentModal = async (options) => {
        const modal = document.createElement('ion-modal');
        Object.assign(modal, options);
        document.body.appendChild(modal);
        await modal.present();
    };
    return null;
};
export default ModalToast;
