import React from 'react';
import { IonToast } from '@ionic/react';
import { AccessibleIonToast } from '../interfaces/ionicAccesibility';

/**
 * Component Toast
 * A custom wrapper around IonToast that enforces accessibility attributes.
 * 
 * @author David Rullán Díaz
 * @href http://github.com/drullandev
 * @date 
 *
 * @param {AccessibleIonToast} props Props of the component, enforcing accessibility attributes
 * @returns React component wrapping IonToast
 */
const Toast: React.FC<AccessibleIonToast> = (props: AccessibleIonToast) => {
    const { ariaLabel, role = 'alert', ...restProps } = props;

    // Ensure accessibility attributes are passed down to IonToast
    return (
        <IonToast
            aria-label={ariaLabel}
            role={role}
            {...restProps}
        />
    );
};

export default React.memo(Toast);