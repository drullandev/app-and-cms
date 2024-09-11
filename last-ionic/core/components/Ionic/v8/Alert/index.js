import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { IonAlert } from '@ionic/react';
/**
 * Component Alert
 * A custom wrapper around IonAlert that enforces accessibility attributes.
 *
 * @author David Rullán Díaz
 * @href http://github.com/drullandev
 * @date
 *
 * @param {AccessibleIonAlert} props Props of the component, enforcing accessibility attributes
 * @returns React component wrapping IonAlert
 */
const Alert = (props) => {
    const { ariaLabel, role = 'alert', ...restProps } = props;
    // Force the accessibility attributes to be passed down to IonAlert
    return _jsx(IonAlert, { "aria-label": ariaLabel, role: role, ...restProps });
};
export default React.memo(Alert);
