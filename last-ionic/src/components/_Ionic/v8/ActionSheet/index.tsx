import React from 'react';
import { IonActionSheet } from '@ionic/react';
import { AccessibleIonActionSheet } from '../interfaces/ionicAccesibility';

/**
 * Component ActionSheet
 * A custom wrapper around IonActionSheet that enforces accessibility attributes.
 * 
 * @author David Rullán Díaz
 * @href http://github.com/drullandev
 * @date 
 *
 * @param {AccessibleIonActionSheet} props Props of the component, enforcing accessibility attributes
 * @returns React component wrapping IonActionSheet
 */
const ActionSheet: React.FC<AccessibleIonActionSheet> = (props: AccessibleIonActionSheet) => {
    const { ariaLabel, role = 'menu', ...restProps } = props;

    // Force the accessibility attributes to be passed down to IonActionSheet
    return <IonActionSheet aria-label={ariaLabel} role={role} {...restProps} />;
};

export default React.memo(ActionSheet);