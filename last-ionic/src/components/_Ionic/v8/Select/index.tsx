import React from 'react';
import { IonSelect } from '@ionic/react';
import { AccessibleIonSelect } from '../interfaces/ionicAccesibility';

/**
 * Component Select
 * A custom wrapper around IonSelect that enforces accessibility attributes.
 * 
 * @author David Rullán Díaz
 * @href http://github.com/drullandev
 * @date 
 *
 * @param {AccessibleIonSelect} props Props of the component, enforcing accessibility attributes
 * @returns React component wrapping IonSelect
 */
const Select: React.FC<AccessibleIonSelect> = (props: AccessibleIonSelect) => {
    const { ariaLabel, role = 'listbox', ...restProps } = props;

    // Ensure accessibility attributes are passed down to IonSelect
    return (
        <IonSelect
            aria-label={ariaLabel}
            role={role}
            {...restProps}
        />
    );
};

export default React.memo(Select);