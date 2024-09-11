import { jsx as _jsx } from "react/jsx-runtime";
// Required
import { useEffect, useState } from 'react';
import { IonToast } from '@ionic/react';
// Are you testing this tools set && app?
//let testingLogin = true
//let testing = testingLogin && import.meta.env.REACT_APP_TESTING
// - The main testing user will be used under testing
const Toast = (toastOptions) => {
    const [showToast, setShowToast] = useState(false);
    useEffect(() => {
        setShowToast(true);
    }, []);
    return _jsx(IonToast, { isOpen: showToast, onDidDismiss: () => setShowToast(false), message: toastOptions.message, duration: 1500 });
};
export default Toast;
