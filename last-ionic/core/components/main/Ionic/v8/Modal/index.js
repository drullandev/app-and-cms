import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { IonModal } from '@ionic/react';
/**
 * Component Modal
 * A custom wrapper around IonModal that enforces accessibility attributes.
 *
 * @author David Rullán Díaz
 * @href http://github.com/drullandev
 * @date
 *
 * @param {AccessibleIonModal} props Props of the component, enforcing accessibility attributes
 * @returns React component wrapping IonModal
 */
const Modal = (props) => {
    const { ariaLabel, role = 'dialog', ...restProps } = props;
    // Ensure accessibility attributes are passed down to IonModal
    return _jsx(IonModal, { "aria-label": ariaLabel, role: role, ...restProps });
};
export default React.memo(Modal);
