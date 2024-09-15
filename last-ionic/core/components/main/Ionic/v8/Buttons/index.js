import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { IonButtons } from '@ionic/react';
/**
 * Component Buttons
 * A custom wrapper around IonButtons that enforces accessibility attributes.
 *
 * @author David Rullán Díaz
 * @href http://github.com/drullandev
 * @date
 *
 * @param {AccessibleIonButtons} props Props of the component, enforcing accessibility attributes
 * @returns React component wrapping IonButtons
 */
const Buttons = ({ ariaLabel, role = 'toolbar', children, ...restProps }) => {
    // Force the accessibility attributes to be passed down to IonButtons
    return (_jsx(IonButtons, { "aria-label": ariaLabel, role: role, ...restProps, children: children }));
};
export default React.memo(Buttons);
