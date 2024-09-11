import React from 'react';
import { IonIcon } from '@ionic/react';
import { AccessibleIonIcon } from '../interfaces/accesibility';

/**
 * Component Icon
 * A custom wrapper around IonIcon that enforces accessibility attributes.
 * 
 * @param {AccessibleIonIcon} props Props of the component, enforcing accessibility attributes
 * @returns React component wrapping IonIcon
 */
const Icon: React.FC<AccessibleIonIcon> = (props) => {
    const { ariaHidden = true, ariaLabel, ...restProps } = props;

    // Ensure accessibility attributes are passed down to IonIcon
    return <IonIcon aria-hidden={ariaHidden} aria-label={ariaLabel} {...restProps} />;
};

export default React.memo(Icon);
