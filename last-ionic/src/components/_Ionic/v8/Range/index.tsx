import React from 'react';
import { IonRange } from '@ionic/react';
import { AccessibleIonRange } from '../interfaces/ionicAccesibility';

/**
 * Component Range
 * A custom wrapper around IonRange that enforces accessibility attributes.
 * 
 * @author David Rullán Díaz
 * @href http://github.com/drullandev
 * @date 
 *
 * @param {AccessibleIonRange} props Props of the component, enforcing accessibility attributes
 * @returns React component wrapping IonRange
 */
const Range: React.FC<AccessibleIonRange> = (props: AccessibleIonRange) => {
    const { ariaLabel, ariaValueMin, ariaValueMax, ariaValueNow, role = 'slider', ...restProps } = props;

    // Ensure accessibility attributes are passed down to IonRange
    return (
        <IonRange
            aria-label={ariaLabel}
            aria-valuemin={ariaValueMin}
            aria-valuemax={ariaValueMax}
            aria-valuenow={ariaValueNow}
            role={role}
            {...restProps}
        />
    );
};

export default React.memo(Range);