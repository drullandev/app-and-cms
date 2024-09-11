import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { IonBadge } from '@ionic/react';
/**
 * Component Badge
 * A custom wrapper around IonBadge that enforces accessibility attributes.
 *
 * @author David Rullán Díaz
 * @href http://github.com/drullandev
 * @date
 *
 * @param {AccessibleIonBadge} props Props of the component, enforcing accessibility attributes
 * @returns React component wrapping IonBadge
 */
const Badge = (props) => {
    const { ariaLabel, role = 'status', ...restProps } = props;
    // Force the accessibility attributes to be passed down to IonBadge
    return _jsx(IonBadge, { "aria-label": ariaLabel, role: role, ...restProps });
};
export default React.memo(Badge);
