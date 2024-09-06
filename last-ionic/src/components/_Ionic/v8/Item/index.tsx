import React from 'react';
import { IonItem } from '@ionic/react';
import { AccessibleIonItem } from '../interfaces/ionicAccesibility';

/**
 * Component Item
 * A custom wrapper around IonItem that enforces accessibility attributes.
 * 
 * @author David Rullán Díaz
 * @href http://github.com/drullandev
 * @date 
 *
 * @param {AccessibleIonItem} props Props of the component, enforcing accessibility attributes
 * @returns React component wrapping IonItem
 */
const Item: React.FC<AccessibleIonItem> = (props: AccessibleIonItem) => {
    const { ariaLabel, role = 'listitem', ...restProps } = props;

    // Ensure accessibility attributes are passed down to IonItem
    return <IonItem aria-label={ariaLabel} role={role} {...restProps} />;
};

export default React.memo(Item);