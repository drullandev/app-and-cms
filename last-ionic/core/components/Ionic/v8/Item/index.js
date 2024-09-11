import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { IonItem } from '@ionic/react';
/**
 * Component Item
 * A custom wrapper around IonItem that enforces accessibility attributes.
 *
 * @author David Rullán Díaz
 * @href http://github.com/drullandev
 * @date
 *
 * @param {AccessibleIonItem} props Props of the component, enforcing accessibility attributes
 * @returns React component wrapping IonItem
 */
const Item = (props) => {
    const { ariaLabel, role = 'listitem', ...restProps } = props;
    // Ensure accessibility attributes are passed down to IonItem
    return _jsx(IonItem, { "aria-label": ariaLabel, role: role, ...restProps });
};
export default React.memo(Item);
