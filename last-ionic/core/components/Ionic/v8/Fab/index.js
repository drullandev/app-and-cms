import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { IonFab } from '@ionic/react';
/**
 * Component Fab
 * A custom wrapper around IonFab that enforces accessibility attributes.
 *
 * @author David Rullán Díaz
 * @href http://github.com/drullandev
 * @date
 *
 * @param {AccessibleIonFab} props Props of the component, enforcing accessibility attributes
 * @returns React component wrapping IonFab
 */
const Fab = (props) => {
    const { ariaLabel, role = 'button', ...restProps } = props;
    // Force the accessibility attributes to be passed down to IonFab
    return _jsx(IonFab, { "aria-label": ariaLabel, role: role, ...restProps });
};
export default React.memo(Fab);
