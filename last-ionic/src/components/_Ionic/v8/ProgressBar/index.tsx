import React from 'react';
import { IonProgressBar } from '@ionic/react';
import { AccessibleIonProgressBar } from '../interfaces/ionicAccesibility';

/**
 * Component ProgressBar
 * A custom wrapper around IonProgressBar that enforces accessibility attributes.
 * 
 * @author David Rullán Díaz
 * @href http://github.com/drullandev
 * @date 
 *
 * @param {AccessibleIonProgressBar} props Props of the component, enforcing accessibility attributes
 * @returns React component wrapping IonProgressBar
 */
const ProgressBar: React.FC<AccessibleIonProgressBar> = (props: AccessibleIonProgressBar) => {
    const { ariaLabel, ariaValueText, ...restProps } = props;

    // Ensure accessibility attributes are passed down to IonProgressBar
    return <IonProgressBar aria-label={ariaLabel} aria-valuetext={ariaValueText} {...restProps} />;
};

export default React.memo(ProgressBar);