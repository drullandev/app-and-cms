import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { IonPage } from '@ionic/react';
/**
 * Component Page
 * A custom wrapper around IonPage that enforces accessibility attributes.
 *
 * This component ensures that accessibility attributes are properly passed
 * to IonPage, making it more inclusive for users with disabilities.
 *
 * @author David Rullán Díaz
 * @href http://github.com/drullandev
 * @date
 *
 * @param {AccessibleIonPage} props Props of the component, enforcing accessibility attributes
 * @returns React component wrapping IonPage
 */
const Page = (props) => {
    const { ariaLabel = 'Page content', ...restProps } = props;
    // Ensure accessibility attributes are passed down to IonPage
    return _jsx(IonPage, { "aria-label": ariaLabel, ...restProps });
};
export default React.memo(Page);
