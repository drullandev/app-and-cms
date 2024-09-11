import React from 'react';
import { IonCheckbox } from '@ionic/react';
import { AccessibleIonCheckbox } from '../interfaces/accesibility';

/**
 * Component Checkbox
 * A custom wrapper around IonCheckbox that enforces accessibility attributes.
 * 
 * @author David Rullán Díaz
 * @href http://github.com/drullandev
 * @date 
 *
 * @param {AccessibleIonCheckbox} props Props of the component, enforcing accessibility attributes
 * @returns React component wrapping IonCheckbox
 */
const Checkbox: React.FC<AccessibleIonCheckbox> = (props: AccessibleIonCheckbox) => {
    const { ariaLabel, ariaChecked, ...restProps } = props;

    // Force the accessibility attributes to be passed down to IonCheckbox
    return <IonCheckbox aria-label={ariaLabel} aria-checked={ariaChecked} {...restProps} />;
};

export default React.memo(Checkbox);