import React from 'react';
import { IonToolbar } from '@ionic/react';
import { AccessibleIonToolbar } from '../interfaces/accesibility';

/**
 * Component Toolbar
 * A custom wrapper around IonToolbar that enforces accessibility attributes.
 * 
 * This component ensures that accessibility attributes are properly passed
 * to IonToolbar, making the toolbar section more inclusive for users with disabilities.
 * 
 * @author David Rullán Díaz
 * @href http://github.com/drullandev
 * @date 
 *
 * @param {AccessibleIonToolbar} props Props of the component, enforcing accessibility attributes
 * @returns React component wrapping IonToolbar
 */
const Toolbar: React.FC<AccessibleIonToolbar> = (props: AccessibleIonToolbar) => {
    const { ariaLabel, role = 'toolbar', ...restProps } = props;

    // Ensure accessibility attributes are passed down to IonToolbar
    return <IonToolbar aria-label={ariaLabel} role={role} {...restProps} />;
};

export default React.memo(Toolbar);
