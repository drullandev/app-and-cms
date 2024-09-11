import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { IonIcon, IonText } from '@ionic/react';
import { warning } from 'ionicons/icons';
/**
 * Universal error element for the errors in the fields
 * - We are using the label to override name, because react-forms-hook was running with name when render errors
 * @param ErrorProps
 * @returns
 */
const Error = ({ name, label, errors }) => {
    return _jsx(IonText, { color: 'danger', className: 'ion-padding-start', style: { marginLeft: '5px', fontSize: '1rem' }, children: errors && errors[name] && (_jsxs("span", { role: 'alert', className: 'bold fade-in-5', style: { height: '18px' }, children: [_jsx(IonIcon, { style: { height: '14px', margin: '-0.7% 1% -0.7% 0' }, icon: warning }), _jsx(IonText, { "aria-live": "polite", children: errors[name].message.replace(name, label) })] })) });
};
export default React.memo(Error);
