import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { IonDatetime } from '@ionic/react';
/**
 * Component Datetime
 * A custom wrapper around IonDatetime that enforces accessibility attributes.
 *
 * @author David Rullán Díaz
 * @href http://github.com/drullandev
 * @date
 *
 * @param {AccessibleIonDatetime} props Props of the component, enforcing accessibility attributes
 * @returns React component wrapping IonDatetime
 */
const Datetime = (props) => {
    const { ariaLabel, ariaRequired, ...restProps } = props;
    // Force the accessibility attributes to be passed down to IonDatetime
    return _jsx(IonDatetime, { "aria-label": ariaLabel, "aria-required": ariaRequired, ...restProps });
};
export default React.memo(Datetime);
