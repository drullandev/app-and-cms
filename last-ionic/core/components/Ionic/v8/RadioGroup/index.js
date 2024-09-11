import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { IonRadioGroup } from '@ionic/react';
/**
 * Component RadioGroup
 * A custom wrapper around IonRadioGroup that enforces accessibility attributes.
 *
 * @author David Rullán Díaz
 * @href http://github.com/drullandev
 * @date
 *
 * @param {AccessibleIonRadioGroup} props Props of the component, enforcing accessibility attributes
 * @returns React component wrapping IonRadioGroup
 */
const RadioGroup = (props) => {
    const { ariaLabel, role = 'radiogroup', ...restProps } = props;
    // Ensure accessibility attributes are passed down to IonRadioGroup
    return _jsx(IonRadioGroup, { "aria-label": ariaLabel, role: role, ...restProps });
};
export default React.memo(RadioGroup);
