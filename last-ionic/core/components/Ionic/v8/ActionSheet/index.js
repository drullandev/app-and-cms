import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { IonActionSheet } from '@ionic/react';
/**
 * Component ActionSheet
 * A custom wrapper around IonActionSheet that enforces accessibility attributes.
 *
 * @author David Rullán Díaz
 * @href http://github.com/drullandev
 * @date
 *
 * @param {AccessibleIonActionSheet} props Props of the component, enforcing accessibility attributes
 * @returns React component wrapping IonActionSheet
 */
const ActionSheet = (props) => {
    const { ariaLabel, role = 'menu', ...restProps } = props;
    // Force the accessibility attributes to be passed down to IonActionSheet
    return _jsx(IonActionSheet, { "aria-label": ariaLabel, role: role, ...restProps });
};
export default React.memo(ActionSheet);
