import React from 'react';
import { IonPicker } from '@ionic/react';
import { AccessibleIonPicker } from '../interfaces/ionicAccesibility';

/**
 * Component Picker
 * A custom wrapper around IonPicker that enforces accessibility attributes.
 * 
 * @author David Rullán Díaz
 * @href http://github.com/drullandev
 * @date 
 *
 * @param {AccessibleIonPicker} props Props of the component, enforcing accessibility attributes
 * @returns React component wrapping IonPicker
 */
const Picker: React.FC<AccessibleIonPicker> = (props: AccessibleIonPicker) => {
    const { ariaLabel, role = 'dialog', ...restProps } = props;

    // Ensure accessibility attributes are passed down to IonPicker
    return <IonPicker aria-label={ariaLabel} role={role} {...restProps} />;
};

export default React.memo(Picker);