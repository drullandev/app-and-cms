import React from 'react';
import { IonAlert } from '@ionic/react';
import { AccessibleIonAlert } from '../interfaces/ionicAccesibility';

/**
 * Component Alert
 * A custom wrapper around IonAlert that enforces accessibility attributes.
 * 
 * @author David Rullán Díaz
 * @href http://github.com/drullandev
 * @date 
 *
 * @param {AccessibleIonAlert} props Props of the component, enforcing accessibility attributes
 * @returns React component wrapping IonAlert
 */
const Alert: React.FC<AccessibleIonAlert> = (props: AccessibleIonAlert) => {
    const { ariaLabel, role = 'alert', ...restProps } = props;

    // Force the accessibility attributes to be passed down to IonAlert
    return <IonAlert aria-label={ariaLabel} role={role} {...restProps} />;
};

export default React.memo(Alert);