import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { IonLabel } from '@ionic/react';
/**
 * Component Label
 * A custom wrapper around IonLabel that enforces accessibility attributes.
 *
 * @author David Rullán Díaz
 * @href http://github.com/drullandev
 * @date
 *
 * @param {AccessibleIonLabel} props Props of the component, enforcing accessibility attributes
 * @returns React component wrapping IonLabel
 */
const Label = (props) => {
    const { ariaLabel, ...restProps } = props;
    // Ensure accessibility attributes are passed down to IonLabel
    return _jsx(IonLabel, { "aria-label": ariaLabel, ...restProps });
};
export default React.memo(Label);
