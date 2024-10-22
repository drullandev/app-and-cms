import React from 'react';
import { IonTextarea } from '@ionic/react';
import { AccessibleIonTextarea } from '../interfaces/accesibility';

/**
 * Component Textarea
 * A custom wrapper around IonTextarea that enforces accessibility attributes.
 * 
 * This component ensures that accessibility attributes are properly passed
 * to IonTextarea, making the textarea content more inclusive for users with disabilities.
 * 
 * @author David Rullán Díaz
 * @href http://github.com/drullandev
 * @date 
 *
 * @param {AccessibleIonTextarea} props Props of the component, enforcing accessibility attributes
 * @returns React component wrapping IonTextarea
 */
const Textarea: React.FC<AccessibleIonTextarea> = (props: AccessibleIonTextarea) => {
    const { ariaLabel, role = 'textbox', ...restProps } = props;

    // Ensure accessibility attributes are passed down to IonTextarea
    return <IonTextarea aria-label={ariaLabel} role={role} {...restProps} />;
};

export default React.memo(Textarea);
