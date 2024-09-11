import { jsx as _jsx } from "react/jsx-runtime";
import { IonAlert } from '@ionic/react';
const Alert = ({ slug, showAlert }) => (_jsx(IonAlert, { isOpen: showAlert, header: "Change Username", buttons: [
        'Cancel',
        {
            text: 'Ok',
            handler: (data) => {
                //setNickname(data.username);
            }
        }
    ], inputs: [
        {
            type: 'text',
            name: 'username',
            value: 'fghjghfghjghjhg',
            placeholder: 'username'
        }
    ], onDidDismiss: () => console.log() //setShowAlert(false)
 }));
export default Alert;
