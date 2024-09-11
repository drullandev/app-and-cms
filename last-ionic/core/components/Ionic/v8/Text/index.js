import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { IonText } from '@ionic/react';
/**
 * Component Text
 * A custom wrapper around IonText that enforces accessibility attributes.
 *
 * This component ensures that accessibility attributes are properly passed
 * to IonText, making the text content more inclusive for users with disabilities.
 *
 * @author David Rullán Díaz
 * @href http://github.com/drullandev
 * @date
 *
 * @param {AccessibleIonText} props Props of the component, enforcing accessibility attributes
 * @returns React component wrapping IonText
 */
const Text = (props) => {
    const { ariaLabel, role = 'text', ...restProps } = props;
    // Ensure accessibility attributes are passed down to IonText
    return _jsx(IonText, { "aria-label": ariaLabel, role: role, ...restProps });
};
export default React.memo(Text);
