import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { IonContent } from '@ionic/react';
/**
 * Component Content
 * A custom wrapper around IonContent that enforces accessibility attributes.
 *
 * @author David Rullán Díaz
 * @href http://github.com/drullandev
 * @date
 *
 * @param {AccessibleIonContent} props Props of the component, enforcing accessibility attributes
 * @returns React component wrapping IonContent
 */
const Content = (props) => {
    const { ariaLabel, role = 'main', ...restProps } = props;
    // Force the accessibility attributes to be passed down to IonContent
    return _jsx(IonContent, { "aria-label": ariaLabel, role: role, ...restProps });
};
export default React.memo(Content);
