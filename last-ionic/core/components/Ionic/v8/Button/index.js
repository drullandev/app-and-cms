import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { IonButton } from '@ionic/react';
/**
 * Component Button
 * A custom wrapper around IonButton that enforces accessibility attributes.
 *
 * @author David Rullán Díaz
 * @href http://github.com/drullandev
 * @date
 *
 * @param {AccessibleIonButton} props Props of the component, enforcing accessibility attributes
 * @returns React component wrapping IonButton
 */
const Button = (props) => {
    const { ariaLabel, ariaPressed, role = 'button', ...restProps } = props;
    // Force the accessibility attributes to be passed down to IonButton
    return _jsx(IonButton, { "aria-label": ariaLabel, "aria-pressed": ariaPressed, role: role, ...restProps });
};
export default React.memo(Button);
