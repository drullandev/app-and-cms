import React from 'react';
import { IonButtons } from '@ionic/react';
import { AccessibleIonButtons } from '../interfaces/ionicAccesibility';

/**
 * Component Buttons
 * A custom wrapper around IonButtons that enforces accessibility attributes.
 * 
 * @author David Rullán Díaz
 * @href http://github.com/drullandev
 * @date 
 *
 * @param {AccessibleIonButtons} props Props of the component, enforcing accessibility attributes
 * @returns React component wrapping IonButtons
 */
const Buttons: React.FC<AccessibleIonButtons> = ({ ariaLabel, role = 'toolbar', children, ...restProps }) => {
    // Force the accessibility attributes to be passed down to IonButtons
    return (
        <IonButtons aria-label={ariaLabel} role={role} {...restProps}>
            {children}
        </IonButtons>
    );
};

export default React.memo(Buttons);