import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { IonRange } from '@ionic/react';
/**
 * Component Range
 * A custom wrapper around IonRange that enforces accessibility attributes.
 *
 * @author David Rullán Díaz
 * @href http://github.com/drullandev
 * @date
 *
 * @param {AccessibleIonRange} props Props of the component, enforcing accessibility attributes
 * @returns React component wrapping IonRange
 */
const Range = (props) => {
    const { ariaLabel, ariaValueMin, ariaValueMax, ariaValueNow, role = 'slider', ...restProps } = props;
    // Ensure accessibility attributes are passed down to IonRange
    return (_jsx(IonRange, { "aria-label": ariaLabel, "aria-valuemin": ariaValueMin, "aria-valuemax": ariaValueMax, "aria-valuenow": ariaValueNow, role: role, ...restProps }));
};
export default React.memo(Range);
