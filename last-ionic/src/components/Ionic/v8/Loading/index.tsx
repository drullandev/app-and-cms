import React from 'react';
import { IonLoading } from '@ionic/react';
import { AccessibleIonLoading } from '../interfaces/accesibility';

/**
 * Component Loading
 * A custom wrapper around IonLoading that enforces accessibility attributes.
 * 
 * @author David Rullán Díaz
 * @href http://github.com/drullandev
 * @date 
 *
 * @param {AccessibleIonLoading} props Props of the component, enforcing accessibility attributes
 * @returns React component wrapping IonLoading
 */
const Loading: React.FC<AccessibleIonLoading> = (props: AccessibleIonLoading) => {
    const { ariaLabel = 'Loading...', ...restProps } = props;

    // Ensure accessibility attributes are passed down to IonLoading
    return <IonLoading aria-label={ariaLabel} {...restProps} />;
};

export default React.memo(Loading);