import React from 'react';
import { IonSkeletonText } from '@ionic/react';
import { AccessibleIonSkeletonText } from '../interfaces/ionicAccesibility';

/**
 * Component SkeletonText
 * A custom wrapper around IonSkeletonText that enforces accessibility attributes.
 * 
 * @author David Rullán Díaz
 * @href http://github.com/drullandev
 * @date 
 *
 * @param {AccessibleIonSkeletonText} props Props of the component, enforcing accessibility attributes
 * @returns React component wrapping IonSkeletonText
 */
const SkeletonText: React.FC<AccessibleIonSkeletonText> = (props: AccessibleIonSkeletonText) => {
    const { ariaLabel, role = 'status', ...restProps } = props;

    // Ensure accessibility attributes are passed down to IonSkeletonText
    return (
        <IonSkeletonText
            aria-label={ariaLabel}
            role={role}
            {...restProps}
        />
    );
};

export default React.memo(SkeletonText);