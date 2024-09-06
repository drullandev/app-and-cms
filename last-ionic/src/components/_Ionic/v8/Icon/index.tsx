import React from 'react';
import { IonIcon } from '@ionic/react';
import { AccessibleIonIcon } from '../interfaces/ionicAccesibility';

/**
 * Component Icon
 * A custom wrapper around IonIcon that enforces accessibility attributes.
 * 
 * @author David Rullán Díaz
 * @href http://github.com/drullandev
 * @date 
 *
 * @param {AccessibleIonIcon} props Props of the component, enforcing accessibility attributes
 * @returns React component wrapping IonIcon
 */
const Icon: React.FC<AccessibleIonIcon> = (props: AccessibleIonIcon) => {
    const { ariaLabel, role = 'img', ...restProps } = props;

    // Force the accessibility attributes to be passed down to IonIcon
    return <IonIcon aria-label={ariaLabel} role={role} {...restProps} />;
};

export default React.memo(Icon);