import React from 'react';
import { IonHeader } from '@ionic/react';
import { AccessibleIonHeader } from '../interfaces/accesibility';

/**
 * Component Header
 * A custom wrapper around IonHeader that enforces accessibility attributes.
 * 
 * This component ensures that accessibility attributes are properly passed
 * to IonHeader, making the header section more inclusive for users with disabilities.
 * 
 * @author David Rullán Díaz
 * @href http://github.com/drullandev
 * @date 
 *
 * @param {AccessibleIonHeader} props Props of the component, enforcing accessibility attributes
 * @returns React component wrapping IonHeader
 */
const Header: React.FC<AccessibleIonHeader> = (props: AccessibleIonHeader) => {
    const { ariaLabel, role = 'banner', ...restProps } = props;

    // Ensure accessibility attributes are passed down to IonHeader
    return <IonHeader aria-label={ariaLabel} role={role} {...restProps} />;
};

export default React.memo(Header);