import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { IonIcon } from '@ionic/react';
/**
 * Component Icon
 * A custom wrapper around IonIcon that enforces accessibility attributes.
 *
 * @param {AccessibleIonIcon} props Props of the component, enforcing accessibility attributes
 * @returns React component wrapping IonIcon
 */
const Icon = (props) => {
    const { ariaHidden = true, ariaLabel, ...restProps } = props;
    // Ensure accessibility attributes are passed down to IonIcon
    return _jsx(IonIcon, { "aria-hidden": ariaHidden, "aria-label": ariaLabel, ...restProps });
};
export default React.memo(Icon);
