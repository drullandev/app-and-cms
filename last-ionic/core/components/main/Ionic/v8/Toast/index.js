import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { IonToast } from '@ionic/react';
/**
 * Component Toast
 * A custom wrapper around IonToast that enforces accessibility attributes.
 *
 * @author David Rullán Díaz
 * @href http://github.com/drullandev
 * @date
 *
 * @param {AccessibleIonToast} props Props of the component, enforcing accessibility attributes
 * @returns React component wrapping IonToast
 */
const Toast = (props) => {
    const { ariaLabel, role = 'alert', ...restProps } = props;
    // Ensure accessibility attributes are passed down to IonToast
    return (_jsx(IonToast, { "aria-label": ariaLabel, role: role, ...restProps }));
};
export default React.memo(Toast);
