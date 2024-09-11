import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { IonSegment } from '@ionic/react';
/**
 * Component Segment
 * A custom wrapper around IonSegment that enforces accessibility attributes.
 *
 * @author David Rullán Díaz
 * @href http://github.com/drullandev
 * @date
 *
 * @param {AccessibleIonSegment} props Props of the component, enforcing accessibility attributes
 * @returns React component wrapping IonSegment
 */
const Segment = (props) => {
    const { ariaLabel, role = 'tablist', ...restProps } = props;
    // Ensure accessibility attributes are passed down to IonSegment
    return (_jsx(IonSegment, { "aria-label": ariaLabel, role: role, ...restProps }));
};
export default React.memo(Segment);
