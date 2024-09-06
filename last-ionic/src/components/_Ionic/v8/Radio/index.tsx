import React from 'react';
import { IonRadio } from '@ionic/react';
import { AccessibleIonRadio } from '../interfaces/ionicAccesibility';

/**
 * Component Radio
 * A custom wrapper around IonRadio that enforces accessibility attributes.
 * 
 * @author David Rullán Díaz
 * @href http://github.com/drullandev
 * @date 
 *
 * @param {AccessibleIonRadio} props Props of the component, enforcing accessibility attributes
 * @returns React component wrapping IonRadio
 */
const Radio: React.FC<AccessibleIonRadio> = (props: AccessibleIonRadio) => {
    const { ariaLabel, ariaChecked, ...restProps } = props;

    // Ensure accessibility attributes are passed down to IonRadio
    return <IonRadio aria-label={ariaLabel} aria-checked={ariaChecked} {...restProps} />;
};

export default React.memo(Radio);