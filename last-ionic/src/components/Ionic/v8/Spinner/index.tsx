import React from 'react';
import { IonSpinner } from '@ionic/react';
import { AccessibleIonSpinner } from '../interfaces/accesibility';

/**
 * Component Spinner
 * A custom wrapper around IonSpinner that enforces accessibility attributes.
 * 
 * @author David Rullán Díaz
 * @href http://github.com/drullandev
 * @date 
 *
 * @param {AccessibleIonSpinner} props Props of the component, enforcing accessibility attributes
 * @returns React component wrapping IonSpinner
 */
const Spinner: React.FC<AccessibleIonSpinner> = (props: AccessibleIonSpinner) => {
    const { ariaLabel, role = 'status', ...restProps } = props;

    // Ensure accessibility attributes are passed down to IonSpinner
    return (
        <IonSpinner
            aria-label={ariaLabel}
            role={role}
            {...restProps}
        />
    );
};

export default React.memo(Spinner);