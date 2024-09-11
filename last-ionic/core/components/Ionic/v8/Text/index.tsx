import React from 'react';
import { IonText } from '@ionic/react';
import { AccessibleIonText } from '../interfaces/accesibility';

/**
 * Component Text
 * A custom wrapper around IonText that enforces accessibility attributes.
 * 
 * This component ensures that accessibility attributes are properly passed
 * to IonText, making the text content more inclusive for users with disabilities.
 * 
 * @author David Rullán Díaz
 * @href http://github.com/drullandev
 * @date 
 *
 * @param {AccessibleIonText} props Props of the component, enforcing accessibility attributes
 * @returns React component wrapping IonText
 */
const Text: React.FC<AccessibleIonText> = (props: AccessibleIonText) => {
    const { ariaLabel, role = 'text', ...restProps } = props;

    // Ensure accessibility attributes are passed down to IonText
    return <IonText aria-label={ariaLabel} role={role} {...restProps} />;
};

export default React.memo(Text);
