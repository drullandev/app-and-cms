import React from 'react';
import { IonBadge } from '@ionic/react';
import { AccessibleIonBadge } from '../interfaces/accesibility';

/**
 * Component Badge
 * A custom wrapper around IonBadge that enforces accessibility attributes.
 * 
 * @author David Rullán Díaz
 * @href http://github.com/drullandev
 * @date 
 *
 * @param {AccessibleIonBadge} props Props of the component, enforcing accessibility attributes
 * @returns React component wrapping IonBadge
 */
const Badge: React.FC<AccessibleIonBadge> = (props: AccessibleIonBadge) => {
    const { ariaLabel, role = 'status', ...restProps } = props;

    // Force the accessibility attributes to be passed down to IonBadge
    return <IonBadge aria-label={ariaLabel} role={role} {...restProps} />;
};

export default React.memo(Badge);