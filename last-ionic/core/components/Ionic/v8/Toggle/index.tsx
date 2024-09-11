import React from 'react';
import { IonToggle } from '@ionic/react';
import { AccessibleIonToggle } from '../interfaces/accesibility';

/**
 * Component Toggle
 * A custom wrapper around IonToggle that enforces accessibility attributes.
 * 
 * @author David Rullán Díaz
 * @href http://github.com/drullandev
 * @date 
 *
 * @param {AccessibleIonToggle} props Props of the component, enforcing accessibility attributes
 * @returns React component wrapping IonToggle
 */
const Toggle: React.FC<AccessibleIonToggle> = (props: AccessibleIonToggle) => {
    const { ariaLabel, role = 'switch', ...restProps } = props;

    // Ensure accessibility attributes are passed down to IonToggle
    return (
        <IonToggle
            aria-label={ariaLabel}
            role={role}
            {...restProps}
        />
    );
};

export default React.memo(Toggle);