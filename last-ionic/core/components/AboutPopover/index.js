import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IonList, IonItem, IonLabel } from '@ionic/react';
;
const AboutPopover = ({ dismiss }) => {
    const close = (url) => {
        window.open(url, '_blank');
        dismiss();
    };
    return (_jsxs(IonList, { children: [_jsx(IonItem, { button: true, onClick: () => close('https://ionicframework.com/getting-started'), children: _jsx(IonLabel, { children: "Learn Ionic" }) }), _jsx(IonItem, { button: true, onClick: () => close('https://ionicframework.com/docs/react'), children: _jsx(IonLabel, { children: "Documentation" }) }), _jsx(IonItem, { button: true, onClick: () => close('https://showcase.ionicframework.com'), children: _jsx(IonLabel, { children: "Showcase" }) }), _jsx(IonItem, { button: true, onClick: () => close('https://github.com/ionic-team/ionic'), children: _jsx(IonLabel, { children: "GitHub Repo" }) }), _jsx(IonItem, { button: true, onClick: dismiss, children: _jsx(IonLabel, { children: "Support" }) })] }));
};
export default AboutPopover;
