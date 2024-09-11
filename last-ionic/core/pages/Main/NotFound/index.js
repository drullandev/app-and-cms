import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { IonHeader, IonToolbar, IonContent, IonButtons, IonMenuButton, IonButton, IonIcon } from '@ionic/react';
import { ellipsisHorizontal, ellipsisVertical } from 'ionicons/icons';
const NotFound = () => {
    const history = useHistory();
    useEffect(() => {
        const timer = setTimeout(() => {
            history.push('/');
        }, 5000);
        return () => clearTimeout(timer);
    }, [history]);
    return (_jsxs(_Fragment, { children: [_jsx(IonHeader, { className: 'ion-no-border', children: _jsxs(IonToolbar, { children: [_jsx(IonButtons, { slot: 'start', children: _jsx(IonMenuButton, {}) }), _jsx(IonButtons, { slot: 'end', children: _jsx(IonButton, { children: _jsx(IonIcon, { slot: 'icon-only', ios: ellipsisHorizontal, md: ellipsisVertical }) }) })] }) }), _jsx(IonContent, { className: 'ion-padding', children: _jsxs("div", { className: 'notfound-header', children: [_jsx("h1", { children: "404 - Page Not Found" }), _jsx("p", { children: "You will be redirected to the home page in 5 seconds." })] }) })] }));
};
export default NotFound;
