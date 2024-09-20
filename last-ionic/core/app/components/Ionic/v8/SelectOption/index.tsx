import React from 'react';
import { IonSelectOption } from '@ionic/react';
import { AccessibleIonSelectOption } from '../interfaces/accesibility';

/**
 * Component SelectOption
 * A custom wrapper around IonSelectOption that enforces accessibility attributes.
 * 
 * This component ensures that accessibility attributes are properly passed
 * to IonSelectOption, making the select options more inclusive for users with disabilities.
 * 
 * @author David Rullán Díaz
 * @href http://github.com/drullandev
 * @date 
 *
 * @param {AccessibleIonSelectOption} props Props of the component, enforcing accessibility attributes
 * @returns React component wrapping IonSelectOption
 */
const SelectOption: React.FC<AccessibleIonSelectOption> = (props: AccessibleIonSelectOption) => {
    const { ariaLabel, role = 'option', ...restProps } = props;

    // Ensure accessibility attributes are passed down to IonSelectOption
    return <IonSelectOption aria-label={ariaLabel} role={role} {...restProps} />;
};

export default React.memo(SelectOption);
