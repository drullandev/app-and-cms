import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { IonFooter } from '@ionic/react';
/**
 * Component Footer
 * A custom wrapper around IonFooter that enforces accessibility attributes.
 *
 * This component ensures that accessibility attributes are properly passed
 * to IonFooter, making the footer section more inclusive for users with disabilities.
 *
 * @author David Rullán Díaz
 * @href http://github.com/drullandev
 * @date
 *
 * @param {AccessibleIonFooter} props Props of the component, enforcing accessibility attributes
 * @returns React component wrapping IonFooter
 */
const Footer = (props) => {
    const { ariaLabel, role = 'contentinfo', ...restProps } = props;
    // Ensure accessibility attributes are passed down to IonFooter
    return _jsx(IonFooter, { "aria-label": ariaLabel, role: role, ...restProps });
};
export default React.memo(Footer);
