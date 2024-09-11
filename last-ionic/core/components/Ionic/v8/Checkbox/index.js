import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { IonCheckbox } from '@ionic/react';
/**
 * Component Checkbox
 * A custom wrapper around IonCheckbox that enforces accessibility attributes.
 *
 * @author David Rullán Díaz
 * @href http://github.com/drullandev
 * @date
 *
 * @param {AccessibleIonCheckbox} props Props of the component, enforcing accessibility attributes
 * @returns React component wrapping IonCheckbox
 */
const Checkbox = (props) => {
    const { ariaLabel, ariaChecked, ...restProps } = props;
    // Force the accessibility attributes to be passed down to IonCheckbox
    return _jsx(IonCheckbox, { "aria-label": ariaLabel, "aria-checked": ariaChecked, ...restProps });
};
export default React.memo(Checkbox);
