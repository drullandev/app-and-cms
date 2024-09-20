import React, { forwardRef } from 'react';
import { IonInput } from '@ionic/react';
import { AccessibleIonInput } from '../interfaces/accesibility';

/**
 * Component Input
 * A custom wrapper around IonInput that enforces accessibility attributes.
 * 
 * @author David Rullán Díaz
 * @href http://github.com/drullandev
 * @date 
 *
 * @param {AccessibleIonInput} props Props of the component, enforcing accessibility attributes
 * @returns React component wrapping IonInput
 */
const Input = forwardRef<HTMLIonInputElement, AccessibleIonInput>((props, ref) => {
    const { ariaLabel, ariaRequired, ariaInvalid, ...restProps } = props;

    // Ensure accessibility attributes are passed down to IonInput
    return (
        <IonInput
          ref={ref}  // Pass the ref to IonInput
          aria-label={ariaLabel}
          aria-required={ariaRequired}
          aria-invalid={ariaInvalid}
          {...restProps}
        />
    );
});

export default React.memo(Input);
