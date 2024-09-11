import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { IonRefresher } from '@ionic/react';
/**
 * Component Refresher
 * A custom wrapper around IonRefresher that enforces accessibility attributes.
 *
 * @author David Rullán Díaz
 * @href http://github.com/drullandev
 * @date
 *
 * @param {AccessibleIonRefresher} props Props of the component, enforcing accessibility attributes
 * @returns React component wrapping IonRefresher
 */
const Refresher = (props) => {
    const { ariaLabel, role = 'progressbar', ...restProps } = props;
    // Ensure accessibility attributes are passed down to IonRefresher
    return (_jsx(IonRefresher, { "aria-label": ariaLabel, role: role, ...restProps }));
};
export default React.memo(Refresher);
